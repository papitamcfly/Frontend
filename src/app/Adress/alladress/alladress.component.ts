import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdressService } from 'src/app/Services/adresses/adress.service';
import { Adress } from 'src/app/interfaces/adress';

@Component({
  selector: 'app-alladress',
  templateUrl: './alladress.component.html',
  styleUrls: ['./alladress.component.scss']
})
export class AlladressComponent implements OnInit {
  adress: Adress[] = [];
  displayedColumns: string[] = ['street', 'suburb', 'city', 'state', 'country', 'zip_code', 'latitude', 'longitude', 'user'];
  selectedUser: string | null = null;
  infoWindow:any
  @ViewChild('map', { static: false }) mapElement: ElementRef | undefined;
  map: google.maps.Map | undefined;

  constructor(private adressService: AdressService, private cookieService: CookieService) {}

  ngOnInit() {
    this.veradress();
  }

  veradress() {
    const token = this.cookieService.get('token');
    this.adressService.viewAllAdress(token).subscribe(
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

      this.addMarkers(this.adress);
    }
  }

  addMarkers(addresses: Adress[]) {
    addresses.forEach(address => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(address.latitude, address.longitude),
        map: this.map,
        title: `${address.street}, ${address.city}`
      });
      marker.addListener('click',()=>{
        const contentString = `
        <div>
             <h3>${address.users.nickname}</h3>
            <h4>${address.users.name} ${address.users.lastname} </h4>
            <p>Edad: ${address.city}</p>
            <p>Cumpleaños: ${address.country}</p>
            <p>Teléfono: ${address.state}</p>
            <p>Correo: ${address.suburb}</p>
            <p>Estado: ${address.zip_code}</p>
        </div>
    `;
    this.infoWindow = new google.maps.InfoWindow();
    this.infoWindow.setContent(contentString);
    this.infoWindow.open(this.map, marker);
      })
    });
  }

  onRowClick(row: Adress) {
    this.selectedUser = row.users.name;
    const userAddresses = this.adress.filter(address => address.users.name === this.selectedUser);
    this.clearMarkers();
    this.addMarkers(userAddresses);
  }
  onRowClickAll() {
    this.loadMap();
  }
  clearMarkers() {
    if (this.map) {
      this.map = new google.maps.Map(this.mapElement?.nativeElement, {
        center: this.map.getCenter(),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    }
  }
}
