import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserFormComponent} from './forms/user-form.components';
import { ExperienceFormComponent } from './experience-form/experience-form.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    UserFormComponent,
    ExperienceFormComponent,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }