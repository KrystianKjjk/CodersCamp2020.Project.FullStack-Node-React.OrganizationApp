import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Snackbar, { SnackbarProps } from './Snackbar'
import { store } from '../../app/store'
import { Provider } from 'react-redux'

export default {
  title: 'Snackbar component',
  component: Snackbar,
} as Meta

const Template: Story<SnackbarProps> = () => (
  <Provider store={store}>
    <Snackbar />
  </Provider>
)

export const SampleSnackbar = Template.bind({})
SampleSnackbar.args = {}
