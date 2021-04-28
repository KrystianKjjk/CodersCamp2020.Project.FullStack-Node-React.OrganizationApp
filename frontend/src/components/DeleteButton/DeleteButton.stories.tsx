import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import DeleteButton, { DeleteButtonProps } from './DeleteButton'
import { store } from '../../app/store'
import { Provider } from 'react-redux'

export default {
  title: 'DeleteButton component',
  component: DeleteButton,
} as Meta

const Template: Story<DeleteButtonProps> = (args) => (
  <Provider store={store}>
    <DeleteButton {...args} />
  </Provider>
)

export const SampleDeleteButton = Template.bind({})
SampleDeleteButton.args = {
  confirmTitle: 'Example title',
  confirmContent: 'Example confirm text',
  onConfirm: () => console.log('Confirm clicked'),
  onClose: () => console.log('Close clicked'),
}
