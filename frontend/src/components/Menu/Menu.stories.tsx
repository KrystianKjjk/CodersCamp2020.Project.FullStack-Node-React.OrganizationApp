import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Menu , { MenuProps } from './Menu';

export default {
  title: 'Menu component',
  component: Menu,
} as Meta;

const Template: Story<MenuProps> = (args) => <Menu {...args} />;

export const FirstInput = Template.bind({});
FirstInput.args = {
  label: 'Write something: ',
};