import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicSetComponent } from './academic-set.component';

describe('AcademicSetComponent', () => {
  let component: AcademicSetComponent;
  let fixture: ComponentFixture<AcademicSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicSetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
