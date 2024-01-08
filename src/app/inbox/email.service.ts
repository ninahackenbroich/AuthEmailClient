import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}
@Injectable({
  providedIn: 'root'
})


export class EmailService {
  rootUrl = 'https://api.angular-email.com/emails';


  constructor(private htttp: HttpClient) { }

  getEmails() {
    return this.htttp.get<EmailSummary[]>(this.rootUrl);
  }
}
