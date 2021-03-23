import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import LogIn , { LogInProps } from './LogIn';

export default {
  title: 'LogIn component',
  component: LogIn,
} as Meta;

const Template: Story<LogInProps> = (args) => <LogIn {...args} />;

export const FirstInput = Template.bind({});
FirstInput.args = {
  label: 'Write something: ',
};