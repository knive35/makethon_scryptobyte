import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { RouterModule, Routes } from "@angular/Router";
import  {HomeComponent} from './home/home.component';
import {ScanQrComponent} from './home/scan-qr/scan-qr.component';
import {RegisterComponent} from './home/register/register.component';
import { VisitorDataComponent } from './visitor-data/visitor-data.component';


const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component:HomeComponent },
  { path: "scanqr", component: ScanQrComponent },
  { path: "register", component: RegisterComponent },
  { path: "visitor-data/:id/:name/:refEmail/:purpose", component: VisitorDataComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }