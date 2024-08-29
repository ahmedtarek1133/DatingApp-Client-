import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../Components/member/member-edit/member-edit.component';
import { inject } from '@angular/core';
import { ConfirmService } from '../Services/confirm.service';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  const confirmService = inject(ConfirmService);
  if(component.editForm?.dirty){
    // return confirm('Are you sure you want to continue ? Any unsaved changed will be lost')
    return confirmService.confirm() ?? false;
  }
  return true;
};
