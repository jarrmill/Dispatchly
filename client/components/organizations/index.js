import React from 'react';
import CreateOrganization from './CreateOrganization';
import JoinOrganization from './JoinOrganization';

export default function NavBar(props) {

  return (
    <div>
      <JoinOrganization handleSubmit={props.handleSubmit}/>
    </div>
  );
}