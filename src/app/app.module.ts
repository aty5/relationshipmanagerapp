import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RelationshipService} from "./relationship.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, CommonModule, HttpClientModule, FormsModule
  ],
  providers: [RelationshipService],
  bootstrap: [AppComponent]
})
export class AppModule { }
