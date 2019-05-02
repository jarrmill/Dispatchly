import React from 'react';
import CreateTask from './createTask';
import OrgList from './orgList';
import TaskList from './taskList';
import Login from './login';

export default function Main(props) {
  let { auth, history } = props;
  console.log('User: ', auth);
  return ( auth !== null) ? (
    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor:'#ccc', height: 'auto', overflow: 'inherit'}}>
      <div style={{width: '25vw'}}>
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
  )
  :
  (
    <Login history={history}/>
  ) 

}