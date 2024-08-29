import { TimeagoModule } from 'ngx-timeago';
import { AfterViewChecked, Component, inject, input, output, ViewChild } from '@angular/core';
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
export class MemberMessagesComponent implements AfterViewChecked{
  @ViewChild('messageForm') messageForm?: NgForm;
  @ViewChild('scrollMe') scrollContainer?: any;
  messageService = inject(MessageService);
  username = input.required<string>();
  // messages = input.required<Message[]>();
  messageContent = '';
  // updateMessages = output<Message>();

  sendMessage() {
    // this.messageService.sendMessage(this.username(), this.messageContent).subscribe({
    //   next: message => {
    //     this.updateMessages.emit(message);
    //     this.messageForm?.reset();
    //   }
    this.messageService.sendMessage(this.username(), this.messageContent).then(() => {
      this.messageForm?.reset();
      this.scrollToBottom();
    })
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
  
}
