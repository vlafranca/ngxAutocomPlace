import { Directive, Output, EventEmitter, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[ngxAutocomPlace]'
})
export class NgxAutocomPlaceDirective {
  points = [];
  @Output() selectedPlace: EventEmitter<
    google.maps.places.PlaceResult
  > = new EventEmitter();
  @Input() options: google.maps.places.AutocompleteOptions;

  constructor(public el: ElementRef) {
    const options = this.options
      ? this.options
      : {
          types: ["geocode"] // 'establishment' / 'address' / 'geocode'
        };
    const autocomplete = new google.maps.places.Autocomplete(
      this.el.nativeElement,
      options
    );
    google.maps.event.addListener(autocomplete, "place_changed", () => {
      const place = autocomplete.getPlace();
      this.selectedPlace.emit(place);
    });
  }
}
