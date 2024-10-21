import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  
  constructor(public navCtrl: NavController,  private router: Router,private ngZone: NgZone) { }


  navigatePage(val:any) {
    
   
    this.router.navigateByUrl(val)


  }

  ngOnInit() {
    
  }

  checkPlatfromForWeb(){
    if(Capacitor.getPlatform() == 'web') return true;
    return false
  }

selectImg : any
 // Native platform (iOS/Android) camera functionality
 async clickPhoto() {
  if (this.checkPlatfromForWeb()) {
    console.log("Running on the web, camera not available.");
    return;
  }

  try {
    // Request permissions and take the photo only on native platforms
    const status = await Camera.requestPermissions();
    if (status.camera === 'granted') {
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Prompt,
        width: 600,
        resultType: CameraResultType.Uri
      });

      console.log("Selected image:", image);
      this.selectImg = image.webPath;

      // Share the image using the Share API
      let shareRet = await Share.share({
        title: 'Image Sharing',
        text: 'Share this Image',
        url: this.selectImg,
        dialogTitle: 'Share Image',
      });

    } else {
      console.log("Camera permission not granted.");
    }
  } catch (error) {
    console.error("Error taking photo or sharing:", error);
  }
}





  // Check if the platform is web
  isPlatformWeb(): boolean {
    return Capacitor.getPlatform() === 'web';
  }

  // This function will be triggered only for native platforms (iOS/Android)
  // async clickPhoto() {
  //   if (this.isPlatformWeb()) {
  //     // Handle web-specific image upload here
  //     console.log("Running on web. Use file input instead.");
  //     return;
  //   }

  //   const status = await Camera.requestPermissions();
  //   if (status.camera === 'granted') {
  //     const image = await Camera.getPhoto({
  //       quality: 90,
  //       source: CameraSource.Prompt,
  //       width: 600,
  //       resultType: CameraResultType.Uri
  //     });

  //     console.log("imageUrl", image);
  //     this.selectImg = image.webPath;
  //   }
  // }

  // Web-specific method to handle file input change event
  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectImg = URL.createObjectURL(file); // Create a web URL for the selected file
    }
  }
}
