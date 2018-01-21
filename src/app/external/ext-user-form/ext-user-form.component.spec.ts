import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtUserFormComponent } from './ext-user-form.component';

describe('ExtUserFormComponent', () => {
  let component: ExtUserFormComponent;
  let fixture: ComponentFixture<ExtUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
