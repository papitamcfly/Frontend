// map.component.ts
import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Output() locationSelected = new EventEmitter<{ latitude: number; longitude: number }>();
  map: google.maps.Map | undefined;
  marker: google.maps.Marker | undefined;

  ngOnInit(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 24.353596692313587, lng: -102.83440584704991 },
      zoom: 5,
    };
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      const latLng = event.latLng;
      if (latLng) {
        const latitude = latLng.lat();
        const longitude = latLng.lng();

        if (this.marker) {
          this.marker.setMap(null);
        }

        this.marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
        });

        this.locationSelected.emit({ latitude, longitude });
      }
    });
  }
}
