import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTabForanouncementsComponent } from './info-tab-foranouncements.component';

describe('InfoTabForanouncementsComponent', () => {
  let component: InfoTabForanouncementsComponent;
  let fixture: ComponentFixture<InfoTabForanouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoTabForanouncementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoTabForanouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
