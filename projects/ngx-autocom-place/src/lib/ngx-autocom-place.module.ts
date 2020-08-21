import { NgModule } from '@angular/core';
import { NgxAutocomPlaceDirective } from './ngx-autocom-place.directive';
import { NgxAutocomPlaceService } from './ngx-autocom-place.service';

@NgModule({
  imports: [
  ],
  declarations: [NgxAutocomPlaceDirective],
  exports: [NgxAutocomPlaceDirective],
  providers: [NgxAutocomPlaceService]
})
export class NgxAutocomPlaceModule { }
