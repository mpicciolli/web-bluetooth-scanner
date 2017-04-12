import {Injectable} from '@angular/core';
import {SensorLocation} from "../app/common/SensorLocation";
import {DeviceType} from "../app/common/DeviceType";
import {Vendors} from "../app/common/Vendors";

@Injectable()
export class CharacteristicService {

  constructor() {
  }

  getName(uuid: string): string {
    switch (uuid) {
      case BluetoothUUID.getCharacteristic('aerobic_heart_rate_lower_limit'):
        return 'Aerobic Heart Rate Lower Limit';
      case BluetoothUUID.getCharacteristic('aerobic_heart_rate_upper_limit'):
        return 'Aerobic Heart Rate Upper Limit';
      case BluetoothUUID.getCharacteristic('aerobic_threshold'):
        return 'Aerobic Threshold';
      case BluetoothUUID.getCharacteristic('age'):
        return 'Age';
      case BluetoothUUID.getCharacteristic('aggregate'):
        return 'Aggregate';
      case BluetoothUUID.getCharacteristic('alert_category_id'):
        return 'Alert Category ID';
      case BluetoothUUID.getCharacteristic('alert_category_id_bit_mask'):
        return 'Alert Category ID Bit Mask';
      case BluetoothUUID.getCharacteristic('alert_level'):
        return 'Alert Level';
      case BluetoothUUID.getCharacteristic('alert_notification_control_point'):
        return 'Alert Notification Control Point';
      case BluetoothUUID.getCharacteristic('alert_status'):
        return 'Alert Status';
      case BluetoothUUID.getCharacteristic('altitude'):
        return 'Altitude';
      case BluetoothUUID.getCharacteristic('anaerobic_heart_rate_lower_limit'):
        return 'Anaerobic Heart Rate Lower Limit';
      case BluetoothUUID.getCharacteristic('anaerobic_heart_rate_upper_limit'):
        return 'Anaerobic Heart Rate Upper Limit';
      case BluetoothUUID.getCharacteristic('anaerobic_threshold'):
        return 'Anaerobic Threshold';
      case BluetoothUUID.getCharacteristic('analog'):
        return 'Analog';
      case BluetoothUUID.getCharacteristic('apparent_wind_direction'):
        return 'Apparent Wind Direction';
      case BluetoothUUID.getCharacteristic('apparent_wind_speed'):
        return 'Apparent Wind Speed	';
      case BluetoothUUID.getCharacteristic('gap.appearance'):
        return 'Appearance';
      case BluetoothUUID.getCharacteristic('barometric_pressure_trend'):
        return 'Barometric Pressure Trend';
      case BluetoothUUID.getCharacteristic('battery_level'):
        return 'Battery Level';
      case BluetoothUUID.getCharacteristic('blood_pressure_feature'):
        return 'Blood Pressure Feature';
      case BluetoothUUID.getCharacteristic('blood_pressure_measurement'):
        return 'Blood Pressure Measurement';
      case BluetoothUUID.getCharacteristic('body_composition_feature'):
        return 'Body Composition Feature';
      case BluetoothUUID.getCharacteristic('body_composition_measurement'):
        return 'Body Composition Measurement';
      case BluetoothUUID.getCharacteristic('body_sensor_location'):
        return 'Body Sensor Location';
      case BluetoothUUID.getCharacteristic('bond_management_control_point'):
        return 'Bond Management Control Point';
      case BluetoothUUID.getCharacteristic('bond_management_feature'):
        return 'Bond Management Feature';
      case BluetoothUUID.getCharacteristic('boot_keyboard_input_report'):
        return 'Boot Keyboard Input Report';
      case BluetoothUUID.getCharacteristic('boot_keyboard_output_report'):
        return 'boot_keyboard_output_report';
      case BluetoothUUID.getCharacteristic('boot_mouse_input_report'):
        return 'Boot Mouse Input Report';
      case BluetoothUUID.getCharacteristic('gap.central_address_resolution_support'):
        return 'Central Address Resolution';
      case BluetoothUUID.getCharacteristic('cgm_feature'):
        return 'CGM Feature';
      case BluetoothUUID.getCharacteristic('cgm_measurement'):
        return 'CGM Measurement';
      case BluetoothUUID.getCharacteristic('cgm_session_run_time'):
        return 'CGM Session Run Time';
      case BluetoothUUID.getCharacteristic('cgm_session_start_time'):
        return 'CGM Session Start Time';
      case BluetoothUUID.getCharacteristic('cgm_specific_ops_control_point'):
        return 'CGM Specific Ops Control Point';
      case BluetoothUUID.getCharacteristic('cgm_status'):
        return 'CGM Status';
      // case BluetoothUUID.getCharacteristic('cross_trainer_data'): invalid name
      //   return 'Cross Trainer Data';
      case BluetoothUUID.getCharacteristic('csc_feature'):
        return 'CSC Feature';
      case BluetoothUUID.getCharacteristic('csc_measurement'):
        return 'CSC Measurement';
      case BluetoothUUID.getCharacteristic('current_time'):
        return 'Current Time';
      // case BluetoothUUID.getCharacteristic('cycling_power_control_point'):
      //   return 'Cycling Power Control Point';
      case BluetoothUUID.getCharacteristic('cycling_power_feature'):
        return 'Cycling Power Feature';
      case BluetoothUUID.getCharacteristic('cycling_power_measurement'):
        return 'Cycling Power Measurement';
      case BluetoothUUID.getCharacteristic('cycling_power_vector'):
        return 'Cycling Power Vector';
      case BluetoothUUID.getCharacteristic('database_change_increment'):
        return 'Database Change Increment';
      case BluetoothUUID.getCharacteristic('date_of_birth'):
        return 'Date of Birth';
      case BluetoothUUID.getCharacteristic('date_of_threshold_assessment'):
        return 'Date of Threshold Assessment';
      case BluetoothUUID.getCharacteristic('date_time'):
        return 'Date Time';
      case BluetoothUUID.getCharacteristic('day_date_time'):
        return 'Day Date Time';
      case BluetoothUUID.getCharacteristic('day_of_week'):
        return 'Day of Week';
      case BluetoothUUID.getCharacteristic('descriptor_value_changed'):
        return 'Descriptor Value Changed';
      case BluetoothUUID.getCharacteristic('gap.device_name'):
        return 'Device Name';
      case BluetoothUUID.getCharacteristic('dew_point'):
        return 'Dew Point';
      case BluetoothUUID.getCharacteristic('digital'):
        return 'Digital';
      case BluetoothUUID.getCharacteristic('dst_offset'):
        return 'DST Offset';
      case BluetoothUUID.getCharacteristic('elevation'):
        return 'Elevation';
      case BluetoothUUID.getCharacteristic('email_address'):
        return 'Email Address';
      case BluetoothUUID.getCharacteristic('exact_time_256'):
        return 'Exact Time 256';
      case BluetoothUUID.getCharacteristic('fat_burn_heart_rate_lower_limit'):
        return 'Fat Burn Heart Rate Lower Limit';
      case BluetoothUUID.getCharacteristic('fat_burn_heart_rate_upper_limit'):
        return 'Fat Burn Heart Rate Upper Limit';
      case BluetoothUUID.getCharacteristic('firmware_revision_string'):
        return 'Firmware Revision String';
      case BluetoothUUID.getCharacteristic('first_name'):
        return 'First Name';
      // case BluetoothUUID.getCharacteristic('fitness_machine_control_point'): invalid
      //   return 'Fitness Machine Control Point';
      // case BluetoothUUID.getCharacteristic('fitness_machine_feature'): invalid
      //   return 'Fitness Machine Feature';
      // case BluetoothUUID.getCharacteristic('fitness_machine_status'): invalid
      //   return 'Fitness Machine Status';
      case BluetoothUUID.getCharacteristic('five_zone_heart_rate_limits'):
        return 'Five Zone Heart Rate Limits';
      case BluetoothUUID.getCharacteristic('floor_number'):
        return 'Floor Number';
      case BluetoothUUID.getCharacteristic('gender'):
        return 'Gender';
      case BluetoothUUID.getCharacteristic('glucose_feature'):
        return 'Glucose Feature';
      case BluetoothUUID.getCharacteristic('glucose_measurement'):
        return 'Glucose Measurement';
      case BluetoothUUID.getCharacteristic('glucose_measurement_context'):
        return 'Glucose Measurement Context';
      case BluetoothUUID.getCharacteristic('gust_factor'):
        return 'Gust Factor';
      case BluetoothUUID.getCharacteristic('hardware_revision_string'):
        return 'Hardware Revision String';
      case BluetoothUUID.getCharacteristic('heart_rate_control_point'):
        return 'Heart Rate Control Point';
      case BluetoothUUID.getCharacteristic('heart_rate_max'):
        return 'Heart Rate Max';
      case BluetoothUUID.getCharacteristic('heart_rate_measurement'):
        return 'Heart Rate Measurement';
      case BluetoothUUID.getCharacteristic('heat_index'):
        return 'Heat Index';
      case BluetoothUUID.getCharacteristic('height'):
        return 'Height';
      case BluetoothUUID.getCharacteristic('hid_control_point'):
        return 'HID Control Point';
      case BluetoothUUID.getCharacteristic('hid_information'):
        return 'HID Information';
      case BluetoothUUID.getCharacteristic('hip_circumference'):
        return 'Hip Circumference';
      // case BluetoothUUID.getCharacteristic('http_control_point'): invalid
      //   return 'HTTP Control Point';
      // case BluetoothUUID.getCharacteristic('http_entity_body'):
      //   return 'HTTP Entity Body';
      // case BluetoothUUID.getCharacteristic('http_headers'):
      //   return 'HTTP Headers';
      // case BluetoothUUID.getCharacteristic('http_status_code'):
      //   return 'HTTP Status Code';
      // case BluetoothUUID.getCharacteristic('https_security'):
      //   return 'HTTPS Security';
      case BluetoothUUID.getCharacteristic('humidity'):
        return 'Humidity';
      case BluetoothUUID.getCharacteristic('ieee_11073-20601_regulatory_certification_data_list'):
        return 'IEEE 11073-20601 Regulatory Certification Data List';
      // case BluetoothUUID.getCharacteristic('indoor_bike_data'): invalid
      //   return 'Indoor Bike Data';
      case BluetoothUUID.getCharacteristic('indoor_positioning_configuration'):
        return 'Indoor Positioning Configuration';
      // case BluetoothUUID.getCharacteristic('intermediate_cuff_pressure'): invalid
      //   return 'Intermediate Cuff Pressure';


      case BluetoothUUID.getCharacteristic('intermediate_temperature'):
        return 'Intermediate Temperature';
      case BluetoothUUID.getCharacteristic('irradiance'):
        return 'Irradiance';
      case BluetoothUUID.getCharacteristic('language'):
        return 'Language';
      case BluetoothUUID.getCharacteristic('last_name'):
        return 'Last Name';
      case BluetoothUUID.getCharacteristic('latitude'):
        return 'Latitude';
      case BluetoothUUID.getCharacteristic('ln_control_point'):
        return 'LN Control Point';
      case BluetoothUUID.getCharacteristic('ln_feature'):
        return 'LN Feature';
      // case BluetoothUUID.getCharacteristic('local_east_coordinate'): invalid
      //   return 'Local East Coordinate';
      // case BluetoothUUID.getCharacteristic('local_north_coordinate'):
      //   return 'Local North Coordinate';
      // case BluetoothUUID.getCharacteristic('local_time_information'):
      //   return 'Local Time Information';
      case BluetoothUUID.getCharacteristic('location_and_speed'):
        return 'Location and Speed';
      case BluetoothUUID.getCharacteristic('location_name'):
        return 'Location Name';
      case BluetoothUUID.getCharacteristic('longitude'):
        return 'Longitude';
      case BluetoothUUID.getCharacteristic('magnetic_declination'):
        return 'Magnetic Declination';
      case BluetoothUUID.getCharacteristic('magnetic_flux_density_2D'):
        return 'Magnetic Flux Density - 2D';
      case BluetoothUUID.getCharacteristic('magnetic_flux_density_3D'):
        return 'Magnetic Flux Density - 3D';
      case BluetoothUUID.getCharacteristic('manufacturer_name_string'):
        return 'Manufacturer Name String';
      case BluetoothUUID.getCharacteristic('maximum_recommended_heart_rate'):
        return 'Maximum Recommended Heart Rate';
      case BluetoothUUID.getCharacteristic('measurement_interval'):
        return 'Measurement Interval';
      case BluetoothUUID.getCharacteristic('model_number_string'):
        return 'Model Number String';
      case BluetoothUUID.getCharacteristic('navigation'):
        return 'Navigation';
      case BluetoothUUID.getCharacteristic('new_alert'):
        return 'New Alert';
      // case BluetoothUUID.getCharacteristic('object_action_control_point'): invalid
      //   return 'Object Action Control Point';
      // case BluetoothUUID.getCharacteristic('object_changed'): invalid
      //   return 'Object Changed';
      // case BluetoothUUID.getCharacteristic('object_first_created'): invalid
      //   return 'Object First-Created	';
      // case BluetoothUUID.getCharacteristic('object_id'):
      //   return 'Object ID';
      // case BluetoothUUID.getCharacteristic('object_last_modified'):
      //   return 'Object Last-Modified';
      // case BluetoothUUID.getCharacteristic('object_list_control_point'):
      //   return 'Object List Control Point';
      // case BluetoothUUID.getCharacteristic('object_list_filter'):
      //   return 'Object List Filter';
      // case BluetoothUUID.getCharacteristic('object_name'):
      //   return 'Object Name';
      // case BluetoothUUID.getCharacteristic('object_properties'):
      //   return 'Object Properties';
      // case BluetoothUUID.getCharacteristic('object_size'):
      //   return 'Object Size';
      // case BluetoothUUID.getCharacteristic('object_type'):
      //   return 'Object Type';
      // case BluetoothUUID.getCharacteristic('ots_feature'): invalid
      //   return 'OTS Feature';
      case BluetoothUUID.getCharacteristic('gap.peripheral_preferred_connection_parameters'):
        return 'Peripheral Preferred Connection Parameters';
      case BluetoothUUID.getCharacteristic('gap.peripheral_privacy_flag'):
        return 'Peripheral Privacy Flag';
      case BluetoothUUID.getCharacteristic('plx_continuous_measurement'):
        return 'PLX Continuous Measurement';
      case BluetoothUUID.getCharacteristic('plx_features'):
        return 'PLX Features';
      case BluetoothUUID.getCharacteristic('plx_spot_check_measurement'):
        return 'PLX Spot-Check Measurement';
      case BluetoothUUID.getCharacteristic('pnp_id'):
        return 'PnP ID';
      case BluetoothUUID.getCharacteristic('pollen_concentration'):
        return 'pollen_concentration';
      case BluetoothUUID.getCharacteristic('position_quality'):
        return 'pollen_concentration';
      case BluetoothUUID.getCharacteristic('pressure'):
        return 'Pressure';
      case BluetoothUUID.getCharacteristic('protocol_mode'):
        return 'Protocol Mode';
      case BluetoothUUID.getCharacteristic('rainfall'):
        return 'Rainfall';
      case BluetoothUUID.getCharacteristic('gap.reconnection_address'):
        return 'Reconnection Address';
      case BluetoothUUID.getCharacteristic('record_access_control_point'):
        return 'Record Access Control Point';
      case BluetoothUUID.getCharacteristic('reference_time_information'):
        return 'Reference Time Information';
      case BluetoothUUID.getCharacteristic('report'):
        return 'Report';
      case BluetoothUUID.getCharacteristic('report_map'):
        return 'Report Map';
      //case BluetoothUUID.getCharacteristic('resolvable_private_address_only'): invalid
      //  return 'Resolvable Private Address Only';
      case BluetoothUUID.getCharacteristic('resting_heart_rate'):
        return 'Resting Heart Rate';
      case BluetoothUUID.getCharacteristic('ringer_control_point'):
        return 'Ringer Control Point';
      case BluetoothUUID.getCharacteristic('ringer_setting'):
        return 'Ringer Setting';
      //case BluetoothUUID.getCharacteristic('rower_data'): invalid
      //  return 'Rower Data';
      case BluetoothUUID.getCharacteristic('rsc_feature'):
        return 'RSC Feature';
      case BluetoothUUID.getCharacteristic('rsc_measurement'):
        return 'RSC Measurement';
      case BluetoothUUID.getCharacteristic('sc_control_point'):
        return 'SC Control Point';
      case BluetoothUUID.getCharacteristic('scan_interval_window'):
        return 'Scan Interval Window	';
      case BluetoothUUID.getCharacteristic('scan_refresh'):
        return 'Scan Refresh';
      case BluetoothUUID.getCharacteristic('sensor_location'):
        return 'Sensor Location';
      case BluetoothUUID.getCharacteristic('serial_number_string'):
        return 'Serial Number String	';
      case BluetoothUUID.getCharacteristic('gatt.service_changed'):
        return 'Service Changed';
      case BluetoothUUID.getCharacteristic('software_revision_string'):
        return 'Software Revision String';
      case BluetoothUUID.getCharacteristic('sport_type_for_aerobic_and_anaerobic_thresholds'):
        return 'Sport Type for Aerobic and Anaerobic Thresholds	';
      //case BluetoothUUID.getCharacteristic('stair_climber_data'): invalid
      //  return 'Stair Climber Data';
      //case BluetoothUUID.getCharacteristic('step_climber_data'): invalid
      //   return 'Step Climber Data';
      //case BluetoothUUID.getCharacteristic('supported_heart_rate_range'): invalid
      //  return 'Supported Heart Rate Range';
      //case BluetoothUUID.getCharacteristic('supported_inclination_range'): invalid
      //  return 'Supported Inclination Range';
      // case BluetoothUUID.getCharacteristic('supported_new_alert_category'):
      //   return 'Supported New Alert Category';
      // case BluetoothUUID.getCharacteristic('supported_power_range'):
      //   return 'Supported Power Range';
      // case BluetoothUUID.getCharacteristic('supported_resistance_level_range'):
      //   return 'Supported Resistance Level Range';
      // case BluetoothUUID.getCharacteristic('supported_speed_range'):
      //  return 'Supported Speed Range';
      // case BluetoothUUID.getCharacteristic('supported_unread_alert_category'):
      //   return 'Supported Unread Alert Category';
      case BluetoothUUID.getCharacteristic('system_id'):
        return 'System ID';
      //case BluetoothUUID.getCharacteristic('tds_control_point'): invalid
      //  return 'TDS Control Point';
      case BluetoothUUID.getCharacteristic('temperature'):
        return 'Temperature';
      case BluetoothUUID.getCharacteristic('temperature_measurement'):
        return 'Temperature Measurement';
      case BluetoothUUID.getCharacteristic('temperature_type'):
        return 'Temperature Type';
      case BluetoothUUID.getCharacteristic('three_zone_heart_rate_limits'):
        return 'Three Zone Heart Rate Limits';
      case BluetoothUUID.getCharacteristic('time_accuracy'):
        return 'Time Accuracy';
      case BluetoothUUID.getCharacteristic('time_source'):
        return 'Time Source';
      case BluetoothUUID.getCharacteristic('time_update_control_point'):
        return 'Time Update Control Point';
      case BluetoothUUID.getCharacteristic('time_update_state'):
        return 'Time Update State';
      case BluetoothUUID.getCharacteristic('time_with_dst'):
        return 'Time with DST';
      case BluetoothUUID.getCharacteristic('time_zone'):
        return 'Time Zone';
      //case BluetoothUUID.getCharacteristic('training_status'): invalid
      // return 'Training Status';
      //case BluetoothUUID.getCharacteristic('treadmill_data'): invalid
      // return 'Treadmill Data';
      case BluetoothUUID.getCharacteristic('true_wind_direction'):
        return 'True Wind Direction';
      case BluetoothUUID.getCharacteristic('true_wind_speed'):
        return 'True Wind Speed';
      case BluetoothUUID.getCharacteristic('two_zone_heart_rate_limit'):
        return 'Two Zone Heart Rate Limit';
      case BluetoothUUID.getCharacteristic('tx_power_level'):
        return 'Tx Power Level';
      case BluetoothUUID.getCharacteristic('uncertainty'):
        return 'Uncertainty';
      case BluetoothUUID.getCharacteristic('unread_alert_status'):
        return 'Unread Alert Status';
      //case BluetoothUUID.getCharacteristic('uri'): invalid
      // return 'URI';
      case BluetoothUUID.getCharacteristic('user_control_point'):
        return 'User Control Point';
      case BluetoothUUID.getCharacteristic('user_index'):
        return 'User Index';
      case BluetoothUUID.getCharacteristic('uv_index'):
        return 'UV Index';
      case BluetoothUUID.getCharacteristic('vo2_max'):
        return 'VO2 Max';
      case BluetoothUUID.getCharacteristic('waist_circumference'):
        return 'Waist Circumference';
      case BluetoothUUID.getCharacteristic('weight'):
        return 'Weight';
      case BluetoothUUID.getCharacteristic('weight_measurement'):
        return 'Weight Measurement';
      case BluetoothUUID.getCharacteristic('weight_scale_feature'):
        return 'Weight Scale Feature';
      case BluetoothUUID.getCharacteristic('wind_chill'):
        return 'Wind Chill';
      default:
        console.log('> Unknown Characteristic: ' + uuid);
        return 'Unknown Characteristic'
    }
  }

