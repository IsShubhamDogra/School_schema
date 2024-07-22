import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegannouncecompComponent } from './regannouncecomp.component';

describe('RegannouncecompComponent', () => {
  let component: RegannouncecompComponent;
  let fixture: ComponentFixture<RegannouncecompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegannouncecompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegannouncecompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
