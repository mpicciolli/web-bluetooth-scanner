import {Component} from '@angular/core'
import {TextDecoder} from 'text-encoding'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  characteristics:BluetoothRemoteGATTCharacteristic[];

  onScan(): void {
    console.log('Requesting any Bluetooth Device...');

    navigator.bluetooth.requestDevice({filters: this.anyNamedDevice().concat({name: ''}), acceptAllDevices:true/*, optionalServices: ['device_information']*/})
      .then((device:BluetoothDevice) => {
        console.log('Connecting to GATT Server...');
        return device.gatt.connect();
      })
      .then((server:BluetoothRemoteGATTServer) => {
        console.log('Getting Device Information Service...');
        return server.getPrimaryService('device_information');
      })
      .then((service:BluetoothRemoteGATTService) => {
        console.log('Getting Device Information Characteristics...');
        return service.getCharacteristics();
      })
      .then((characteristics:BluetoothRemoteGATTCharacteristic[]) => {
        let queue = Promise.resolve();
        let decoder = new TextDecoder('utf-8');
        characteristics.forEach((characteristic:BluetoothRemoteGATTCharacteristic) => {
          // switch (characteristic.uuid) {
          //
          //   case BluetoothUUID.getCharacteristic('manufacturer_name_string'):
          //     queue = queue.then(_ => characteristic.readValue()).then(value => {
          //       console.log('> Manufacturer Name String: ' + decoder.decode(value));
          //     });
          //     break;
          //
          //   case BluetoothUUID.getCharacteristic('model_number_string'):
          //     queue = queue.then(_ => characteristic.readValue()).then(value => {
          //       console.log('> Model Number String: ' + decoder.decode(value));
          //     });
          //     break;
          //
          //   case BluetoothUUID.getCharacteristic('hardware_revision_string'):
          //     queue = queue.then(_ => characteristic.readValue()).then(value => {
          //       console.log('> Hardware Revision String: ' + decoder.decode(value));
          //     });
          //     break;
          //
          //   case BluetoothUUID.getCharacteristic('firmware_revision_string'):
          //     queue = queue.then(_ => characteristic.readValue()).then(value => {
          //       console.log('> Firmware Revision String: ' + decoder.decode(value));
          //     });
          //     break;
          //
          //   case BluetoothUUID.getCharacteristic('software_revision_string'):
          //     queue = queue.then(_ => characteristic.readValue()).then(value => {
          //       console.log('> Software Revision String: ' + decoder.decode(value));
          //     });
          //     break;
          //
          //   case BluetoothUUID.getCharacteristic('system_id'):
          //     queue = queue.then(_ => characteristic.readValue()).then(value => {
          //       console.log('> System ID: ');
          //       console.log('  > Manufacturer Identifier: ' +
          //         this.padHex(value.getUint8(4)) + this.padHex(value.getUint8(3)) +
          //         this.padHex(value.getUint8(2)) + this.padHex(value.getUint8(1)) +
          //         this.padHex(value.getUint8(0)));
          //       console.log('  > Organizationally Unique Identifier: ' +
          //         this.padHex(value.getUint8(7)) + this.padHex(value.getUint8(6)) +
          //         this.padHex(value.getUint8(5)));
          //     });
          //     break;
          //
          //   case BluetoothUUID.getCharacteristic('ieee_11073-20601_regulatory_certification_data_list'):
          //     queue = queue.then(_ => characteristic.readValue()).then(value => {
          //       console.log('> IEEE 11073-20601 Regulatory Certification Data List: ' +
          //         decoder.decode(value));
          //     });
          //     break;
          //
          //   case BluetoothUUID.getCharacteristic('pnp_id'):
          //     queue = queue.then(_ => characteristic.readValue()).then(value => {
          //       console.log('> PnP ID:');
          //       console.log('  > Vendor ID Source: ' +
          //         (value.getUint8(0) === 1 ? 'Bluetooth' : 'USB'));
          //       if (value.getUint8(0) === 1) {
          //         console.log('  > Vendor ID: ' +
          //           (value.getUint8(1) | value.getUint8(2) << 8));
          //       } else {
          //         console.log('  > Vendor ID: ' +
          //           this.getUsbVendorName(value.getUint8(1) | value.getUint8(2) << 8));
          //       }
          //       console.log('  > Product ID: ' +
          //         (value.getUint8(3) | value.getUint8(4) << 8));
          //       console.log('  > Product Version: ' +
          //         (value.getUint8(5) | value.getUint8(6) << 8));
          //     });
          //     break;
          //
          //   default:
          //     console.log('> Unknown Characteristic: ' + characteristic.uuid);
          // }
        });
        this.characteristics = characteristics;
        return queue;
      })
      .catch(error => {
        console.log('Argh! ' + error);
      });
  }

  padHex(value): string {
    return ('00' + value.toString(16).toUpperCase()).slice(-2);
  }

  // getUsbVendorName(value): string {
  //   // Check out page source to see what valueToUsbVendorName object is.
  //   return value + (value in valueToUsbVendorName ? ' (' + valueToUsbVendorName[value] + ')' : '');
  // }

  anyNamedDevice(): Array<BluetoothRequestDeviceFilter> {
    // This is the closest we can get for now to get all devices.
    // https://github.com/WebBluetoothCG/web-bluetooth/issues/234
    return Array.from('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
      .map(c => ({namePrefix: c}));
  }
}
