import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MembersService } from '../../../Services/members.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../../Models/Member';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { DatePipe } from '@angular/common';
import { MessageService } from '../../../Services/message.service';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { AccountService } from '../../../Services/account.service';
import { PresenceService } from '../../../Services/presence.service';
import { HubConnectionState } from '@microsoft/signalr';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule, GalleryModule, TimeagoModule, DatePipe, MemberMessagesComponent],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit, OnDestroy {

  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
  private messageService = inject(MessageService);
  // private memberService = inject(MembersService);
  private accountService = inject(AccountService);
  presenceService = inject(PresenceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  // member? : Member;
  member: Member = {} as Member;
  images : GalleryItem[] =[];
  activeTab?: TabDirective;
  // messages: Message[] = [];


  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => {
        this.member = data['member'];
        this.member && this.member.photos.map(p => {
          this.images.push(new ImageItem({src: p.url, thumb: p.url}))
        })
      }
    })

    this.route.paramMap.subscribe({
      next: _ => this.onRouteParamsChange()
    })

    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })
  }

  // onUpdateMessages(event: Message) {
  //   this.messages.push(event);
  // }

  selectTab(heading: string) {
    if (this.memberTabs) {
      const messageTab = this.memberTabs.tabs.find(x => x.heading === heading);
      if (messageTab) messageTab.active = true;
    }
  }

  onRouteParamsChange() {
    const user = this.accountService.currentUser();
    if (!user) return;
    if (this.messageService.hubConnection?.state === HubConnectionState.Connected && this.activeTab?.heading === 'Messages') {
      this.messageService.hubConnection.stop().then(() => {
        this.messageService.createHubConnection(user, this.member.userName);
      })
    }
  }
  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    // if (this.activeTab.heading === 'Messages' && this.messages.length === 0 && this.member) {
    //   this.messageService.getMessageThread(this.member.userName).subscribe({
    //     next: messages => this.messages = messages

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {tab: this.activeTab.heading},
      queryParamsHandling: 'merge'
    })
    if (this.activeTab.heading === 'Messages' && this.member) {
      const user = this.accountService.currentUser();
      if (!user) return;
      this.messageService.createHubConnection(user, this.member.userName);
    } else {
      this.messageService.stopHubConnection();


    }
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  // loadMember(){
  //     const username = this.route.snapshot.paramMap.get('username');
  //     if(!username) return;
  //     this.memberService.getMember(username).subscribe({
  //     next : member => {
  //       this.member = member,
  //       member.photos.map(p => {
  //         this.images.push(new ImageItem({src : p.url , thumb : p.url}))

  //       })

  //     }
  //   })
  // }



}
