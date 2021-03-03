/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React, { Component } from 'react';
import App from './App';
import {name as appName} from './app.json';
import Task from './model/Task'
import Subtask from './model/Subtask';
import { mySchema } from './model/schema';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { Database } from '@nozbe/watermelondb';


const adapter = new SQLiteAdapter({
  dbName: 'WatermelonDemo',
  schema: mySchema,
})

const database = new Database({
  adapter,
  modelClasses: [Task, Subtask],
  actionsEnabled: true,
})


// async() => {
//   const taskCount = await tasksCollection.fetchCount()
//   console.log(taskCount)
// }

// await database.action(async () => {
//   const newTask = await tasksCollection.create(task => {
//     task.description = 'New task'
//     task.isComplete = false
//   })
// })

console.log("Hello")

const AppWrapper = (props) => {
  return <App {...{
    ...props,
    database: database,
  }}/>;
};

AppRegistry.registerComponent(appName, () => AppWrapper);