import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx Autocomplete Google Places';
  selectedPlace: any;
  json = JSON;

  constructor(private ref: ChangeDetectorRef) {}

  placeChanged(place) {
      this.selectedPlace = place;
      this.ref.detectChanges();
  }
}
