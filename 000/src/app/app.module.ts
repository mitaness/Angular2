import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { InMemory } from './memory.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [provideHttpClient(),
  importProvidersFrom(
    HttpClientInMemoryWebApiModule
      .forRoot(InMemory, { delay: 200 }))],
  bootstrap: [AppComponent]
})
export class AppModule { }
