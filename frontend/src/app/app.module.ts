import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserFormComponent} from './forms/user-form.components';
import { LandingPageComponent } from './landing/landing.component';
import { SignupFormComponent } from './signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TokenInterceptor } from "./token.interceptor";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const appRoute: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'generate', component: UserFormComponent},
  {path: 'signup', component: SignupFormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: '**', component: ErrorComponent},
]

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoute),
    FontAwesomeModule,
  ],
  declarations: [
    AppComponent,
    UserFormComponent,
    LandingPageComponent,
    SignupFormComponent,
    ErrorComponent,
    LoginComponent,
    ProfileComponent,
   ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }