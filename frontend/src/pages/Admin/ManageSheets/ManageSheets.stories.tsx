import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import ManageSheets, { ManageSheetsProps } from './ManageSheets'
import { store } from '../../../app/store'
import { Provider } from 'react-redux'
import darkTheme from '../../../theme/customMaterialTheme'
import { ThemeProvider } from '@material-ui/styles'

export default {
  title: 'ManageSheets component',
  component: ManageSheets,
} as Meta

const Template: Story<ManageSheetsProps> = (args) => (
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <ManageSheets {...args} />
    </ThemeProvider>
  </Provider>
)

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRjNjQyZTUzNDdhZDE5ZDRmOWE0MzciLCJ0eXBlIjozLCJpYXQiOjE2MTY4NzIzNTcsImV4cCI6MTYxNjk1ODc1N30.RX1EzN6tHmdMFhDWtm6TmQPFzML6min3e_11RH3B6GA'
localStorage.setItem('token', token)
localStorage.setItem('courseId', '604bd56eef20be4368273700')

export const SampleManageSheets = Template.bind({})
SampleManageSheets.args = {}
