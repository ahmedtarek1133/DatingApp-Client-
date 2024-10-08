import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ListsComponent } from './Components/lists/lists.component';
import { MemberListComponent } from './Components/member/member-list/member-list.component';
import { MemberDetailComponent } from './Components/member/member-detail/member-detail.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { authGuard } from './Guards/auth.guard';
import { MemberEditComponent } from './Components/member/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './Guards/prevent-unsaved-changes.guard';
import { memberDetailedResolver } from './resolvers/member-detailed.resolver';
import { adminGuard } from './Guards/admin.guard';
import { AdminPanelComponent } from './Components/admin/admin-panel/admin-panel.component';

export const routes: Routes = [
  {path :'', component : HomeComponent},
  { path :'',
    runGuardsAndResolvers :'always',
    canActivate :[authGuard],
    children : [
      {path :'lists', component : ListsComponent},
      {path :'members', component : MemberListComponent},
      {path :'members/:username', component : MemberDetailComponent,
        resolve: {member: memberDetailedResolver}},
      {path :'member/edit', component : MemberEditComponent, canDeactivate:[preventUnsavedChangesGuard]},
      {path :'messages', component : MessagesComponent},
      {path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard]}
    ]

  },
  {path :'**', component : HomeComponent, pathMatch : 'full'}

];
