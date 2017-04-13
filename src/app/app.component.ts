import {Component} from '@angular/core'
import {Services} from "./common/Services";
import {TdLoadingService} from "@covalent/core";
import {DomSanitizer} from "@angular/platform-browser";
import {MdIconRegistry} from "@angular/material";

@Component({
  selector: 'qs-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Web Bluetooth scanner';
  status: string;
  isConnected: boolean;
  autoReconnection: boolean;
  bluetoothIsEnabled: boolean;
  services: BluetoothRemoteGATTService[];
  errorMessage: string;
  bluetoothDevice: BluetoothDevice;

  constructor(private _iconRegistry: MdIconRegistry,
              private _domSanitizer: DomSanitizer,
              private _loadingService: TdLoadingService) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent-mark.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-ux.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'listener',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));
    this.autoReconnection = true;
    this.isConnected = false;
    this.bluetoothIsEnabled = this.isWebBluetoothEnabled();
  }

  onScan(): void {
    this.status = 'Requesting any Bluetooth Device...';
    this.autoReconnection = true;
    console.log(this.status);

    //noinspection TypeScriptUnresolvedFunction
    navigator.bluetooth.requestDevice({
      // filters: [...] <- Prefer filters to save energy & show relevant devices.
      acceptAllDevices: true,
      optionalServices: Services
    }).then(device => {
        this._loadingService.register('services.list');
        this.bluetoothDevice = device;
        this.status = 'Connected';
        this.isConnected = true;
        console.log('Connecting to GATT Server...');
        device.addEventListener('gattserverdisconnected', this.onDisconnected); //USE RXJS
        return device.gatt.connect();
      })
      .then(server => {
        console.log('Getting GAP Service...');
        return server.getPrimaryServices();
      })
      .then(services => {
        this._loadingService.resolve('services.list');
        console.log('Getting Characteristics...');
        this.services = services;
        return services;
      })
      .catch(error => {
        this._loadingService.resolve('services.list');
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
        'Please make sure the "Experimental Web Platform features" flag is enabled.\n' +
        'Available in Chrome 55+. Mac and Android versions only. Not supported on Windows.';
      return false;
    }
  }
}



