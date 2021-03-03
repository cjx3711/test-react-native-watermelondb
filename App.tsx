import React, { Component, Fragment } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, ListItem, CheckBox, Col, Grid } from 'native-base';
import { Q } from '@nozbe/watermelondb';
import { Alert } from 'react-native';
export default class AnatomyExample extends Component {
  constructor(props) {
    super(props)
    console.log("App Constructor")
    // console.log(props)
    const database = props.database;
    const tasksCollection = database.get('tasks')

    // const updatePage = async() => {
    //   // const tasksCollection = this.props.database.get('tasks')
    //   console.log("Fetching task count")
    //   const taskCount = await tasksCollection.query().fetchCount()
    //   const tasks = await tasksCollection.query()
    //   console.log("Tasks count", taskCount)
    //   this.setState({taskCount: taskCount, tasks: tasks})
    // }
    this.updatePage()

    // await database.action(async () => {
    //   const newTask = await tasksCollection.create(task => {
    //     task.description = 'New task'
    //     task.isComplete = false
    //   })
    //   console.log("Adding new task")
    // })
    // console.log("Added new task")
    // add()

    this.state = {
      taskCount: 0,
      tasks: []
    }
  }

  async add() {
    const tasksCollection = this.props.database.get('tasks')
    await this.props.database.action(async () => {
      const newTask = await tasksCollection.create(task => {
        task.description = 'New task'
        task.isComplete = false
      })
      console.log("Adding new task")
    })
    console.log("Added new task")
    this.updatePage()
  }
  async updatePage() {
    const tasksCollection = this.props.database.get('tasks')
    console.log("Fetching task count")
    const taskCount = await tasksCollection.query().fetchCount()
    const tasks = await tasksCollection.query()
    console.log("Tasks count", taskCount)
    this.setState({taskCount: taskCount, tasks: tasks})
  }

  async setChecked(task) {
    console.log("Setting checked", task.id)
    // await task.check()
    await this.props.database.action(async () => {
      await task.markAsDeleted()
    })
    this.updatePage()
  }

  async rename(task) {
    console.log("Renaming", task.id)
    await task.rename()
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Text>
            There are { this.state.taskCount } tasks
          </Text>
          <Fragment>
          {
            this.state.tasks.map((m, i) => {
              return (
                <ListItem key={m.id}>
                  <CheckBox checked={m.isComplete} onPress={() => this.setChecked(m) }/>
                  <Body>
                    <Grid>
                      <Col style={{width: '60%'}}>
                        <Text>{m.description}</Text>
                      </Col>
                      <Col>
                        <Button block rounded onPress={() => this.rename(m)}>
                          <Text>Subtasks</Text>
                        </Button>
                      </Col>
                    </Grid>
                  </Body>
                </ListItem>
              )
            })
          }
          </Fragment>
          
        </Content>
        <Footer>
          <FooterTab>
            <Button full onPress={() => this.add()}>
              <Text>Add Task</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}