import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions, DestinationType, EncodingType, PictureSourceType } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private imgSrc: string;

  constructor(
    public navCtrl: NavController, 
    private camera: Camera, 
    //private transfer: Transfer, 
    private file: File, 
    private filePath: FilePath) { }

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
      var currentPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      alert(`After get picture: ${imagePath}`)
      alert(`currentName: ${currentName}`); 
      alert(`currentPath: ${currentPath}`);      
      //this.copyFileToLocalDir(currectPath, currentName, this.createFileName());
      this.copyFileToLocalDir(currentPath, currentName);
    });
  }

  copyFileToLocalDir(currentPath, currentName) {
    this.file.copyFile(currentPath, currentName, cordova.file.dataDirectory, currentName).then(success => {
      this.imgSrc = cordova.file.dataDirectory + currentName;
      alert(`success: ${success}`);
      alert(`imgSrc: ${this.imgSrc}`);
    }, error => {
      alert('Error while storing file.');
      //this.presentToast('Error while storing file.');
    });;
  }

}
