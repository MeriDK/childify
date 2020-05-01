import { Component, AfterViewInit, Input } from '@angular/core';
import $ from 'node_modules/jquery'
import  RegistrationService  from './registrationService'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-registration-add-create-family',
  templateUrl: './registration-add-create-family.component.html',
  styleUrls: ['./registration-add-create-family.component.scss','../registration/registration.component.scss'],
  providers: [ApiService]
})
export class RegistrationAddCreateFamilyComponent implements AfterViewInit {

  isChild: any;
  data : any;
  isCreate : boolean;

  constructor(private api: ApiService) {
    this.data = {family_id: '', name: ''}
  }

  ngAfterViewInit(): void {
    this.setAccessToCreate()
  }

  setAccessToCreate(): void {
    if(this.isChild) {
      $("li.tab--create").css("cursor", "no-drop")
      $("li.tab--create").children().addClass("disabled")
    }
  }

  connectCreateFamily(): void {
    if (this.isCreate) {
      RegistrationService.createNewFamily(this.api, {name: this.data.name})
    }
    else {
      RegistrationService.connectToFamily(this.api, {family_id: this.data.family_id})
    }
  }
}
