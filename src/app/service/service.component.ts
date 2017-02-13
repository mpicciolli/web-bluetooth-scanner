import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  @Input() service: BluetoothRemoteGATTService;

  characteristics: BluetoothRemoteGATTCharacteristic[];

  constructor() {
  }

  ngOnInit() {
    this.service.getCharacteristics().then(characteristics => {
      console.log('> Service: ' + this.service.uuid);
      this.characteristics = characteristics;
    });
  }
}
