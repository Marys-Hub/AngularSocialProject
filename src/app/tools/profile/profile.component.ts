import { Component, Input, OnInit } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  @Input() show: boolean = false;

  firestore: FirebaseTSFirestore;
  auth: FirebaseTSAuth;

  constructor(){
    this.firestore = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth();
  };
  
  ngOnInit(): void {
    
  }

  onContinueClick(
    nameInput: HTMLInputElement,
    descriptionInput: HTMLTextAreaElement) {

      let name = nameInput.value; //data in each document - json objects 
      let description = descriptionInput.value;
      this.firestore.create(
        {
          path: ["Users", this.auth?.getAuth()?.currentUser?.uid || '{}'], //could be null 
          data: {  
            publicName: name,
            description: description 
          },
          onComplete: (docId) => {
            alert("Profile Created");
            nameInput.value = "";
            descriptionInput.value = "";
          },
          onFail: (err) => {}
        }
      );
    }

}
