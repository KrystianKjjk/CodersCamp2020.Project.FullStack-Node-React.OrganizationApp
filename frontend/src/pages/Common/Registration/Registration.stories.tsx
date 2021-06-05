import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Registration } from './Registration'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import { StyledTextFieldProps } from '../../../components/StyledTextField/StyledTextField'

export default {
  title: 'Registration component',
  component: Registration,
} as Meta

const Template: Story<StyledTextFieldProps> = (args) => (
  <Provider store={store}>
    <Registration {...args} />
  </Provider>
)

export const FirstInput = Template.bind({})
FirstInput.args = {
  label: 'Write something: ',
}
