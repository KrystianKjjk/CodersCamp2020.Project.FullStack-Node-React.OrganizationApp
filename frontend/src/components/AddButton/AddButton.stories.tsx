import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import AddButton, { AddButtonProps } from './AddButton'
import { store } from '../../app/store'
import { Provider } from 'react-redux'

export default {
  title: 'AddButton component',
  component: AddButton,
} as Meta

const Template: Story<AddButtonProps> = (args) => (
  <Provider store={store}>
    <AddButton {...args} />
  </Provider>
)

export const SampleAddButton = Template.bind({})
SampleAddButton.args = {
  text: 'Add',
}
