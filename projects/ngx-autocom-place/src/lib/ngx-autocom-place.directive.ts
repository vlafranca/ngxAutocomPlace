import { Directive, Output, EventEmitter, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[ngxAutocomPlace]'
})
export class NgxAutocomPlaceDirective implements OnInit {
  points = [];
  @Output() selectedPlace: EventEmitter<
    google.maps.places.PlaceResult
  > = new EventEmitter();
  @Input() options: google.maps.places.AutocompleteOptions;

  constructor(public el: ElementRef) {}

  async ngOnInit() {
    const options = this.options
      ? this.options
      : {
          types: ["geocode"] // 'establishment' / 'address' / 'geocode'
        };

    let inputElement;
    if(this.el.nativeElement instanceof HTMLInputElement) {
      inputElement = this.el.nativeElement
    } else if(this.el.nativeElement.tagName === 'ION-INPUT') {
      inputElement = await this.el.nativeElement.getInputElement()
    } else if(this.el.nativeElement.tagName === 'ION-SEARCHBAR') {
      inputElement = await this.el.nativeElement.getInputElement()
    } else {
      return;
    }
    const autocomplete = new google.maps.places.Autocomplete(
      inputElement,
      options
    );
    google.maps.event.addListener(autocomplete, "place_changed", () => {
      const place = autocomplete.getPlace();
      this.selectedPlace.emit(place);
    });
  }
}
