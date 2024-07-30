import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolMsgComponent } from './school-msg.component';

describe('SchoolMsgComponent', () => {
  let component: SchoolMsgComponent;
  let fixture: ComponentFixture<SchoolMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolMsgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
