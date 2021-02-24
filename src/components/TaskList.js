import { List } from 'antd';
import React from 'react';
import Task from "./Task";

export default (props) => (
  <List
  bordered
    dataSource={props.tasks.idx.filter(it => !props.tasks.dat[it].deleted)}
    renderItem={idx => (
      <List.Item>
          <Task key={idx} 
            dat={props.tasks.dat[idx].desc} 
            onEdit={props.editTask(idx)} 
            onDelete={props.deleteTask(idx)}  
            checked={props.tasks.dat[idx].done}
            onCheck={props.toggleTask(idx, true)}
            onUnCheck={props.toggleTask(idx, false)}
            onInputDone={props.sync}/>
      </List.Item>
    )}
  />)