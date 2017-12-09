import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Campuses from './Campuses'
import Students from './Students'
import SingleCampus from './SingleCampus'
import SingleStudent from './SingleStudent'
 
export default class Home extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <main>
          <Switch>
            <Route exact path='/campuses' component={Campuses} />
            <Route path='/campuses/:campusId' component={SingleCampus} />
            <Route exact path='/students' component={Students} />
            <Route path='/students/:studentId' component={SingleStudent} />
            <Route component={Campuses} />
          </Switch>
        </main>
      </div>
    )
  }
}