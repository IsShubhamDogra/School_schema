import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PNsgComponent } from './p-nsg.component';

describe('PNsgComponent', () => {
  let component: PNsgComponent;
  let fixture: ComponentFixture<PNsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PNsgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PNsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
