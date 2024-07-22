import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinciplaMessageComponent } from './principla-message.component';

describe('PrinciplaMessageComponent', () => {
  let component: PrinciplaMessageComponent;
  let fixture: ComponentFixture<PrinciplaMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrinciplaMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrinciplaMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
