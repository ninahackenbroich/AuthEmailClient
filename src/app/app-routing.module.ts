import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxModule } from './inbox/inbox.module';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'inbox',
    canLoad: [authGuard],
    loadChildren: () => import('./inbox/inbox.module').then(m => m.InboxModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
