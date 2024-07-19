import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonvComponent } from './demonv.component';

describe('DemonvComponent', () => {
  let component: DemonvComponent;
  let fixture: ComponentFixture<DemonvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemonvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemonvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
