import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
// import {Component, OnInit} from '@angular/core';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas'


import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

declare global {
    interface Window { html2canvas: any; }
}

window.html2canvas = window.html2canvas || {};

@Component({
  selector: 'app-visitor-data',
  templateUrl: './visitor-data.component.html',
  styleUrls: ['./visitor-data.component.css']
})
export class VisitorDataComponent implements OnInit {
	//window.html2canvas = html2canvas
  id:string;
	visitorName:string;
	refEmail:string;
	purpose:string;
  showWebcam:boolean=false;
  showImageCard:boolean=true;
  showSnapPicButton:boolean=false;
  showTakePicButton:boolean=true;
  showRetakePicButton:boolean=false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  	this.id = this.route.snapshot.paramMap.get("id");
  	this.visitorName = this.route.snapshot.paramMap.get("name");
  	this.refEmail=this.route.snapshot.paramMap.get("refEmail");
  	this.purpose=this.route.snapshot.paramMap.get("purpose");

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });

  }

  startCamera(){
    this.showImageCard=false;
    this.showWebcam=true;
    this.showTakePicButton=false;
    this.showSnapPicButton=true;
  }
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    width: {ideal: 300},
    height: {ideal: 225}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  // public ngOnInit(): void {
  //   WebcamUtil.getAvailableVideoInputs()
  //     .then((mediaDevices: MediaDeviceInfo[]) => {
  //       this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
  //     });
  // }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.showWebcam=false;
    this.showSnapPicButton=false;
    this.showRetakePicButton=true;
  }

  // public toggleWebcam(): void {
  //   this.showWebcam = !this.showWebcam;
  // }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  reTakePicFun(){
    this.showWebcam=true;
    this.showSnapPicButton=true;
    this.showRetakePicButton=false;
    this.webcamImage=null;
  }

async downloadPdf() {
  this.showRetakePicButton=false;
  //await delay(1000);
    let doc = new jsPDF();
    doc.text('',100,100);
    setTimeout(()=>{doc.addHTML(document.getElementsByClassName("card-body"), function() {
       doc.save("gatePass.pdf");
    });
  }, 2000);
}


}
