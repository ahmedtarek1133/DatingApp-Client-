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
export class HomeComponent implements OnInit {

  http = inject(HttpClient);
  users : any;
  registermode = false;


  ngOnInit(): void {
    this.getUsers();
  }
  registerToggle(){
    this.registermode = !this.registermode;
  }

  cancelRegisterMode(event : boolean){
    this.registermode =event;
  }

  getUsers(){
    this.http.get('http://localhost:5000/api/users').subscribe({
      next : Response => this.users=Response,
      error : Error => console.log(Error),
      complete : () => console.log("Request has completed")
  });
  }


}
