import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAdressComponent } from './personal-adress.component';

describe('PersonalAdressComponent', () => {
  let component: PersonalAdressComponent;
  let fixture: ComponentFixture<PersonalAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalAdressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
