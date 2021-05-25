import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import NameValuePair, { NameValuePairProps } from './NameValuePair'
import { store } from '../../app/store'
import { Provider } from 'react-redux'

export default {
  title: 'NameValuePair component',
  component: NameValuePair,
} as Meta

const Template: Story<NameValuePairProps> = (args) => (
  <Provider store={store}>
    <NameValuePair {...args}>
      <p>Some egzample value</p>
    </NameValuePair>
  </Provider>
)

export const SampleNameValuePair = Template.bind({})
SampleNameValuePair.args = {
  name: 'NameValuePair',
}
