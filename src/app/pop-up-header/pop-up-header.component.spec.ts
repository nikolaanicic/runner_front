import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpHeaderComponent } from './pop-up-header.component';

describe('PopUpHeaderComponent', () => {
  let component: PopUpHeaderComponent;
  let fixture: ComponentFixture<PopUpHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
