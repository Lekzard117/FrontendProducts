import { useEffect, useState } from 'react';

import { Card } from '@mui/material';
import ContentTableSensor from './ContentTableSensor';
import { Sensor } from '@/models/sensor';
import api from '@/utils/api/api';

function TableSensor() {
  const [sensor, setSensor] = useState<Sensor[]>([]);

  useEffect(() => {
    const fetchSensors = async () => {
      const sensors = await api.listSensor();
      setSensor(sensors);
      console.log(sensors);
    };

    fetchSensors();
  }, []);
  return (
    <Card>
      <ContentTableSensor sensor={sensor} />
    </Card>
  );
}

export default TableSensor;
