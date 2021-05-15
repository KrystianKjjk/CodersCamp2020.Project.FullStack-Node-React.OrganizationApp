import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import PageHeader, { PageHeaderProps } from './PageHeader'

export default {
  title: 'PageHeader component',
  component: PageHeader,
} as Meta

const Template: Story<PageHeaderProps> = (args) => <PageHeader {...args} />

export const Header = Template.bind({})
Header.args = { name: 'Example header !' }
