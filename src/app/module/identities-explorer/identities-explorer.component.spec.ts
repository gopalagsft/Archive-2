import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentitiesExplorerComponent } from './identities-explorer.component';

describe('IdentitiesExplorerComponent', () => {
  let component: IdentitiesExplorerComponent;
  let fixture: ComponentFixture<IdentitiesExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentitiesExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentitiesExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
