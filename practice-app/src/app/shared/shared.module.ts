import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertBoxComponent } from './alert-box/alert-box.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    AlertBoxComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AlertBoxComponent,
    DropdownDirective,
    CommonModule
  ]
})

export class SharedModule { }
