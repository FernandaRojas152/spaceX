import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LaunchesComponent } from './launches/launches.component';
import { LaunchDetailComponent } from './launch-detail/launch-detail.component';
import { FerDirective } from './directives/fer.directive';
import { IndexLaunchComponent } from './index-launch/index-launch.component';
import { OrdinalPipe } from './pipes/ordinal.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LaunchesComponent,
    LaunchDetailComponent,
    FerDirective,
    IndexLaunchComponent,
    OrdinalPipe,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
