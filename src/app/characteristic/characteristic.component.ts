import {Component, OnInit, Input} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {CharacteristicService} from "../../services/characteristic.service";

@Component({
  selector: 'app-characteristic',
  templateUrl: './characteristic.component.html',
  styleUrls: ['./characteristic.component.css'],
  viewProviders: [CharacteristicService]
})
export class CharacteristicComponent implements OnInit {
  @Input() characteristic: BluetoothRemoteGATTCharacteristic;
  characteristicName: string;
  characteristicValue: string;
  readable: boolean;
  notifiable: boolean;
  isNotified: boolean;
  newValue$: Observable<any> = Observable.fromEvent(this.characteristic, 'characteristicvaluechanged');
  notification$: Subscription;

  constructor(private _characteristicService: CharacteristicService) {
  }

  ngOnInit(): void {
    this.characteristicName = this._characteristicService.getName(this.characteristic.uuid);
    this.readable = this.characteristic.properties.read;
    this.notifiable = this.characteristic.properties.notify;
    this.isNotified = false;
    console.log('>> Characteristic: ' + this.characteristicName + ' ' + this.getSupportedProperties());
  }

  read(): void {
    this.characteristic.readValue().then(value => {
      this.characteristicValue = this._characteristicService.read(this.characteristic, value);
    });
  }

  write() {

  }

  notify() {
    if(this.isNotified){
      this.unNotify();
    }
    else{
      this.notification$ = this.newValue$.map(ev => ev.target.value).subscribe(
        res => this.handleCharacteristicValueChanged,
        err => console.log(`Error :  ${err}`));
    }
  }

  private handleCharacteristicValueChanged(value: any) {
    console.log('Received ' + value);
    // TODO: Parse Heart Rate Measurement value.
    // See https://github.com/WebBluetoothCG/demos/blob/gh-pages/heart-rate-sensor/heartRateSensor.js
    this.characteristicValue = this._characteristicService.read(this.characteristic, value);
  }

  unNotify() {
    this.notification$.unsubscribe();
  }

  private getSupportedProperties(): string {
    let supportedProperties = [];
    for (const p in this.characteristic.properties) {
      if (this.characteristic.properties[p] === true) {
        supportedProperties.push(p.toUpperCase());
      }
    }
    return '[' + supportedProperties.join(', ') + ']';
  }
}
