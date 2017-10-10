import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions, DestinationType, EncodingType, PictureSourceType } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private imgPath: string;

  constructor(public navCtrl: NavController, private camera: Camera) {

  }

  takePicture() {
    let options: CameraOptions = {
      destinationType: DestinationType.FILE_URL,
      sourceType: PictureSourceType.CAMERA,
      encodingType: EncodingType.PNG,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    

    this.camera.getPicture(options).then((imagePath) => {
      //this.imgPath = imagePath;
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      alert(`After get picture: ${imagePath}`)
      alert(`currentName: ${currentName}`); 
      alert(`correctPath: ${correctPath}`);      
           
    });
  }

}
