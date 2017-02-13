import {Component} from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'App works!';
  status:string;
  deviceName:string;
  services: BluetoothRemoteGATTService[];

  static serviceList:string[] = [
  "alert_notification",
  "automation_io",
  "battery_service",
  "blood_pressure",
  "body_composition",
  "bond_management",
  "continuous_glucose_monitoring",
  "current_time",
  "cycling_power",
  "cycling_speed_and_cadence",
  "device_information",
  "environmental_sensing",
  "generic_access",
  "generic_attribute",
  "glucose",
  "health_thermometer",
  "heart_rate",
  "human_interface_device",
  "immediate_alert",
  "indoor_positioning",
  "internet_protocol_support",
  "link_loss",
  "location_and_navigation",
  "next_dst_change",
  "phone_alert_status",
  "pulse_oximeter",
  "reference_time_update",
  "running_speed_and_cadence",
  "scan_parameters",
  "tx_power",
  "user_data",
  "weight_scale"];

  constructor() {
  }

  ngOnInit() {

  }

  onScan(): void {
    this.status = 'Requesting any Bluetooth Device...';
    console.log(this.status);

    navigator.bluetooth.requestDevice({
      // filters: [...] <- Prefer filters to save energy & show relevant devices.
      acceptAllDevices: true,
      optionalServices: AppComponent.serviceList
    })
      .then(device => {
        this.deviceName = device.name;
        console.log('Connecting to GATT Server...');
        return device.gatt.connect();
      })
      .then(server => {
        this.status = 'Connected';
        console.log('Getting GAP Service...');
        return server.getPrimaryServices();
      })
      // .then(services => {
      //   console.log('Getting GAP Characteristics...');
      //   return services.getCharacteristics();
      // })
      .then(services => {
        console.log('Getting Characteristics...');
        this.services = services;

        // let queue = Promise.resolve();
        // services.forEach(service => {
        //   queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
        //     console.log('> Service: ' + service.uuid);
        //     characteristics.forEach(characteristic => {
        //       console.log('>> Characteristic: ' + characteristic.uuid + ' ' +
        //         this.getSupportedProperties(characteristic));
        //     });
        //   }));
        // });
        return services;
      })
      // .then(characteristics => {
      //   let queue = Promise.resolve();
      //   this.characteristics = characteristics;
      //   characteristics.forEach(characteristic => {
      //     // switch (characteristic.uuid) {
      //     //
      //     //   case BluetoothUUID.getCharacteristic('gap.appearance'):
      //     //     queue = queue.then(_ => readAppearanceValue(characteristic));
      //     //     break;
      //     //
      //     //   case BluetoothUUID.getCharacteristic('gap.device_name'):
      //     //     queue = queue.then(_ => readDeviceNameValue(characteristic));
      //     //     break;
      //     //
      //     //   case BluetoothUUID.getCharacteristic('gap.peripheral_preferred_connection_parameters'):
      //     //     queue = queue.then(_ => readPPCPValue(characteristic));
      //     //     break;
      //     //
      //     //   case BluetoothUUID.getCharacteristic('gap.central_address_resolution_support'):
      //     //     queue = queue.then(_ => readCentralAddressResolutionSupportValue(characteristic));
      //     //     break;
      //     //
      //     //   case BluetoothUUID.getCharacteristic('gap.peripheral_privacy_flag'):
      //     //     queue = queue.then(_ => readPeripheralPrivacyFlagValue(characteristic));
      //     //     break;
      //     //
      //     //   default: console.log('> Unknown Characteristic: ' + characteristic.uuid);
      //     // }
      //   });
      //   return queue;
      // })
      .catch(error => {
        console.log('Argh! ' + error);
      });
  }

  /* Utils */

  getSupportedProperties(characteristic) {
    let supportedProperties = [];
    for (const p in characteristic.properties) {
      if (characteristic.properties[p] === true) {
        supportedProperties.push(p.toUpperCase());
      }
    }
    return '[' + supportedProperties.join(', ') + ']';
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



