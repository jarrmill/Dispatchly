import React from 'react';
import CreateTask from './createTask';
import OrgList from './orgList';
import TaskList from './taskList';

export default function NavBar(props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor:'#ccc'}}>
      <div style={{width: '25vw', padding: '10px'}}>
        <OrgList tasks={props.tasks}
                 selectedOrganization={props.selectedOrganization}
                 handleChangedOrganization={props.handleChangedOrganization} />
      </div>
      <div style={{width: '75vw', padding: '10px', backgroundColor: '#eee'}}>
        <CreateTask handleSubmit={props.handleNewTask}/>
        <TaskList
          selectedOrganization={props.selectedOrganization}
          tasks={props.tasks}
          handleCompleteTask={props.handleCompleteTask}/>
      </div>
    </div>
  );
}