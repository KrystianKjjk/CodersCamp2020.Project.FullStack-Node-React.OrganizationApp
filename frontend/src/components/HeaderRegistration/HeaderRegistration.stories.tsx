import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import HeaderRegistration from './HeaderRegistration'

export default {
  title: 'HeaderRegistration component',
  component: HeaderRegistration,
} as Meta

const Template: Story = (args) => <HeaderRegistration {...args} />

export const BasicHeaderRegistration = Template.bind({})
