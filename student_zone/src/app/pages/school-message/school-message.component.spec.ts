import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolMessageComponent } from './school-message.component';

describe('SchoolMessageComponent', () => {
  let component: SchoolMessageComponent;
  let fixture: ComponentFixture<SchoolMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
