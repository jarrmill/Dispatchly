import React, { Component } from 'react';
import OrgEntry from './orgEntry'

export default function OrgList(props) {
  const renderOrgs = function() {
    const orgsList = Object.keys(props.tasks).map((orgName) => {
      return (
        <OrgEntry orgName={orgName}
                  selectedOrgName={props.selectedOrganization}
                  handleChangedOrganization={props.handleChangedOrganization}/>
      )
    });
    return orgsList;
  }
  return (
      <div>
        {renderOrgs()}
      </div>
  );
}