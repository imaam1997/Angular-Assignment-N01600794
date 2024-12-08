import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/pages/home/home.component';
import { ApiDataComponent } from './app/pages/api-data/api-data.component';
import { FormPageComponent } from './app/pages/form-page/form-page.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'api-data', component: ApiDataComponent },
      { path: 'form', component: FormPageComponent }
    ], withEnabledBlockingInitialNavigation())
  ]
}).catch(err => console.error(err));
