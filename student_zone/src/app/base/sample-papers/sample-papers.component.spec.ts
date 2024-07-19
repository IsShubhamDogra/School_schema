import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePapersComponent } from './sample-papers.component';

describe('SamplePapersComponent', () => {
  let component: SamplePapersComponent;
  let fixture: ComponentFixture<SamplePapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SamplePapersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamplePapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
