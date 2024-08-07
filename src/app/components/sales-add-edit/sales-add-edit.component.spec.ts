import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAddEditComponent } from './sales-add-edit.component';

describe('SalesAddEditComponent', () => {
  let component: SalesAddEditComponent;
  let fixture: ComponentFixture<SalesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
