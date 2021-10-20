# ngxAutocomPlace : Angular Google Places API Autocomplete Directive

Add this directive to any input to activate the google places autocomplete feature.  
It uses google place API programmatically instead of the ready to use autocomplete javascript widget provided by google. This allows to handle keydown.enter events to select the first result automatically, and access the predictions for further customisations.

Tested with :	

| Framwork | Version |
| -------- | -------- |
| Angular  | 8 +   |
| Ionic    | 4 |

| Angular  | ngx-autocom-place |
| -------- | -------- |
| Angular 8  | 2.0.0 |
| Angular 9  | 3.0.0 |

## Install
```sh
    npm i --save ngx-autocom-place
```
import `NgxAutocomPlaceModule` in your app module.

- Add this to index.html
```html
      <script src="https://maps.googleapis.com/maps/api/js?key=<YourApiKey>&libraries=places&language=en"></script>
```

## Usage

```html
    <input type="text" ngxAutocomPlace (selectedPlace)="placeChangedCallback($event)"/>
```
- attribute `[options]` (optional) can be added to pass (ref: https://developers.google.com/maps/documentation/javascript/reference/places-widget)

## Api
### ngxAutocomPlace
#### [options]
Use to customise the autocomplete options. (optional)
Default to :
```
{
    types: ["geocode"]
}
```
Format : https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

#### (selectedPlace)
Emit selected place result.  
Format : https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult

#### (predictions)
Emit predictions on user input. (optional)
Format : https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletePrediction

#### [handleEnterKeydown]
Set handler for enter key press event by user with first result selection from google predictions dropdown. (optional)
Default: True

#### [hideResultDropdown]
Set to true to not display the result dorpdown and handle predictions by your own. (optional)
Default: False

#### [debounceTime]
Time to delay each input event (rxjs debounceTime) (optional)
Default: 150 (ms)

### NgxAutocomPlaceService
#### getPredictions
`getPlacePrediction` implementation : https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteService.getPlacePredictions

#### getPlaceDetails
`getDetails` implementation : https://developers.google.com/maps/documentation/javascript/reference/places-service#PlacesService.getDetails
