import { Directive, Output, EventEmitter, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NgxAutocomPlaceService } from './ngx-autocom-place.service';

export interface AutocomplaceOptions extends google.maps.places.AutocompleteOptions {
  input?: string; // not used in our case handled by <input> element value
}

@Directive({
  selector: '[ngxAutocomPlace]'
})
export class NgxAutocomPlaceDirective implements OnInit, OnDestroy {
  points = [];
  @Output() selectedPlace: EventEmitter<
    google.maps.places.PlaceResult
  > = new EventEmitter();
  @Output() predictions: EventEmitter<google.maps.places.AutocompletePrediction[]> = new EventEmitter();
  @Input() options: AutocomplaceOptions = {
    types: ["geocode"] // 'establishment' / 'address' / 'geocode'
  };
  @Input() handleEnterKeydown = true;
  @Input() hideResultDropdown = false;

  results: google.maps.places.AutocompletePrediction[];
  resultPacContainer: HTMLElement;
  downArrowIndex = -1;;
  inputElement: HTMLInputElement;

  constructor(public el: ElementRef, public ngxAutocomplaceService: NgxAutocomPlaceService) { }

  async ngOnInit() {
    if (this.el.nativeElement instanceof HTMLInputElement) {
      this.inputElement = this.el.nativeElement
    } else if (this.el.nativeElement.tagName === 'ION-INPUT') {
      this.inputElement = await this.el.nativeElement.getInputElement()
    } else if (this.el.nativeElement.tagName === 'ION-SEARCHBAR') {
      this.inputElement = await this.el.nativeElement.getInputElement()
    } else {
      return;
    }

    const styles = document.createElement('style');
    styles.innerHTML = `@keyframes beginBrowserAutofill{0%{}to{}}@keyframes endBrowserAutofill{0%{}to{}}.pac-container{background-color:#fff;position:absolute!important;z-index:1000;border-radius:2px;border-top:1px solid #d9d9d9;font-family:Arial,sans-serif;box-shadow:0 2px 6px rgba(0,0,0,0.3);-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.pac-logo:after{content:"";padding:1px 1px 1px 0;height:18px;box-sizing:border-box;text-align:right;display:block;background-image:url(https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3.png);background-position:right;background-repeat:no-repeat;background-size:120px 14px}.hdpi.pac-logo:after{background-image:url(https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3_hdpi.png)}.pac-item{cursor:default;padding:0 4px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;line-height:30px;text-align:left;border-top:1px solid #e6e6e6;font-size:11px;color:#999}.pac-item:hover{background-color:#fafafa}.pac-item-selected,.pac-item-selected:hover{background-color:#ebf2fe}.pac-matched{font-weight:700}.pac-item-query{font-size:13px;padding-right:3px;color:#000}.pac-icon{width:15px;height:20px;margin-right:7px;margin-top:6px;display:inline-block;vertical-align:top;background-image:url(https://maps.gstatic.com/mapfiles/api-3/images/autocomplete-icons.png);background-size:34px}.hdpi .pac-icon{background-image:url(https://maps.gstatic.com/mapfiles/api-3/images/autocomplete-icons_hdpi.png)}.pac-icon-search{background-position:-1px -1px}.pac-item-selected .pac-icon-search{background-position:-18px -1px}.pac-icon-marker{background-position:-1px -161px}.pac-item-selected .pac-icon-marker{background-position:-18px -161px}.pac-placeholder{color:gray}.pac-target-input:-webkit-autofill{animation-name:beginBrowserAutofill}.pac-target-input:not(:-webkit-autofill){animation-name:endBrowserAutofill}`;
    var ref = document.querySelector('script');
    ref.parentNode.insertBefore(styles, ref);

    this.inputElement.addEventListener('blur', () => {
      this.blurEvent();
    });

    this.inputElement.addEventListener('input', (_e) => {
      this.inputEvent(_e);
    });

    this.inputElement.addEventListener('keydown', (e) => {
      this.keydownEvent(e);
    });
  }

