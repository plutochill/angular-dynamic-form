/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UploadControlComponent } from './upload-control.component';

describe('UploadControlComponent', () => {
  let component: UploadControlComponent;
  let fixture: ComponentFixture<UploadControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
