import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';

import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PledgeService} from './core/services/pledge.service';
import {UserPanelModule} from "./user-panel/user-panel.module";
import { UserPledgesComponent } from './user-panel/user-pledges/user-pledges.component';
import { PledgeCardComponent } from './pledges/pledge-card/pledge-card.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { PropertiesModule } from './properties/properties.module';
import { UploadsModule } from './uploads/uploads.module';
import { AngularFireStorageModule } from '../../node_modules/angularfire2/storage';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CreatePledgeComponent } from './pledges/create-pledge/create-pledge.component';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    UserPanelModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    PropertiesModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA6u1glIKvjAX36cBpYMD2L0Ras5Im523E'
    })
  ],
  providers: [PledgeService],
  bootstrap: [AppComponent],
  entryComponents: [CreatePledgeComponent]
})
export class AppModule { }
