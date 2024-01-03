import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxModule } from './inbox/inbox.module';

const routes: Routes = [
  { path: 'inbox', loadChildren: () => InboxModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
