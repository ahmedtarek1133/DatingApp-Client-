import { TimeagoModule } from 'ngx-timeago';
import { Component, inject, input, output, ViewChild } from '@angular/core';
import { MessageService } from '../../../Services/message.service';
import { Message } from '../../../Models/message';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [FormsModule,TimeagoModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent {
  @ViewChild('messageForm') messageForm?: NgForm;
  private messageService = inject(MessageService);
  username = input.required<string>();
  messages = input.required<Message[]>();
  messageContent = '';
  updateMessages = output<Message>();

  sendMessage() {
    this.messageService.sendMessage(this.username(), this.messageContent).subscribe({
      next: message => {
        this.updateMessages.emit(message);
        this.messageForm?.reset();
      }
    })
  }
}
