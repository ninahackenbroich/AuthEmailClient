import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Email } from '../email';
import { EmailService } from '../email.service';
@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent {

  showModal = false;
  @Input() email!: Email;

  constructor(private authService: AuthService, private emailService: EmailService) {

  }

  ngOnInit() {
    const text = this.email.text.replace(/\n/gi, '\n> ');
    this.email = {
      ...this.email,
      id: '',
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      html: this.email.html,
      text: `\n\n\n------------- ${this.email.from} wrote: \n\n> ${text}`,
      from: this.email.to,
    };
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
