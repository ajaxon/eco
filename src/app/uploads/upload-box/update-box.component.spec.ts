import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBoxComponent } from './upload-box.component';

describe('UpdateBoxComponent', () => {
  let component: UpdateBoxComponent;
  let fixture: ComponentFixture<UpdateBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
