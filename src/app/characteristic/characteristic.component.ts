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
  supportedProperties: string;
  characteristicName: string;
  characteristicValue: string;
  readable: boolean;
  notifiable: boolean;
  isNotified: boolean;
  newValue$: Observable<any>;
  notification: Subscription;

  constructor(private _characteristicService: CharacteristicService) {
  }

  ngOnInit(): void {
    this.characteristicName = this._characteristicService.getName(this.characteristic.uuid);
    this.readable = this.characteristic.properties.read;
    this.notifiable = this.characteristic.properties.notify;
    this.isNotified = false;
    this.supportedProperties = this.getSupportedProperties();
    console.log('>> Characteristic: ' + this.characteristicName + ' ' + this.supportedProperties);

  }

  read(): void {
    this.characteristic.readValue().then(value => {
      this.characteristicValue = this._characteristicService.read(this.characteristic, value);
    });
  }

  write() {

  }

  notify() {
    if (this.isNotified) {
      // this.unNotify();
      this.characteristic.stopNotifications()
        .then(_ => {
          console.log('> Notifications stopped: ' + this.characteristicName);
          this.unNotify();
        })
        .catch(err => console.log(`Error :  ${err}`));
    }
    else {
      this.characteristic.startNotifications().then(_ => {
        console.log('> Notifications started: ' + this.characteristicName);
        this.isNotified = true;
        this.newValue$ = Observable.fromEvent(this.characteristic, 'characteristicvaluechanged');
        this.notification = this.newValue$.subscribe(
          ev => this.handleCharacteristicValueChanged(ev.target.value),//this.handleCharacteristicValueChanged,
          err => console.log(`Error :  ${err}`));
      });
    }
  }

  private handleCharacteristicValueChanged(value: DataView) {
    console.log('Received ' + value);
    // TODO: Parse Heart Rate Measurement value.
    this.characteristicValue = this._characteristicService.read(this.characteristic, value);
  }

  handleNotifications(event) {
    let value = event.target.value;
    console.log(value);
  }

  unNotify() {
    this.isNotified = false;
    this.notification.unsubscribe();
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
