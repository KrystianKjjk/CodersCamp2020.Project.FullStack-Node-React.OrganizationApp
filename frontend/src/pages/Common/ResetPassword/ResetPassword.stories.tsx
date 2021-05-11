import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import ResetPasswordRequest from './ResetPasswordRequest'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import { StyledTextFieldProps } from '../../../components/StyledTextField/StyledTextField'

export default {
  title: 'ResetPassword component',
  component: ResetPasswordRequest,
} as Meta

const Template: Story<StyledTextFieldProps> = (args) => (
  <Provider store={store}>
    <ResetPasswordRequest {...args} />
  </Provider>
)

export const FirstInput = Template.bind({})
FirstInput.args = {
  label: 'Write something: ',
}
