import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpDto } from '../../models/signup/SignUpDto';
import {
  validatePassword,
  validateRole,
} from '../../models/validators/validatorFuncs';
import { NotificationService } from '../services/notification/notification.service';
import { SignupService } from '../services/signup/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../app.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm = this.fb.group(this.createFormObj());

  constructor(
    private fb: UntypedFormBuilder,
    private signUp: SignupService,
    private router: Router,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.signUpForm.patchValue({ image: file });
    }
  }

  onSubmit() {
    this.signUp.register(this.signUpForm.value).subscribe({
      next: (value) => this.router.navigate(['/login']),
      error: (error) => this.notify.showNotification(error),
    });
  }

  createFormObj() {
    return {
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
          validatePassword(),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      roleName: ['Consumer', [Validators.required, validateRole()]],
      image: [null],
    };
  }
}
