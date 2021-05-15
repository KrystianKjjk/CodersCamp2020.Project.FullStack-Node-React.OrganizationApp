import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import EditableField, { EditableFieldProps } from './EditableField'
import { store } from '../../app/store'
import { Provider } from 'react-redux'

export default {
  title: 'EditableField component',
  component: EditableField,
} as Meta

const Template: Story<EditableFieldProps> = (args) => (
  <Provider store={store}>
    <EditableField {...args} />
  </Provider>
)

export const SampleEditableField = Template.bind({})
SampleEditableField.args = {
  isEdit: true,
  fieldName: 'test',
  fieldValue: 'test',
  placeholder: 'test',
  onChange: () => {},
}
