import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareaComponent } from './tarea.component';
import { TareaRoutingModule } from './tarea.route';




import { ChipModule } from 'primeng/chip';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TooltipModule} from 'primeng/tooltip';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {FieldsetModule} from 'primeng/fieldset';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SkeletonModule} from 'primeng/skeleton';
import {CalendarModule} from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import {FileUploadModule} from 'primeng/fileupload';
// import {ChartModule} from 'primeng/chart';
import {AccordionModule} from 'primeng/accordion';


import { TagModule } from 'primeng/tag';
import { AppComponent } from 'src/app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    TareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TareaRoutingModule,
    InputTextModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    TooltipModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    DialogModule,
    DividerModule,
    FieldsetModule,
    TableModule,
    ToastModule,
    DropdownModule,
    SelectButtonModule,
    ScrollTopModule,
    SkeletonModule,
    CalendarModule,
    TabViewModule,
    FileUploadModule,
    // ChartModule,
    AccordionModule,
    ChipModule,

    TagModule,
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]

})
export class TareaModule {
  
 }
