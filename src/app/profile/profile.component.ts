import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Form, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../models/user/UserData';
import {
  validateDate,
  validatePassword,
} from '../../models/validators/validatorFuncs';
import { createImagePath } from '../services/common/commonFunc';
import { NotificationService } from '../services/notification/notification.service';
import { UpdateUserService } from '../services/update/update-user.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isEditing: boolean = false;
  userUpdateForm: UntypedFormGroup = this.fb.group(this.createUpdateForm());
  user: UserData | null = null;
  newImage: File | null = null;
  imagePath: string | null = null;

  constructor(
    private userService: UserService,
    private notify: NotificationService,
    private fb: UntypedFormBuilder,
    private update: UpdateUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe({
      next: (value: UserData) => {
        this.user = value;
        this.user.role = localStorage.getItem('role');
        this.user.dateOfBirth = new Date(this.user.dateOfBirth);
        this.userUpdateForm = this.fb.group(this.createUpdateForm());
        this.imagePath = this.createPath(value.imagePath);
      },
      error: (error) => this.notify.showNotification(error),
    });
  }

  createPath(path: string) {
    return createImagePath(path);
  }

  onEditEnableClick() {
    this.isEditing = true;
  }

  onSaveChangesClick() {}

  parseDate(dateString: Date | undefined) {
    if (dateString)
      return `${dateString.getFullYear()}-${
        dateString.getMonth() + 1
      }-${dateString.getDate()}`;

    return null;
  }

  onDateChange(event: any) {
    if (event.target.value && this.user) {
      let tempDate = new Date(event.target.value);
      console.log(tempDate);
      if (isNaN(tempDate.getTime())) {
        this.userUpdateForm.controls.dateOfBirth.setErrors({
          date: 'Invalid date',
        });
        return;
      }
    }
  }

  createUpdateForm() {
    return {
      name: [this?.user?.name, [Validators.required]],
      lastName: [this?.user?.lastName, [Validators.required]],
      email: [this?.user?.email, [Validators.required, Validators.email]],
      dateOfBirth: [
        this.parseDate(this?.user?.dateOfBirth),
        [Validators.required, validateDate],
      ],
      address: [this?.user?.address, [Validators.required]],
    };
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newImage = file;
    }
  }

  onSubmit() {
    let continueEdit1 = false;
    let continueEdit2 = false;
    if (this.userUpdateForm.valid) {
      this.update.updateUser(this.userUpdateForm, this.user)?.subscribe({
        error: (error) => {
          if (error) this.notify.showNotification(error);
          continueEdit1 = true;
        },
      });
    }

    if (this.newImage !== null) {
      this.update.updateImage(this.newImage)?.subscribe({
        next: () => {
          this.loadImage();
          continueEdit2 = false;
        },
        error: (error) => {
          this.notify.showNotification(error);
          continueEdit2 = false;
        },
      });
    }

    if (!continueEdit1 && !continueEdit2) this.isEditing = false;
  }

  loadImage() {
    if (this.newImage === null) return;

    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.newImage);

    fileReader.addEventListener('load', (event) => {
      this.imagePath = event.target?.result as string;
    });
  }
}
