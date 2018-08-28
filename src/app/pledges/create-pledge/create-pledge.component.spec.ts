import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePledgeComponent } from './create-pledge.component';

describe('CreatePledgeComponent', () => {
  let component: CreatePledgeComponent;
  let fixture: ComponentFixture<CreatePledgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePledgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
