import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { TareaModule } from './components/tarea/tarea.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    TareaModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule
    // FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule { }
