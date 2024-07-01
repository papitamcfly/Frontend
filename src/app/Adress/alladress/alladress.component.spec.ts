import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlladressComponent } from './alladress.component';

describe('AlladressComponent', () => {
  let component: AlladressComponent;
  let fixture: ComponentFixture<AlladressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlladressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlladressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
