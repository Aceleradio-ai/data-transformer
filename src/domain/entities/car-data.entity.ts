export interface GpsElement {
  latitude: string;
  longitude: string;
  altitude: number;
  angle: number;
  satellites: number;
  speed: number;
}

export interface IoElement {
  id: number;
  property: string;
  value?: number;
  hex_value?: string;
}

export interface AvlData {
  timestamp: number;
  priority: number;
  gps_element: GpsElement;
  io_elements: IoElement[];
}

export interface CarDataPayload {
  imei: number;
  preamble: number;
  data_size: number;
  codec_id: number;
  number_data: number;
  avl_data_list: AvlData[];
  number_data_2: number;
  crc16: number;
}

export class CarDataEntity {
  imei: number;
  preamble: number;
  data_size: number;
  codec_id: number;
  number_data: number;
  avl_data_list: AvlData[];
  number_data_2: number;
  crc16: number;

  constructor(payload: CarDataPayload) {
    this.imei = payload.imei;
    this.preamble = payload.preamble;
    this.data_size = payload.data_size;
    this.codec_id = payload.codec_id;
    this.number_data = payload.number_data;
    this.avl_data_list = payload.avl_data_list.map((data) => ({
      timestamp: data.timestamp,
      priority: data.priority,
      gps_element: {
        latitude: data.gps_element.latitude,
        longitude: data.gps_element.longitude,
        altitude: data.gps_element.altitude,
        angle: data.gps_element.angle,
        satellites: data.gps_element.satellites,
        speed: data.gps_element.speed,
      },
      io_elements: data.io_elements.map((io) => ({
        id: io.id,
        property: io.property,
        value: io.value,
        hex_value: io.hex_value,
      })),
    }));
    this.number_data_2 = payload.number_data_2;
    this.crc16 = payload.crc16;
  }
}
