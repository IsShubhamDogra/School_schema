import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsgcomponentComponent } from './pmsgcomponent.component';

describe('PmsgcomponentComponent', () => {
  let component: PmsgcomponentComponent;
  let fixture: ComponentFixture<PmsgcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmsgcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmsgcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
