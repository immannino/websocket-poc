import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SocketService } from '../lib/socket.service';
import { FormsModule } from '@angular/forms';
import { AppMaterialsModule } from './app-materials.module';
import { StatusComponent } from './status/status.component';
import { DataService } from '../lib/data.service';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppMaterialsModule
  ],
  providers: [ SocketService, DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
