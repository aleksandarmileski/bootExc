import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {AppComponent} from './app.component';
import {AsyncValidator} from './async-validator.directive';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TagInputModule} from "ng2-tag-input";
import {BrowserModule} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    AsyncValidator
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TagInputModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
