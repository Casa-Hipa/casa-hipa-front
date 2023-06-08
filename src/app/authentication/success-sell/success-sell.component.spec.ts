import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSellComponent } from './success-sell.component';

describe('SuccessSellComponent', () => {
  let component: SuccessSellComponent;
  let fixture: ComponentFixture<SuccessSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
