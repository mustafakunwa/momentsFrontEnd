import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatSidenavModule,
  MatIconModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatDialogModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { AuthInterceptorService } from './services/interceptor.service';
import { LoaderInterceptorService } from './services/loader-interceptor.service';
import { AuthGuard } from './services/authGaurd.service';
import { AuthService } from './services/authentication.service';
import { LoaderService } from './services/loader.service';
import { ApiService } from './services/api.service';
import { SnackbarService } from './shared/snacbar.service';
import { ConfirmationModalComponent } from './shared/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [
    CookieService,
    { provide: CookieOptions, useValue: false },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    AuthGuard,
    LoaderService,
    AuthService,
    SnackbarService,
    ApiService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationModalComponent]
})
export class AppModule { }
