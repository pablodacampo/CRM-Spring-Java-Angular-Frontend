import { AddressEntity } from './../../../interfaces/address-entity';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {

@Input() entity: AddressEntity;

  constructor() { }

  ngOnInit(): void {

  }

}
