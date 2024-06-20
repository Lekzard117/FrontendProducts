export type StatusSensor = 'activo' | 'desactivado';
export interface Sensor {
    name: string;
    ip: string;
    status: StatusSensor;
    latitude: double;
    longitude: double;
    type_sensor: {
        name: string;
    };
}