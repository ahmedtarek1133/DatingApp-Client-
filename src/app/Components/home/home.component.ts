import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  registermode = false;

  registerToggle(){
    this.registermode = !this.registermode;
  }

  cancelRegisterMode(event : boolean){
    this.registermode =event;
  }

}
