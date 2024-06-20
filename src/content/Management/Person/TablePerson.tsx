import { useEffect, useState } from 'react';

import { Card } from '@mui/material';
import ContentTablePerson from './ContentTablePerson';
import { Person } from '@/models/person';
import api from '@/utils/api/apiPerson';

function TablePerson() {
  const [person, setPerson] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPersons = async () => {
      const persons = await api.listPerson();
      setPerson(persons);
      console.log(persons);
    };

    fetchPersons();
  }, []);
  return (
    <Card>
      <ContentTablePerson person={person} />
    </Card>
  );
}

export default TablePerson;
