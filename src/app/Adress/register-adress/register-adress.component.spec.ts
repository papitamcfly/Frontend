import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdressComponent } from './register-adress.component';

describe('RegisterAdressComponent', () => {
  let component: RegisterAdressComponent;
  let fixture: ComponentFixture<RegisterAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAdressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
