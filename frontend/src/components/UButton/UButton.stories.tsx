import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import UButton, { UButtonProps } from './UButton'

export default {
  title: 'UButton component',
  component: UButton,
} as Meta

const Template: Story<UButtonProps> = (args) => <UButton {...args} />

export const SampleUButton = Template.bind({})
SampleUButton.args = {
  text: 'ADD',
  color: 'primary',
  onClick: () => {
    console.log('Clicked')
  },
}
