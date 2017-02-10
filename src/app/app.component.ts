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
    navigator.bluetooth.requestDevice({
      // filters: [...] <- Prefer filters to save energy & show relevant devices.
      acceptAllDevices: true,
      optionalServices: ['generic_access']})
      .then(device => {
        console.log('Connecting to GATT Server...');
        return device.gatt.connect();
      })
      .then(server => {
        console.log('Getting GAP Service...');
        return server.getPrimaryService('generic_access');
      })
      .then(service => {
        console.log('Getting GAP Characteristics...');
        return service.getCharacteristics();
      })
      .then(characteristics => {
        let queue = Promise.resolve();
        this.characteristics = characteristics;
        characteristics.forEach(characteristic => {
          // switch (characteristic.uuid) {
          //
          //   case BluetoothUUID.getCharacteristic('gap.appearance'):
          //     queue = queue.then(_ => readAppearanceValue(characteristic));
          //     break;
          //
          //   case BluetoothUUID.getCharacteristic('gap.device_name'):
          //     queue = queue.then(_ => readDeviceNameValue(characteristic));
          //     break;
          //
          //   case BluetoothUUID.getCharacteristic('gap.peripheral_preferred_connection_parameters'):
          //     queue = queue.then(_ => readPPCPValue(characteristic));
          //     break;
          //
          //   case BluetoothUUID.getCharacteristic('gap.central_address_resolution_support'):
          //     queue = queue.then(_ => readCentralAddressResolutionSupportValue(characteristic));
          //     break;
          //
          //   case BluetoothUUID.getCharacteristic('gap.peripheral_privacy_flag'):
          //     queue = queue.then(_ => readPeripheralPrivacyFlagValue(characteristic));
          //     break;
          //
          //   default: console.log('> Unknown Characteristic: ' + characteristic.uuid);
          // }
        });
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
