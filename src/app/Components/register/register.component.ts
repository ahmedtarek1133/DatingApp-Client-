import { Component, EventEmitter, inject, Input, input, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
// @Input() usersFromHomeComponent :any;
// @Output() cancelRegister = new EventEmitter();
// usersFromHomeComponent = input.required<any>();
  private accountService = inject(AccountService);
  cancelRegister =output<boolean>();
  model :any = {};
  register(){
    this.accountService.register(this.model).subscribe({
      next : Response => {
        console.log(Response);
        this.cancel
      },
      error : error =>{console.log(error)}
    })
  };

  cancel(){
    this.cancelRegister.emit(false);
  };

}