  read(characteristic: BluetoothRemoteGATTCharacteristic, value: DataView): string {
    let decoder = new TextDecoder('utf-8');
    switch (characteristic.uuid) {
      case BluetoothUUID.getCharacteristic('gap.appearance'):
        return this.getDeviceType(value.getUint16(0, true /* Little Endian */));
      case BluetoothUUID.getCharacteristic('gap.device_name'):
        return decoder.decode(value);
      case BluetoothUUID.getCharacteristic('gap.peripheral_preferred_connection_parameters'):
        console.log(this.readPPCPValue(characteristic));
        break;
      case BluetoothUUID.getCharacteristic('gap.central_address_resolution_support'):
        console.log(this.readCentralAddressResolutionSupportValue(characteristic));
        break;
      case BluetoothUUID.getCharacteristic('gap.peripheral_privacy_flag'):
        console.log(this.readPeripheralPrivacyFlagValue(characteristic));
        break;
      case BluetoothUUID.getCharacteristic('manufacturer_name_string'):
        return decoder.decode(value);
      case BluetoothUUID.getCharacteristic('model_number_string'):
        return decoder.decode(value);
      case BluetoothUUID.getCharacteristic('hardware_revision_string'):
        return decoder.decode(value);
      case BluetoothUUID.getCharacteristic('firmware_revision_string'):
        return decoder.decode(value);
      case BluetoothUUID.getCharacteristic('software_revision_string'):
        return decoder.decode(value);
      // case BluetoothUUID.getCharacteristic('system_id'):
      //   queue = queue.then(_ => this.characteristic.readValue()).then(value => {
      //     console.log('> System ID: ');
      //     console.log('  > Manufacturer Identifier: ' +
      //       this.padHex(value.getUint8(4)) + this.padHex(value.getUint8(3)) +
      //       this.padHex(value.getUint8(2)) + this.padHex(value.getUint8(1)) +
      //       this.padHex(value.getUint8(0)));
      //     console.log('  > Organizationally Unique Identifier: ' +
      //       this.padHex(value.getUint8(7)) + this.padHex(value.getUint8(6)) +
      //       this.padHex(value.getUint8(5)));
      //   });
      //   return 'System ID';
      // case BluetoothUUID.getCharacteristic('ieee_11073-20601_regulatory_certification_data_list'):
      //   queue = queue.then(_ => this.characteristic.readValue()).then(value => {
      //     console.log('> IEEE 11073-20601 Regulatory Certification Data List: ' +
      //       decoder.decode(value));
      //   });
      //   return 'IEEE 11073-20601 Regulatory Certification Data List';
      // case BluetoothUUID.getCharacteristic('pnp_id'):
      //   queue = queue.then(_ => this.characteristic.readValue()).then(value => {
      //     console.log('> PnP ID:');
      //     console.log('  > Vendor ID Source: ' +
      //       (value.getUint8(0) === 1 ? 'Bluetooth' : 'USB'));
      //     if (value.getUint8(0) === 1) {
      //       console.log('  > Vendor ID: ' +
      //         (value.getUint8(1) | value.getUint8(2) << 8));
      //     } else {
      //       console.log('  > Vendor ID: ' + this.getUsbVendorName(value.getUint8(1) | value.getUint8(2) << 8));
      //     }
      //     console.log('  > Product ID: ' +
      //       (value.getUint8(3) | value.getUint8(4) << 8));
      //     console.log('  > Product Version: ' +
      //       (value.getUint8(5) | value.getUint8(6) << 8));
      //   });
      //   return 'PnP ID';
      case BluetoothUUID.getCharacteristic('battery_level'):
        return value.getUint8(0).toString();
      case BluetoothUUID.getCharacteristic('body_sensor_location'):
        return this.getSensorLocation(value.getInt8(0));
      default:
        console.log('Value: ' + decoder.decode(value));
        return decoder.decode(value);
    }
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

  private getSensorLocation(value): string {
    return value in SensorLocation ? SensorLocation[value] : '';
  }

  private getDeviceType(value): string {
    // Check out page source to see what valueToDeviceType object is.
    return value in DeviceType ? DeviceType[value] : '';
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

