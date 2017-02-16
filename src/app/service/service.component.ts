import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  @Input() service: BluetoothRemoteGATTService;
  serviceName: string;
  characteristics: BluetoothRemoteGATTCharacteristic[];
  expanded:boolean;

  constructor() {
  }

  ngOnInit() {
    console.log('> Service: ' + this.service.uuid);
    this.expanded = false;
    this.serviceName = this.getName(this.service.uuid);
    this.service.getCharacteristics().then(characteristics => {
      this.characteristics = characteristics;
    });
  }

  expandedEvent(): void {
    this.expanded = true;
  }

  collapsedEvent(): void {
    this.expanded = false;
  }

  private getName(uuid: string): string {

    switch (uuid) {
      case BluetoothUUID.getService('alert_notification'):
        return "Alert Notification Service";
      case BluetoothUUID.getService('automation_io'):
        return "Automation IO";
      case BluetoothUUID.getService('battery_service'):
        return "Battery Service";
      case BluetoothUUID.getService('blood_pressure'):
        return "Blood Pressure";
      case BluetoothUUID.getService('body_composition'):
        return "Body Composition";
      case BluetoothUUID.getService('bond_management'):
        return "Bond Management";
      case BluetoothUUID.getService('continuous_glucose_monitoring'):
        return "Continuous Glucose Monitoring";
      case BluetoothUUID.getService('current_time'):
        return "Current Time Service";
      case BluetoothUUID.getService('cycling_power'):
        return "Cycling Power";
      case BluetoothUUID.getService('cycling_speed_and_cadence'):
        return "Cycling Speed and Cadence";
      case BluetoothUUID.getService('device_information'):
        return "Device Information";
      case BluetoothUUID.getService('environmental_sensing'):
        return "Environmental Sensing";
      case BluetoothUUID.getService('generic_access'):
        return "Generic Access	";
      case BluetoothUUID.getService('generic_attribute'):
        return "Generic Attribute";
      case BluetoothUUID.getService('glucose'):
        return "Glucose";
      case BluetoothUUID.getService('health_thermometer'):
        return "Health Thermometer";
      case BluetoothUUID.getService('heart_rate'):
        return "Heart Rate";
      case BluetoothUUID.getService('http_proxy'):
        return "HTTP Proxy";
      case BluetoothUUID.getService('human_interface_device'):
        return "Human Interface Device	";
      case BluetoothUUID.getService('immediate_alert'):
        return "Immediate Alert";
      case BluetoothUUID.getService('indoor_positioning'):
        return "Indoor Positioning";
      case BluetoothUUID.getService('internet_protocol_support'):
        return "Internet Protocol Support";
      case BluetoothUUID.getService('link_loss'):
        return "Link Loss";
      case BluetoothUUID.getService('location_and_navigation'):
        return "Location and Navigation";
      case BluetoothUUID.getService('service.next_dst_change'):
        return "Next DST Change Service";
      case BluetoothUUID.getService('object_transfer'):
        return "Object Transfer";
      case BluetoothUUID.getService('phone_alert_status'):
        return "Phone Alert Status Service";
      case BluetoothUUID.getService('pulse_oximeter'):
        return "Pulse Oximeter";
      case BluetoothUUID.getService('reference_time_update'):
        return "Reference Time Update Service";
      case BluetoothUUID.getService('running_speed_and_cadence'):
        return "Running Speed and Cadence";
      case BluetoothUUID.getService('scan_parameters'):
        return "Scan Parameters";
      case BluetoothUUID.getService('transport_discovery'):
        return "Transport Discovery";
      case BluetoothUUID.getService('tx_power'):
        return "Tx Power";
      case BluetoothUUID.getService('user_data'):
        return "User Data";
      case BluetoothUUID.getService('weight_scale'):
        return "Weight Scale";
      default :
        return "Unknow service";
    }
  }
}
