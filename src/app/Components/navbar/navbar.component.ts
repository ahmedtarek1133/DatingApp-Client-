import { User } from './../../Models/User';
import { AccountService } from './../../Services/account.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule ,BsDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
accountService = inject(AccountService);
model : any = {};


login(){
  return this.accountService.login(this.model)
  .subscribe({
    next : Response => console.log(Response),
    error : error=> console.log(error)
  });
}

logout(){
this.accountService.logout();
}

}
