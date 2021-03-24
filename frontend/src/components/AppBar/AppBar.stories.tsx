import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import AppBar , { AppBarProps } from './AppBar';

export default {
  title: 'AppBar component',
  component: AppBar,
} as Meta;

const Template: Story<AppBarProps> = (args) => <AppBar {...args} />;

export const FirstInput = Template.bind({});
FirstInput.args = {
  label: 'Write something: ',
};