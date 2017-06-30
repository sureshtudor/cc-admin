import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import {HttpModule} from '@angular/http';

import {HomeModule} from './home/home.module';
import {UserModule} from './user/user.module';

import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar.component';
import {NotFoundComponent} from './shared/not-found.component';
import {AuthenticationModule} from "./auth/authentication.module";
import {PasswordManagerModule} from "./pwm/pwm.module";
// import {HashLocationStrategy, LocationStrategy} from "@angular/common";

export const ROUTES: Routes = [
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AuthenticationModule,
    HomeModule,
    UserModule,
    PasswordManagerModule,
    RouterModule.forRoot(ROUTES, {useHash: true})
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent
  ],
  providers: [
    // {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
