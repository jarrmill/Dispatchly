import React from 'react';

export default function OrgEntry(props) {
  let { orgName, selectedOrgName, handleChangedOrganization } = props;
  let style = {
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: (orgName === selectedOrgName) ? '#efe' : 'transparent'
  }
  return (
      <div style={style} onClick={() => handleChangedOrganization(orgName)}>
        { orgName }
      </div>
  );
}