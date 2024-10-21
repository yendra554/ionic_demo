import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PluginListenerHandle } from '@capacitor/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { NavController } from '@ionic/angular';
import { Toast } from '@capacitor/toast';
@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
})
export class NetworkPage implements OnInit, OnDestroy {

  networkListner:  PluginListenerHandle | any;
  status! : any;

  constructor(public navCtrl: NavController,  private router: Router,private ngZone: NgZone) {
    
   }


  navigatePage(val:any) {
    
   
    this.router.navigateByUrl(val)


  }
  async ngOnInit() {

    this.networkListner= await  Network.addListener('networkStatusChange', status => {
      // this.status = status
      // console.log('Network status changed', status);
      this.ngZone.run(() =>{
        this.changeStatus(status)
     
        // this.status = status.connected ?'Online':'Offline';
      })
    });

  const status = await Network.getStatus()
   this.changeStatus(status)
    console.log('Network status', this.status);
    
  }


  async changeStatus(status:any){
    this.status = status.connected ? 'Online':'Offline';
  
      await Toast.show({
        text:  this.status,
      });
  
  }

  ngOnDestroy(){
    if(this.networkListner) this.networkListner.remove();
  }
}
