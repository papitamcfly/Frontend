import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdressService } from 'src/app/Services/adresses/adress.service';

@Component({
  selector: 'app-register-adress',
  templateUrl: './register-adress.component.html',
  styleUrls: ['./register-adress.component.scss']
})
export class RegisterAdressComponent implements OnInit {
  AdressForm: FormGroup;
  map: google.maps.Map | undefined;
  marker: google.maps.Marker | undefined;

  constructor(
    private AdressService: AdressService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.AdressForm = new FormGroup({
      street: new FormControl('', [Validators.required]),
      suburb: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      zip_code: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required]),
    });
  }

  async ngOnInit() {
    try {
      const position = await this.AdressService.getCurrentPosition();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.AdressForm.controls['latitude'].setValue(latitude);
      this.AdressForm.controls['longitude'].setValue(longitude);
      console.log(
        this.AdressForm.controls['latitude'].setValue(latitude),
        this.AdressForm.controls['longitude'].setValue(longitude)
      );

      const address = await this.AdressService.getAddress(latitude, longitude);
      this.setAddressForm(address);
      this.loadMap(latitude, longitude);
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  setAddressForm(address: any) {
    console.log(address);
    const addressComponents = address.results[0].address_components;
    const getAddressComponent = (type: string) => {
      return addressComponents.find((component: any) => component.types.includes(type))?.long_name || '';
    };

    this.AdressForm.controls['street'].setValue(getAddressComponent('route'));
    this.AdressForm.controls['suburb'].setValue(getAddressComponent('sublocality_level_1'));
    this.AdressForm.controls['city'].setValue(getAddressComponent('locality'));
    this.AdressForm.controls['state'].setValue(getAddressComponent('administrative_area_level_1'));
    this.AdressForm.controls['country'].setValue(getAddressComponent('country'));
    this.AdressForm.controls['zip_code'].setValue(getAddressComponent('postal_code'));
  }

  onMapLocationSelected(location: { latitude: number; longitude: number }) {
    this.AdressForm.controls['latitude'].setValue(location.latitude);
    this.AdressForm.controls['longitude'].setValue(location.longitude);

    if (this.marker) {
      this.marker.setPosition(new google.maps.LatLng(location.latitude, location.longitude));
    }

    this.AdressService.getAddress(location.latitude, location.longitude)
      .then((address: any) => {
        this.setAddressForm(address);
      })
      .catch(error => {
        console.error('Error getting address from coordinates', error);
      });
  }

  onSubmit() {
    const token = this.cookieService.get('token');
    console.log(this.AdressForm);
    if (this.AdressForm.valid) {
      this.AdressService.RegisterAdress(this.AdressForm.value, token).subscribe(
        response => {
          console.log('Adress registered successfully', response);
          this.router.navigate(['/personalAdress']);
        },
        error => {
          alert('Ha ocurrido un error');
          console.error('Error registering Adress', error);
        }
      );
    }
  }

  loadMap(latitude: number, longitude: number) {
    const mapProperties = {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapProperties);

    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      map: this.map,
      title: 'Ubicacion actual'
    });

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      const clickedLocation = event.latLng;
      if (clickedLocation) {
        const lat = clickedLocation.lat();
        const lng = clickedLocation.lng();
        this.onMapLocationSelected({ latitude: lat, longitude: lng });
      }
    });
  }
}
