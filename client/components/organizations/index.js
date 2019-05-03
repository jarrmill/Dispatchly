import React from 'react';
import CreateOrganization from './CreateOrganization';
import JoinOrganization from './JoinOrganization';
import EditOrganizations from './EditOrganizations';

export default function NavBar(props) {

  return (
    <div>
      <JoinOrganization handleSubmit={props.handleSubmit}/>
      <EditOrganizations tasks={props.tasks}
                         auth={props.auth}
                         adminAddUser={props.adminAddUser}
                         handleUserOrgDelete={props.handleUserOrgDelete}/>
    </div>
  );
}