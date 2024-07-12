import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstComponent } from './mst.component';

describe('MstComponent', () => {
  let component: MstComponent;
  let fixture: ComponentFixture<MstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
