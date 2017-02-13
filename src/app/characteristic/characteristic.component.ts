import {Component, OnInit, Input} from '@angular/core';
import {DeviceType} from "../common/DeviceType";

@Component({
  selector: 'app-characteristic',
  templateUrl: './characteristic.component.html',
  styleUrls: ['./characteristic.component.css']
})
export class CharacteristicComponent implements OnInit {
  @Input() characteristic: BluetoothRemoteGATTCharacteristic;

  constructor() {
  }

  ngOnInit() {
    console.log('>> Characteristic: ' + this.characteristic.uuid + ' ' + this.getSupportedProperties(this.characteristic));

    switch (this.characteristic.uuid) {
      case BluetoothUUID.getCharacteristic('gap.appearance'):
        console.log(this.readAppearanceValue(this.characteristic));
        break;

      case BluetoothUUID.getCharacteristic('gap.device_name'):
        console.log(this.readDeviceNameValue(this.characteristic));
        break;

      case BluetoothUUID.getCharacteristic('gap.peripheral_preferred_connection_parameters'):
        console.log(this.readPPCPValue(this.characteristic));
        break;

      case BluetoothUUID.getCharacteristic('gap.central_address_resolution_support'):
        console.log(this.readCentralAddressResolutionSupportValue(this.characteristic));
        break;

      case BluetoothUUID.getCharacteristic('gap.peripheral_privacy_flag'):
        console.log(this.readPeripheralPrivacyFlagValue(this.characteristic));
        break;
      default:
        console.log('> Unknown Characteristic: ' + this.characteristic.uuid);
    }
  }

  private getSupportedProperties(characteristic) {
    let supportedProperties = [];
    for (const p in characteristic.properties) {
      if (characteristic.properties[p] === true) {
        supportedProperties.push(p.toUpperCase());
      }
    }
    return '[' + supportedProperties.join(', ') + ']';
  }

  private readAppearanceValue(characteristic) {
    return characteristic.readValue().then(value => {
      console.log('> Appearance: ' +
        this.getDeviceType(value.getUint16(0, true /* Little Endian */)));
    });
  }

  private readDeviceNameValue(characteristic) {
    return characteristic.readValue().then(value => {
      console.log('> Device Name: ' + new TextDecoder().decode(value));
    });
  }

  private readPPCPValue(characteristic) {
    return characteristic.readValue().then(value => {
      console.log('> Peripheral Preferred Connection Parameters: ');
      console.log('  > Minimum Connection Interval: ' +
        (value.getUint8(0) | value.getUint8(1) << 8) * 1.25 + 'ms');
      console.log('  > Maximum Connection Interval: ' +
        (value.getUint8(2) | value.getUint8(3) << 8) * 1.25 + 'ms');
      console.log('  > Slave Latency: ' +
        (value.getUint8(4) | value.getUint8(5) << 8) + 'ms');
      console.log('  > Connection Supervision Timeout Multiplier: ' +
        (value.getUint8(6) | value.getUint8(7) << 8));
    });
  }

  private readCentralAddressResolutionSupportValue(characteristic) {
    return characteristic.readValue().then(value => {
      let supported = value.getUint8(0);
      if (supported === 0) {
        console.log('> Central Address Resolution: Not Supported');
      } else if (supported === 1) {
        console.log('> Central Address Resolution: Supported');
      } else {
        console.log('> Central Address Resolution: N/A');
      }
    });
  }

  private readPeripheralPrivacyFlagValue(characteristic) {
    return characteristic.readValue().then(value => {
      let flag = value.getUint8(0);
      if (flag === 1) {
        console.log('> Peripheral Privacy Flag: Enabled');
      } else {
        console.log('> Peripheral Privacy Flag: Disabled');
      }
    });
  }

  private getDeviceType(value) {
    // Check out page source to see what valueToDeviceType object is.
    return value +
      (value in DeviceType.deviceTypeList ? ' (' + DeviceType.deviceTypeList[value] + ')' : '');
  }
}
