import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoscreenComponent } from './videoscreen.component';

describe('VideoscreenComponent', () => {
  let component: VideoscreenComponent;
  let fixture: ComponentFixture<VideoscreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoscreenComponent]
    });
    fixture = TestBed.createComponent(VideoscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
