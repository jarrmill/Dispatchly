import React from 'react';
import CreateOrganization from './CreateOrganization';
import JoinOrganization from './JoinOrganization';

export default function NavBar(props) {

  return (
    <div>
      <CreateOrganization handleSubmit={props.handleSubmit}/>
      <JoinOrganization handleSubmit={props.handleSubmit}/>
    </div>
  );
}