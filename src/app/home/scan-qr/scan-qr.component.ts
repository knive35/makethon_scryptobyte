import { Component, OnInit } from '@angular/core';

import {ViewChild, ViewEncapsulation,} from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { Router } from "@angular/router";


@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ScanQrComponent implements OnInit {

  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;


    constructor(private router: Router) {}

    ngOnInit() {
        this.qrScannerComponent.getMediaDevices().then(devices => {
            //console.log(devices);
            const videoDevices: MediaDeviceInfo[] = [];
            for (const device of devices) {
                if (device.kind.toString() === 'videoinput') {
                    videoDevices.push(device);
                }
            }
            if (videoDevices.length > 0){
                let choosenDev;
                for (const dev of videoDevices){
                    if (dev.label.includes('front')){
                        choosenDev = dev;
                        break;
                    }
                }
                if (choosenDev) {
                    this.qrScannerComponent.chooseCamera.next(choosenDev);
                } else {
                    this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
                }
            }
        });

        this.qrScannerComponent.capturedQr.subscribe(result => {
            console.log(result);
            var visitor:any = JSON.parse(result);
            var id=visitor.id;
            var name=visitor.name;
            var refEmail=visitor.refEmail;
            var purpose=visitor.purpose;
            this.router.navigate(['/visitor-data',id,name,refEmail,purpose]);
        });
    }

}
