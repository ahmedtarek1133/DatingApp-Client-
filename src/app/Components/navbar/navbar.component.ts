import { AccountService } from './../../Services/account.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrService } from 'ngx-toastr';
import { HasRoleDirective } from '../../Directives/has-role.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule ,BsDropdownModule,RouterLink,RouterLinkActive,HasRoleDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
accountService = inject(AccountService);
private router = inject(Router);
private toaster = inject(ToastrService);
model : any = {};


login(){
  return this.accountService.login(this.model)
  .subscribe({
    next : () => this.router.navigateByUrl('/members'),
    error : error=> this.toaster.error(error.error)
  });
}

logout(){
this.accountService.logout();
this.router.navigateByUrl('/')
}

}
