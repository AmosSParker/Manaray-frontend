import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app/app-routing.module';
import { AuthInterceptor } from './app/core/auth.interceptor';
import { AuthService } from './app/core/auth.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      FormsModule,
      AppRoutingModule,
      JwtModule.forRoot({
        config: {
          tokenGetter,
          allowedDomains: ["localhost:8000"],
          disallowedRoutes: ["http://localhost:8000/api/auth/login"]
        }
      })
    ),
    provideHttpClient(withFetch()),
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ]
});
