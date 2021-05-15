import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import ConfirmationDialog, {
  ConfirmationDialogProps,
} from './ConfirmationDialog'
import { store } from '../../app/store'
import { Provider } from 'react-redux'

export default {
  title: 'ConfirmationDialog component',
  component: ConfirmationDialog,
} as Meta

const Template: Story<ConfirmationDialogProps> = (args) => (
  <Provider store={store}>
    <ConfirmationDialog {...args} />
  </Provider>
)

export const SampleConfirmationDialog = Template.bind({})
SampleConfirmationDialog.args = {
  title: 'Example title',
  content: 'Some example content',
  isOpen: true,
  onClose: () => {},
  handleConfirm: () => {},
  handleCancel: () => {},
}
