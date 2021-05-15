import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import ManageSheet, { ManageSheetProps } from './ManageSheet'
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
  title: 'ManageSheet component',
  component: ManageSheet,
} as Meta
const sheetId = '604c65145347ad19d4f9a438'
const Template: Story<ManageSheetProps> = (args) => (
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Switch>
          <Route path="/grade/sheets/:sheetId">
            <ManageSheet />
          </Route>
          <Route path="/">
            <Redirect to={'/grade/sheets/' + sheetId} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  </Provider>
)

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRjNjQyZTUzNDdhZDE5ZDRmOWE0MzciLCJ0eXBlIjozLCJpYXQiOjE2MTY4NzIzNTcsImV4cCI6MTYxNjk1ODc1N30.RX1EzN6tHmdMFhDWtm6TmQPFzML6min3e_11RH3B6GA'
localStorage.setItem('token', token)

export const SampleManageSheet = Template.bind({})
SampleManageSheet.args = {}
