import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContentsComponent } from './modal-contents.component';

describe('ModalContentsComponent', () => {
  let component: ModalContentsComponent;
  let fixture: ComponentFixture<ModalContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
