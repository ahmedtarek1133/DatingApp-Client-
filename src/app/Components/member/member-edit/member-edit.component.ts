import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from './../../../Services/account.service';
import { Component, Host, HostListener, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { Member } from '../../../Models/Member';
import { MembersService } from '../../../Services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditorComponent } from "../../photos/photo-editor/photo-editor.component";
import { DatePipe } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule, PhotoEditorComponent, DatePipe, TimeagoModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{
  @ViewChild('editForm') editForm?:NgForm;
  @HostListener('window : beforeunload' , ['$event']) notify($event:any){
    if(this.editForm?.dirty){
      $event.returnValue=true;
    }
  }
  member?: Member;
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember(){
    const user = this.accountService.currentUser();
    if(!user) return;
    this.memberService.getMember(user.username).subscribe({
      next : member => this.member = member
    })
  }


  updateMember(){
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next : _ => {
        this.toastr.success("Profile updated successfully");
        this.editForm?.reset(this.member);
      }
    })
  }

  onMemberChange(event: Member) {
    this.member = event;
  }

}
