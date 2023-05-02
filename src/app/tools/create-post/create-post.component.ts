import { Component, OnInit } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  selectedImageFile!: File;
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();
  constructor(){}

  ngOnInit(): void { }

  onPostClick(commentInput: HTMLTextAreaElement) {

    let comment = commentInput.value;
    let postId = this.firestore.genDocId();

    this.storage.upload(
      {
        uploadName: "upload Image Post",
        path: ["Posts", postId, "image"],
        data: {
          data: this.selectedImageFile
        },
        onComplete: (downloadUrl) => {
          alert(downloadUrl);}
      }
    );

}

  onPhotoSelected(photoSelector: HTMLInputElement) {
    if (photoSelector?.files?.length) {
      this.selectedImageFile = photoSelector.files[0];
      if(!this.selectedImageFile) return; //prevent from crashing if no image is selected 
      let fileReader = new FileReader();
      fileReader.readAsDataURL(this.selectedImageFile);
      fileReader.addEventListener(
          "loadend",
          ev => {
            if (fileReader.result) { // Check if result is not null
              let readableString = fileReader.result.toString();
              // Do something with the readable string
              let postPreviewImage = <HTMLImageElement>document.getElementById("post-preview-image");
              postPreviewImage.src = readableString;
            }
          }
        );
    }
  }


}
