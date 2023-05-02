import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  auth = new FirebaseTSAuth();

  constructor(private router: Router){ }

  ngOnInit(): void{
    const currentUser = this.auth.getAuth().currentUser;

    if (currentUser && this.auth.isSignedIn() && !currentUser.emailVerified) {
      this.auth.sendVerificationEmail();
    } else {
      this.router.navigate([""]);
    }   /// am schimbat cu const pt ca zicea ca might be null part 5 , 11;40.
    
  }

  onResendClick(){
    this.auth.sendVerificationEmail();}



}
