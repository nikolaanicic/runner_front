import { Component, OnInit } from '@angular/core';
import { UserData } from '../../models/user/UserData';
import { AdminService } from '../services/admin/admin.service';
import { createImagePath } from '../services/common/commonFunc';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.css'],
})
export class PendingRequestsComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private notify: NotificationService
  ) {}
  pending: UserData[] | undefined = undefined;

  ngOnInit(): void {
    this.adminService.getPendingRequests().subscribe({
      next: (value: UserData[]) => {
        this.pending = value;
      },
      error: (error) => this.notify.showNotification("Data can't be loaded"),
    });
  }

  createImagePath(path: string) {
    return createImagePath(path);
  }

  onRejectClick(username: string) {
    this.adminService.reject(username).subscribe({
      next: () => {
        this.pending = this.pending?.filter((x) => x.username !== username);
        this.notify.showNotification('Successfully rejected');
      },
      error: (error) => this.notify.showNotification(error),
    });
  }

  onApproveClick(username: string) {
    this.adminService.approve(username).subscribe({
      next: () => {
        this.pending = this.pending?.filter((x) => x.username !== username);
        this.notify.showNotification('Successfully approved');
      },
      error: (error) => this.notify.showNotification(error),
    });
  }
}
