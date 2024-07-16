import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstInfoComponent } from './inst-info.component';

describe('InstInfoComponent', () => {
  let component: InstInfoComponent;
  let fixture: ComponentFixture<InstInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
