import React from 'react';
import CreateTask from './createTask';

export default function NavBar(props) {

  return (
    <div>
      Hello from main!
      <CreateTask handleSubmit={props.handleNewTask}/>
    </div>
  );
}