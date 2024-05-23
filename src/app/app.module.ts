import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './core/auth.interceptor';
import { AuthService } from './core/auth.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
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
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  declarations: [],
  bootstrap: []
})
export class AppModule { }
