import React, { Component } from 'react';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Storage, Logger } from 'aws-amplify';
import aws_exports from './aws-exports';
import shortid from 'shortid'
import Task from './components/Task'
Amplify.configure(aws_exports);

class App extends Component {
  constructor() {
    super()
    this.state = {tasks: {
      idx: [],
      dat: {}
    }}
    this.addTask = this.addTask.bind(this)
    this.editTask = this.editTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.toggleTask = this.toggleTask.bind(this)
    this.save = this.save.bind(this)
    this.query = this.query.bind(this)
    this.sync = this.sync.bind(this)
    this.synced = false
    this.logger = new Logger('App', 'INFO')
  }
  render() {
    return (
      <div>
        <p>My Awesome Todo List</p>
        {
          this.state.tasks.idx
          .filter(it => !this.state.tasks.dat[it].deleted)
          .map( it => (
            <Task key={it} 
            dat={this.state.tasks.dat[it].desc} 
            onEdit={this.editTask(it)} 
            onDelete={this.deleteTask(it)}  
            checked={this.state.tasks.dat[it].done}
            onCheck={this.toggleTask(it, true)}
            onUnCheck={this.toggleTask(it, false)}
            onInputDone={this.sync}
            />
          )
        )}
        <button onClick={this.save}> save </button>
        <button onClick={this.addTask}> add </button>
      </div>
    );
  }

  async save() {
    this.logger.info('start to save')
    await Storage.put("data.json", JSON.stringify(this.state.tasks))
    this.logger.info('saved')
    this.synced = true
  }

  async query() {
    this.logger.info('query')
    const result = await Storage.get('data.json', {download: true})
    const tasks = JSON.parse(result.Body.toString())
    this.logger.info(tasks)
    this.setState({tasks})
    this.synced = true
  }

  async componentDidMount() {
    Storage.configure({ level: 'private' });
    await this.query()
  }

  addTask() {
    const id = shortid.generate()
    const idx = this.state.tasks.idx
    idx.push(id)
    const dat = this.state.tasks.dat
    dat[id] = {
      decs: '',
      deleted: false,
      done: false
    }
    this.setState({tasks: {idx, dat}})
    this.synced = false
  }
  
  editTask(id) {
    return (value) => {
      const dat = this.state.tasks.dat
      dat[id].desc = value
      this.setState({tasks: {idx: this.state.tasks.idx, dat}})
      this.synced = false
    }
  }

  deleteTask(id) {
    return () => {
      const dat = this.state.tasks.dat
      dat[id].deleted = true
      this.setState({tasks: {idx: this.state.tasks.idx, dat}})
      this.synced = false
    }
  }

  toggleTask(id, flag) {
    return () => {
      this.logger.log(`toggle ${id} ${flag}`)
      const dat = this.state.tasks.dat
      dat[id].done = flag
      this.setState({tasks: {idx: this.state.tasks.idx, dat}})
      this.synced = false
      this.sync()
    }
  }
  async sync() {
    this.logger.info('try to sync')
    if (!this.synced) {
      await this.save()
    }
  }
}

export default withAuthenticator(App, true);
