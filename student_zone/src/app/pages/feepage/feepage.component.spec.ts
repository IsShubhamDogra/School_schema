import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeepageComponent } from './feepage.component';

describe('FeepageComponent', () => {
  let component: FeepageComponent;
  let fixture: ComponentFixture<FeepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
