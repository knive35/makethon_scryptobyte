import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ScanQrComponent } from './home/scan-qr/scan-qr.component';
import { RegisterComponent } from './home/register/register.component';

import { NgQrScannerModule } from 'angular2-qrscanner';
import { HttpModule } from '@angular/http';
import { QrCodeReaderService } from './qr-code-reader.service';
import { VisitorDataComponent } from './visitor-data/visitor-data.component';
import {WebcamModule} from 'ngx-webcam';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScanQrComponent,
    RegisterComponent,
    VisitorDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ZXingScannerModule,
    HttpModule,
    NgQrScannerModule,
    WebcamModule
  ],
  providers: [QrCodeReaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
