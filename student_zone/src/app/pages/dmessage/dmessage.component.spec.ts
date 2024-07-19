import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmessageComponent } from './dmessage.component';

describe('DmessageComponent', () => {
  let component: DmessageComponent;
  let fixture: ComponentFixture<DmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
