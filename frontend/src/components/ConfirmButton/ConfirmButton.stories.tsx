import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import ConfirmButton, { ConfirmButtonProps } from './ConfirmButton'
import { store } from '../../app/store'
import { Provider } from 'react-redux'

export default {
  title: 'ConfirmationButton component',
  component: ConfirmButton,
} as Meta

const Template: Story<ConfirmButtonProps> = (args) => (
  <Provider store={store}>
    <ConfirmButton {...args} />
  </Provider>
)

export const SampleConfirmButton = Template.bind({})
SampleConfirmButton.args = {
  text: 'example ',
  confirmTitle: 'Example title',
  confirmContent: 'Example confirm text',
  onConfirm: () => console.log('Confirm clicked'),
  onClose: () => console.log('Close clicked'),
}
