import {  Message }  from 'semantic-ui-react';
import React from 'react';

const AQMessage = (props) => {
    return (
        <div>
            <Message info>
    <Message.Header>Comparision</Message.Header>
    <p>{props.message}</p>
  </Message>
        </div>
    );
}

export default AQMessage;
