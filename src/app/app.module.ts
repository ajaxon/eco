import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import { PropertiesListComponent } from './properties/properties-list/properties-list.component';
import { HeaderComponent } from './header/header.component';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import { PropertyAddComponent } from './properties/property-add/property-add.component';
import {UploaderModule} from "./uploader/uploader.module";
import {PledgeService} from "./services/pledge.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    UploaderModule,
    CoreModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [PledgeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
