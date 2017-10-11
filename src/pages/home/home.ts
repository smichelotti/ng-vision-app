import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { Camera, CameraOptions, DestinationType, EncodingType, PictureSourceType } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public imgSrc: string;
  public base64Image: string;

  constructor(
    public navCtrl: NavController, 
    private camera: Camera, 
    private fileTransfer: FileTransfer, 
    private file: File, 
    public loadingCtrl: LoadingController) { }

  takePicture() {
    let options: CameraOptions = {
      quality: 50,
      destinationType: DestinationType.FILE_URL,
      sourceType: PictureSourceType.CAMERA,
      encodingType: EncodingType.PNG,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false//,
     // correctOrientation: true
    };
    
    this.camera.getPicture(options).then((imagePath) => {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var currentPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(currentPath, currentName);
    });
  }

  copyFileToLocalDir(currentPath, currentName) {
    this.file.copyFile(currentPath, currentName, cordova.file.dataDirectory, currentName).then(success => {
      this.imgSrc = cordova.file.dataDirectory + currentName;
    }, error => {
      alert('Error while storing file.');
    });;
  }

  uploadImage() {
    const loading = this.loadingCtrl.create({
      content: 'Analyzing...',
    });

    let options: FileUploadOptions = {
      mimeType: 'application/octet-stream',
      headers: {
        'Ocp-Apim-Subscription-Key': 'b867a02e0594487fb6cdcb52d9dd11bd'
      }
    };
    const visionApiUrl = 'https://eastus.api.cognitive.microsoft.com/vision/v1.0/describe';

    let fileTransfer = this.fileTransfer.create();

    loading.present();
    fileTransfer.upload(this.imgSrc, visionApiUrl, options).then(data => {
      let json = JSON.parse(data.response);
      loading.dismissAll();
      alert(json.description.captions[0].text);
    }, err => {
      loading.dismissAll();
      alert(`**error: ${err.body}`);
    });
  }

}
