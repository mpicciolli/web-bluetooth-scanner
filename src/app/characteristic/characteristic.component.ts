import {Component, OnInit, Input} from '@angular/core';
import {DeviceType} from "../common/DeviceType";
import {Vendors} from "../common/Vendors";

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

    let decoder = new TextDecoder('utf-8');
    let queue = Promise.resolve();

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

      //Device-information-characteristics
      case BluetoothUUID.getCharacteristic('manufacturer_name_string'):
        queue = queue.then(_ => this.characteristic.readValue()).then(value => {
          console.log('> Manufacturer Name String: ' + decoder.decode(value));
        });
        break;
      case BluetoothUUID.getCharacteristic('model_number_string'):
        queue = queue.then(_ => this.characteristic.readValue()).then(value => {
          console.log('> Model Number String: ' + decoder.decode(value));
        });
        break;

      case BluetoothUUID.getCharacteristic('hardware_revision_string'):
        queue = queue.then(_ => this.characteristic.readValue()).then(value => {
          console.log('> Hardware Revision String: ' + decoder.decode(value));
        });
        break;
      case BluetoothUUID.getCharacteristic('firmware_revision_string'):
        queue = queue.then(_ => this.characteristic.readValue()).then(value => {
          console.log('> Firmware Revision String: ' + decoder.decode(value));
        });
        break;
      case BluetoothUUID.getCharacteristic('software_revision_string'):
        queue = queue.then(_ => this.characteristic.readValue()).then(value => {
          console.log('> Software Revision String: ' + decoder.decode(value));
        });
        break;
      case BluetoothUUID.getCharacteristic('system_id'):
        queue = queue.then(_ => this.characteristic.readValue()).then(value => {
          console.log('> System ID: ');
          console.log('  > Manufacturer Identifier: ' +
            this.padHex(value.getUint8(4)) + this.padHex(value.getUint8(3)) +
            this.padHex(value.getUint8(2)) + this.padHex(value.getUint8(1)) +
            this.padHex(value.getUint8(0)));
          console.log('  > Organizationally Unique Identifier: ' +
            this.padHex(value.getUint8(7)) + this.padHex(value.getUint8(6)) +
            this.padHex(value.getUint8(5)));
        });
        break;
      case BluetoothUUID.getCharacteristic('ieee_11073-20601_regulatory_certification_data_list'):
        queue = queue.then(_ => this.characteristic.readValue()).then(value => {
          console.log('> IEEE 11073-20601 Regulatory Certification Data List: ' +
            decoder.decode(value));
        });
        break;
      case BluetoothUUID.getCharacteristic('pnp_id'):
        queue = queue.then(_ => this.characteristic.readValue()).then(value => {
          console.log('> PnP ID:');
          console.log('  > Vendor ID Source: ' +
            (value.getUint8(0) === 1 ? 'Bluetooth' : 'USB'));
          if (value.getUint8(0) === 1) {
            console.log('  > Vendor ID: ' +
              (value.getUint8(1) | value.getUint8(2) << 8));
          } else {
            console.log('  > Vendor ID: ' + this.getUsbVendorName(value.getUint8(1) | value.getUint8(2) << 8));
          }
          console.log('  > Product ID: ' +
            (value.getUint8(3) | value.getUint8(4) << 8));
          console.log('  > Product Version: ' +
            (value.getUint8(5) | value.getUint8(6) << 8));
        });
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
      (value in DeviceType ? ' (' + DeviceType[value] + ')' : '');
  }

  private padHex(value) {
    return ('00' + value.toString(16).toUpperCase()).slice(-2);
  }

  private getUsbVendorName(value) {
    // Check out page source to see what valueToUsbVendorName object is.
    return value +
      (value in Vendors ? ' (' + Vendors[value] + ')' : '');
  }
}
