import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import SelectSortBy, { SelectSortByProps } from './SelectSortBy'

export default {
  title: 'SelectSortBy component',
  component: SelectSortBy,
} as Meta

const Template: Story<SelectSortByProps> = (args) => <SelectSortBy {...args} />

export const SampleSelectSortBy = Template.bind({})
SampleSelectSortBy.args = {
  onChange: (value: string) => {
    console.log(value)
  },
  options: ['option 1', 'option 2', 'option 3'],
  initialValue: '',
}
