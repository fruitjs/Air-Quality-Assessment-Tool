import React, { useState, useEffect } from 'react';
import { Button, Container, Input, Segment, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import AQMessage from './components/AQMessage';
import { ComparisionTable } from './components/ComparisionTable';
import AQService from './services/AQService';



function App() {

  const apiResponse = [];

  const [city1, setCity1] = useState('');
  const [city2, setCity2] = useState('');
  const [message, setMessage] = useState('');
  const [groupDom, setGroupDom] = useState([]);
  const [displayDetails, setDisplayDetails] = useState(false);

  const RenderResults = () => {

    apiResponse.map((value) => {
      let arr = [];
      let count = [];
      value.map((val) => {

        console.log('value')
        console.log(val)
        arr.push(<Table.Row key={val.city}>
          <Table.Cell>{val.country}</Table.Cell>
          <Table.Cell>{val.city}</Table.Cell>
          <Table.Cell>{val.parameters[0].count}</Table.Cell>
          <Table.Cell>{val.parameters[0].unit}</Table.Cell>
        </Table.Row>)
        count.push({ city: val.city, count: val.parameters[0].count })

      })

      if (count.length > 0) {
        if (count[0].count > count[1].count) {
          setMessage(count[0].city + ' has higher pollution than ' + count[1].city)
        } else if (count[0].count < count[1].count) {
          setMessage(count[1].city + ' has higher pollution than ' + count[0].city)
        } else {
          setMessage('Both cities are identical in pollution');
        }
      }

      setGroupDom([]);
      setGroupDom(arr);
    }
    )
  };
  const getAQIData = () => {
    if (city1 === '' || city2 === '') {

      setMessage('City names can not be empty')
      return
    }
    if (city1 === city2) {
      setMessage('Both cities can not be same')
      return
    }

    const fetchAPI = async () => {
      const result = await AQService(city1, city2);
      apiResponse.push(result.results);
      if (apiResponse[0].length === 2) {
        setDisplayDetails(true)
        RenderResults();

      } else {
        setGroupDom([]);
        setMessage('Invalid City Name(s).')
      }
    };

    fetchAPI();


  }


  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }
  //  else if (!isLoaded) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Container>
      <Segment inverted color='blue' textAlign='center' >
        <h1>Air Quality Assessment Tool</h1>
      </Segment>
      <Input placeholder='First City' onChange={(e) => setCity1(e.target.value)} />
      <Input placeholder='Second City' onChange={(e) => setCity2(e.target.value)} />
      <Button primary onClick={getAQIData}>Compare</Button>
      {displayDetails && <ComparisionTable groupDom={groupDom} />}
      {displayDetails && <AQMessage message={message} />}
    </Container>

  );

}

export default App;
