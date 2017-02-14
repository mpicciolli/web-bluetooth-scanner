import {Component} from '@angular/core'
import {Services} from "./common/Services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'App works!';
  status: string;
  deviceName: string;
  isConnected: boolean;
  autoReconnection: boolean;
  bluetoothIsEnabled: boolean;
  services: BluetoothRemoteGATTService[];
  errorMessage: string;
  bluetoothDevice: BluetoothDevice;

  constructor() {
    this.autoReconnection = true;
    this.isConnected = false;
    this.bluetoothIsEnabled = this.isWebBluetoothEnabled();
  }

  onScan(): void {
    this.status = 'Requesting any Bluetooth Device...';
    this.autoReconnection = true;
    console.log(this.status);

    navigator.bluetooth.requestDevice({
      // filters: [...] <- Prefer filters to save energy & show relevant devices.
      acceptAllDevices: true,
      optionalServices: Services
    })
      .then(device => {
        this.bluetoothDevice = device;
        this.deviceName = device.name;
        this.status = 'Connected';
        this.isConnected = true;
        console.log('Connecting to GATT Server...');
        device.addEventListener('gattserverdisconnected', this.onDisconnected);
        return device.gatt.connect();
      })
      .then(server => {

        console.log('Getting GAP Service...');
        return server.getPrimaryServices();
      })
      .then(services => {
        console.log('Getting Characteristics...');
        this.services = services;
        return services;
      })
      .catch(error => {
        this.isConnected = false;
        this.errorMessage = error;
        console.log('Argh! ' + error);
      });
  }

  disconnect() {
    if (!this.bluetoothDevice) {
      return;
    }
    console.log('Disconnecting from Bluetooth Device...');
    this.autoReconnection = false;
    if (this.bluetoothDevice.gatt.connected) {
      this.bluetoothDevice.gatt.disconnect();
    } else {
      console.log('> Bluetooth Device is already disconnected');
    }
  }

  private onDisconnected() {
    console.log('> Bluetooth Device disconnected');
    this.isConnected = false;
    if (this.autoReconnection)
      this.connect();
  }

  private connect() {
    this.exponentialBackoff(3 /* max retries */, 2 /* seconds delay */,
      function toTry() {
        this.time('Connecting to Bluetooth Device... ');
        return this.bluetoothDevice.gatt.connect();
      },
      function success() {
        console.log('> Bluetooth Device connected. Try disconnect it now.');
        this.isConnected = true;
      },
      function fail() {
        this.time('Failed to reconnect.');
      });
  }

  private exponentialBackoff(max, delay, toTry, success, fail) {
    toTry().then(result => success(result))
      .catch(_ => {
        if (max === 0) {
          return fail();
        }
        this.time('Retrying in ' + delay + 's... (' + max + ' tries left)');
        setTimeout(function () {
          this.exponentialBackoff(--max, delay * 2, toTry, success, fail);
        }, delay * 1000);
      });
  }

  private time(text) {
    console.log('[' + new Date().toJSON().substr(11, 8) + '] ' + text);
  }

  private isWebBluetoothEnabled() {
    if (navigator.bluetooth) {
      return true;
    } else {
      this.errorMessage = 'Web Bluetooth API is not available.\n' +
        'Please make sure the "Experimental Web Platform features" flag is enabled.';
      return false;
    }
  }
}



