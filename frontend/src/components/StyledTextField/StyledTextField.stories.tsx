import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import StyledTextField , { StyledTextFieldProps } from './StyledTextField';

export default {
  title: 'StyledTextField component',
  component: StyledTextField,
} as Meta;

const Template: Story<StyledTextFieldProps> = (args) => <StyledTextField {...args} />;

export const FirstInput = Template.bind({});
FirstInput.args = {
  label: 'Write something: ',
};