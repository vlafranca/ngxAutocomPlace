import { Injectable } from '@angular/core';

@Injectable()
export class NgxAutocomPlaceService {

  autocompleteService = new google.maps.places.AutocompleteService();
  placeService = new google.maps.places.PlacesService(document.createElement('div'));

  constructor() { }

  getPredictions(value, options): Promise<google.maps.places.AutocompletePrediction[]> {
    const request = {
      input: value,
      ...options
    };
    return new Promise((resolve, reject) => {
      this.autocompleteService.getPlacePredictions(request, (results, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          reject();
          return;
        }
        if (results) {
          resolve(results);
        }
      })
    });
  }

  getPlaceDetails(placeId: string): Promise<google.maps.places.PlaceResult> {
    return new Promise((resolve, reject) => {
      this.placeService.getDetails({
        placeId,
      }, (result, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          reject();
          return;
        }
        resolve(result);
      });
    });
  }
}