  createPacContainer(input, results: google.maps.places.AutocompletePrediction[]) {  // store the original event binding function
    this.resultPacContainer = document.createElement('div');
    const inputRect = input.getBoundingClientRect();
    this.resultPacContainer.classList.add('pac-container', 'pac-logo', 'hdpi');
    this.resultPacContainer.style.position = 'absolute';
    this.resultPacContainer.style.top = inputRect.bottom + 'px';
    this.resultPacContainer.style.left = inputRect.left + 'px';
    this.resultPacContainer.style.width = (inputRect.right - inputRect.left) + 'px';

    results.forEach(element => {
      this.resultPacContainer.appendChild(this.createPacItem(element.place_id, element.structured_formatting.main_text, element.structured_formatting.secondary_text, element.structured_formatting.main_text_matched_substrings[0].length));
    });

    document.querySelector('body').appendChild(this.resultPacContainer);
  }

  createPacItem(placeId: string, mainText: string, secondaryText: string, matchMainOffset: number) {
    const item = document.createElement('div');
    item.classList.add('pac-item');
    item.id = placeId;
    const spanIcon = document.createElement('span');
    spanIcon.classList.add('pac-icon', 'pac-icon-marker');

    const spanContentMatch = document.createElement('span');
    spanContentMatch.classList.add('pac-item-query');

    const spanContentMatched = document.createElement('span');
    spanContentMatched.classList.add('pac-matched');
    spanContentMatched.innerText = mainText.substr(0, matchMainOffset);

    spanContentMatch.appendChild(spanContentMatched);
    spanContentMatch.appendChild(document.createTextNode(mainText.substr(matchMainOffset)));

    const spanCity = document.createElement('span');
    spanCity.appendChild(document.createTextNode(secondaryText));

    item.appendChild(spanIcon);
    item.appendChild(spanContentMatch);
    item.appendChild(spanCity);
    item.addEventListener('click', () => {
      this.getPlaceDetails(placeId);
    });

    return item;
  }

  getPlaceDetails(placeId: string) {
    this.ngxAutocomplaceService.getPlaceDetails(placeId).then((result) => {
      // this.inputElement.value = result.formatted_address;
      // this.inputElement.blur();
      this.selectedPlace.emit(result);
    })
  }

  blurEvent() {
    setTimeout(() => {
      if (this.resultPacContainer) {
        this.removePacItems();
      }
    }, 250);
  }

  inputEvent(_e) {
    this.ngxAutocomplaceService.getPredictions(this.inputElement.value, this.options).then((results) => {
      if (results) {
        this.removePacItems();
        if (!this.hideResultDropdown) {
          this.results = results;
          this.createPacContainer(this.inputElement, results);
        }
        this.predictions.emit(results);
      }
    })
  }

  keydownEvent(e) {
    if (this.handleEnterKeydown) {
      if (e.key === 'Enter' || e.keyCode === 13) {
        if (this.results && this.results.length > 0) {
          this.getPlaceDetails(this.results[this.downArrowIndex > -1 ? this.downArrowIndex : 0].place_id);
          this.removePacItems();
        }
      }
    }
    if (e.keyCode === 40) {
      this.downArrowIndex++;
      if (this.downArrowIndex > 0) {
        document.querySelectorAll('.pac-item')[this.downArrowIndex - 1].classList.remove('pac-item-selected');
      }
      document.querySelectorAll('.pac-item')[this.downArrowIndex].classList.add('pac-item-selected');
    }
  }

  removePacItems() {
    if (this.resultPacContainer) {
      this.resultPacContainer.remove();
      this.resultPacContainer = null;
    }
    this.downArrowIndex = -1;;
  }

  ngOnDestroy() {
    this.inputElement.removeEventListener('blur', () => {
      this.blurEvent();
    });

    this.inputElement.removeEventListener('input', (_e) => {
      this.inputEvent(_e);
    });

    this.inputElement.removeEventListener('keydown', (e) => {
      this.keydownEvent(e);
    });
  }
}
