import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailResolverService } from './email-resolver.service';
import { EmailShowComponent } from './email-show/email-show.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'not-found', component: PlaceholderComponent },
      { path: ':id', component: EmailShowComponent, resolve: { email: EmailResolverService } },
      { path: '', component: PlaceholderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
