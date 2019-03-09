import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	newVisitor: {
    visitorName: string;
    purpose: string;
    contactPerson: string;
    email: string;
  };

  successMessage: string;

  constructor() { }

  ngOnInit() {
  	this.newVisitor = {
      visitorName: "",
      purpose: "",
      contactPerson: "",
      email: ''
    };

    this.successMessage = "";
  }

  public registerVisitor() {
    this.successMessage = "Visitor successfully added ";
    window.localStorage.setItem("newVisitor", JSON.stringify(this.newVisitor));
}


}
