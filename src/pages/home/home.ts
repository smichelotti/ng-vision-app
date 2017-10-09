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
    

    this.camera.getPicture(options).then((imageUri) => {
      this.imgPath = imageUri;
    });
  }

}
