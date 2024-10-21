import { Component, OnInit } from '@angular/core';
import { Contacts } from '@capacitor-community/contacts';
import { Capacitor } from '@capacitor/core';  
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  perm:any
  
  contacts:any =[]
  constructor() { }

  ngOnInit() {
    this.getContact()
  }

  async getContact(){

    try {
      const permission = await Contacts.requestPermissions();
      this.perm = permission
      if(!permission.contacts) return;
      else if(permission.contacts == 'granted'){
     const conResult = await   Contacts.getContacts({
          projection: {
            name: true,
            phones:true
          }
        });
        this.contacts = conResult.contacts;
      }
    } catch (e) {
      console.log(e);
      
    }
  }

  callNumber:any

  call(val:any){

    let phoneNumber = val.phones[0].number;
    this.callNumber.callNumber(phoneNumber,true).then((res:any) => console.log("Launched dialer", res))
    .catch((err:any) => console.log('Error launching dialer',err));
  }

}
