import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcctAuthFormComponent } from './acct-auth-form.component';

describe('AcctAuthFormComponent', () => {
  let component: AcctAuthFormComponent;
  let fixture: ComponentFixture<AcctAuthFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcctAuthFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcctAuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
