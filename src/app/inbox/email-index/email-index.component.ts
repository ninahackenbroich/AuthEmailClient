import { Component } from '@angular/core';
import { EmailService } from '../email.service';

interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}
@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css']
})

export class EmailIndexComponent {
  emails: EmailSummary[] = []; // Explicitly type the emails variable as an array of EmailSummary objects
  constructor(private emailService: EmailService) {

  }

  ngOnInit() {
    this.emailService.getEmails().subscribe((emails: EmailSummary[]) => { // Explicitly type the emails parameter as an array of EmailSummary objects
      this.emails = emails;
    })
  }
}
