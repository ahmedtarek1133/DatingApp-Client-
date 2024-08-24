import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { MembersService } from '../Services/members.service';
import { Member } from '../Models/Member';

export const memberDetailedResolver: ResolveFn<Member | null> = (route, state) => {
  const memberService = inject(MembersService);

  const username = route.paramMap.get('username');

  if (!username) return null;

  return memberService.getMember(username);
};
