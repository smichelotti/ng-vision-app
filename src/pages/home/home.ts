import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions, DestinationType, EncodingType, PictureSourceType } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
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
    private filePath: FilePath) { }

  takePicture() {
    let options: CameraOptions = {
      destinationType: DestinationType.FILE_URL,
      //destinationType: DestinationType.DATA_URL,
      sourceType: PictureSourceType.CAMERA,
      encodingType: EncodingType.PNG,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    
    // this.camera.getPicture(options).then((imgData) => {
    //   this.base64Image = "data:image/jpeg;base64," + imgData;
    // });

    this.camera.getPicture(options).then((imagePath) => {
      this.imgSrc = imagePath;
      
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
    //alert(`**inside copyFile func; dir: ${cordova.file.dataDirectory}`);
    alert(`**inside copyFile func; cordova: ${cordova}`);
    alert(`**inside copyFile func; cordova.file: ${cordova.file}`);
    alert(`file.dataDir: ${this.file.dataDirectory}`);
    this.file.copyFile(currentPath, currentName, cordova.file.dataDirectory, currentName).then(success => {
      this.imgSrc = cordova.file.dataDirectory + currentName;
      alert(`success: ${success}`);
      alert(`imgSrc: ${this.imgSrc}`);
    }, error => {
      alert('Error while storing file.');
      //this.presentToast('Error while storing file.');
    });;
  }

  uploadImage() {
    let options: FileUploadOptions = {
      mimeType: 'application/octet-stream',
      headers: {
        'Ocp-Apim-Subscription-Key': 'b867a02e0594487fb6cdcb52d9dd11bd'
      }
    };

    let fileTransfer = this.fileTransfer.create();

    fileTransfer.upload(this.imgSrc, 'https://eastus.api.cognitive.microsoft.com/vision/v1.0/describe', options).then(data => {
      alert(`**success: ${data}`);
    }, err => {
      alert(`**error: ${err}`);
    });
  }

}
