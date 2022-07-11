import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { validatePrice } from '../../models/validators/validatorFuncs';
import { ItemsService } from '../services/items/items.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css'],
})
export class CreateItemComponent implements OnInit {
  itemForm = this.fb.group(this.createFormGroup());
  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.itemForm.valid) {
      this.itemsService.createItem(this.itemForm.value).subscribe({
        next: () => {
          this.notify.showNotification('Successfully created an item');
          this.itemForm.reset();
        },
        error: (error) => this.notify.showNotification(error),
      });
    }
  }

  createFormGroup() {
    return {
      name: ['', [Validators.required, Validators.maxLength(60)]],
      price: ['', [Validators.required, validatePrice()]],
      details: ['', [Validators.required, Validators.maxLength(400)]],
    };
  }
}
