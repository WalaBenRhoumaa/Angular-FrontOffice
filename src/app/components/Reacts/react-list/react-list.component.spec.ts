import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactListComponent } from './react-list.component';

describe('ReactListComponent', () => {
  let component: ReactListComponent;
  let fixture: ComponentFixture<ReactListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactListComponent]
    });
    fixture = TestBed.createComponent(ReactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
