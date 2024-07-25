import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutegalleryComponent } from './institutegallery.component';

describe('InstitutegalleryComponent', () => {
  let component: InstitutegalleryComponent;
  let fixture: ComponentFixture<InstitutegalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutegalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutegalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
