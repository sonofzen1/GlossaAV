import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizcardComponent } from './quiz-card.component';

describe('QuizcardComponent', () => {
  let component: QuizcardComponent;
  let fixture: ComponentFixture<QuizcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
