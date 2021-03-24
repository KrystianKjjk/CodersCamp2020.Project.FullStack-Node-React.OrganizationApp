import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ResetPassword , { ResetPasswordProps } from './ResetPassword';

export default {
  title: 'ResetPassword component',
  component: ResetPassword,
} as Meta;

const Template: Story<ResetPasswordProps> = (args) => <ResetPassword {...args} />;

export const FirstInput = Template.bind({});
FirstInput.args = {
  label: 'Write something: ',
};