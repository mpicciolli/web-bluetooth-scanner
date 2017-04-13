import {Component, OnInit, Input} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {CharacteristicService} from "../../services/characteristic.service";
import {TdDialogService} from "@covalent/core";

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
  writable: boolean;
  isNotified: boolean;
  newValue$: Observable<any>;
  notification: Subscription;

  constructor(private _characteristicService: CharacteristicService, private _dialogService: TdDialogService) {
  }

  ngOnInit(): void {
    this.characteristicName = this._characteristicService.getName(this.characteristic.uuid);
    this.readable = this.characteristic.properties.read;
    this.notifiable = this.characteristic.properties.notify;
    this.writable = this.characteristic.properties.write;
    this.isNotified = false;
    this.supportedProperties = this.getSupportedProperties();
    console.log('>> Characteristic: ' + this.characteristicName + ' ' + this.supportedProperties);
  }

  async read(){
    const value = await this.characteristic.readValue();
    this.characteristicValue = this._characteristicService.read(this.characteristic, value);
  }

  async write() {
    const value = await this.characteristic.readValue();
    let readValue = this._characteristicService.read(this.characteristic, value);

    this._dialogService.openPrompt({
      title: 'Value',
      message: '',
      value: readValue,
      cancelButton: 'Cancel',
      acceptButton: 'Ok',
    }).afterClosed().subscribe(async(newValue: string) => {
      if (newValue)
        await this.characteristic.writeValue(this._characteristicService.write(this.characteristic, newValue));
    });
  }

  async notify() {
    if (this.isNotified) {
      try {
        await this.characteristic.stopNotifications();
        console.log('> Notifications stopped: ' + this.characteristicName);
        this.unNotify();
      }
      catch (err) {
        console.log(`Error :  ${err}`);
      }
    }
    else {
      try {
        this.characteristic.startNotifications();
        console.log('> Notifications started: ' + this.characteristicName);
        this.isNotified = true;
        this.newValue$ = Observable.fromEvent(this.characteristic, 'characteristicvaluechanged');
        this.notification = this.newValue$.subscribe(
          ev => this.handleCharacteristicValueChanged(ev.target.value),//this.handleCharacteristicValueChanged,
          err => console.log(`Error :  ${err}`));
      }
      catch (err) {
        console.log(`Error :  ${err}`);
      }
    }
  }

  private handleCharacteristicValueChanged(value: DataView) {
    console.log('Received ' + value);
    // TODO: Parse Heart Rate Measurement value.
    this.characteristicValue = this._characteristicService.read(this.characteristic, value);
  }

  private unNotify() {
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
