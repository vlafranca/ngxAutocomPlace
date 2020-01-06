# ngxAutocomPlace : GoogleMaps Places API Autocomplete Directive

Add this directive to any input to activate the google places autocomplete feature.

Tested with :	

| Framwork | Version |
| -------- | -------- |
| Angular  | 8 +   |
| Ionic    | 4 |

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
