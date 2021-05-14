import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import ManageTeam, { ManageTeamProps } from './ManageTeam'
import { store } from '../../../app/store'
import { Provider } from 'react-redux'
import darkTheme from '../../../theme/customMaterialTheme'
import { ThemeProvider } from '@material-ui/styles'
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom'

export default {
  title: 'ManageTeam component',
  component: ManageTeam,
} as Meta
const teamId = '6041184b4864b56a243b20bf'
const Template: Story<ManageTeamProps> = (args) => (
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Switch>
          <Route path="/teams/:teamId">
            <ManageTeam />
          </Route>
          <Route path="/">
            <Redirect to={'/teams/' + teamId} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  </Provider>
)

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRjNjQyZTUzNDdhZDE5ZDRmOWE0MzciLCJ0eXBlIjozLCJpYXQiOjE2MTY4NzIzNTcsImV4cCI6MTYxNjk1ODc1N30.RX1EzN6tHmdMFhDWtm6TmQPFzML6min3e_11RH3B6GA'
localStorage.setItem('token', token)

export const SampleManageTeam = Template.bind({})
SampleManageTeam.args = {}
