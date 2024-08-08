import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../Services/account.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
const accountServive = inject(AccountService);
const toastr = inject(ToastrService);
if (accountServive.currentUser()) return true;
else {
  toastr.error('you shall not pass');
  return false;
}

};
