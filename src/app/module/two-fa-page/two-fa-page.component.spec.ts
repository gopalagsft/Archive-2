import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFAPageComponent } from './two-fa-page.component';

describe('TwoFAPageComponent', () => {
  let component: TwoFAPageComponent;
  let fixture: ComponentFixture<TwoFAPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoFAPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFAPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
