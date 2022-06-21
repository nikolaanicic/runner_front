import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard-modal-wrap',
  template: `
    <div class="modal-header text-center" style="overflow:hidden;">
      <h4 class="modal-title dancing-font">runner</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="p-2">
      <div class="row mx-auto">
        <div class="pop-up-card border border-1 rounded border-secondary text-center m-1" role="button"
        role="button" (click)="Navigate('profile')">
          <span class="text-success h6">Profile</span>
        </div>
        <div class="pop-up-card border border-1 rounded border-secondary text-center m-1" role="button">
          <span class="text-success h6">New / Current order</span>
        </div>
        <div class="pop-up-card border border-1 rounded border-secondary text-center m-1" role="button">
          <span class="text-success h6">Ordering history</span>
        </div>
        <div class="pop-up-card border border-1 rounded border-secondary text-center m-1" role="button">
          <span class="text-success h6">Pending requests</span>
        </div>
      </div>
      <div class="row mx-auto">
        <div class="pop-up-card border border-1 rounded border-secondary text-center m-1" role="button">
          <span class="text-success h6">Pending orders</span>
        </div>
        <div class="pop-up-card border border-1 rounded border-secondary text-center m-1" role="button">
          <span class="text-success h6">Delivery history</span>
        </div>
        <div class="pop-up-card border border-1 rounded border-secondary text-center m-1" role="button">
          <span class="text-success h6">Current order</span>
        </div>
        <div class="pop-up-card border border-1 rounded border-secondary text-center m-1" role="button">
          <span class="text-success h6">All orders</span>
        </div>
      </div>
      <div class="row mx-auto">
        <div class="pop-up-card border border-1 rounded border-secondary text-center m-1" role="button">
          <span class="text-success h6">Add article</span>
        </div>
        <div class="pop-up-card border border-1 rounded border-secondary text-center m-1" (click)="Navigate('dashboard')"
        role="button">
          <span class="text-success h6">Dashboard</span>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `, styleUrls: ['pop-up-header.component.css', '../app.component.css']
})
export class NgbdModalContent {

  constructor(public activeModal: NgbActiveModal,private router:Router) {
  }

  Navigate(route:string)
  {
    this.router.navigate([`/${route}`]);
    this.activeModal.close();
  }

}

@Component({
  selector: 'app-pop-up-header',
  templateUrl: './pop-up-header.component.html',
  styleUrls: ['./pop-up-header.component.css']
})
export class PopUpHeaderComponent implements OnInit {

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent, {centered: true});
  }


}
