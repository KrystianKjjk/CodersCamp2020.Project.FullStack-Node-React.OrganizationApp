import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import MyProfile, { MyProfileProps } from './MyProfile'
import { store } from '../../../app/store'
import { Provider } from 'react-redux'

export default {
  title: 'MyProfile component',
  component: MyProfile,
} as Meta

const Template: Story<MyProfileProps> = (args) => (
  <Provider store={store}>
    <MyProfile {...args} />
  </Provider>
)

export const SampleMyProfile = Template.bind({})
SampleMyProfile.args = {
  name: 'MyProfile',
}
