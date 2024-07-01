import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdressService } from 'src/app/Services/adresses/adress.service';
import { Adress } from 'src/app/interfaces/adress';

@Component({
  selector: 'app-personal-adress',
  templateUrl: './personal-adress.component.html',
  styleUrls: ['./personal-adress.component.scss']
})
export class PersonalAdressComponent implements OnInit {
  adress: Adress[] = [];
  displayedColumns: string[] = ['street', 'suburb', 'city', 'state', 'country', 'zip_code', 'latitude', 'longitude', 'user'];

  @ViewChild('map', { static: false }) mapElement: ElementRef | undefined;
  map: google.maps.Map | undefined;

  constructor(private adressService: AdressService, private cookieService: CookieService) {}

  ngOnInit() {
    this.veradress();
  }

  veradress() {
    const token = this.cookieService.get('token');
    this.adressService.viewPersonalAdress(token).subscribe(
      addresses => {
        this.adress = addresses;
        console.log(addresses);
        this.loadMap();
      },
      error => {
        console.error('Error al obtener las direcciones:', error);
      }
    );
  }

  loadMap() {
    if (this.mapElement && this.adress.length > 0) {
      const mapProperties = {
        center: new google.maps.LatLng(this.adress[0].latitude, this.adress[0].longitude),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

      this.adress.forEach(address => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(address.latitude, address.longitude),
          map: this.map,
          title: `${address.street}, ${address.city}`
        });
      });
    }
  }
}
