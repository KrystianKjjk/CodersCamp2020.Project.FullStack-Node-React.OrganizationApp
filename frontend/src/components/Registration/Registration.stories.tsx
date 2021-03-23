import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Registration , { RegistrationProps } from './Registration';

export default {
  title: 'Registration component',
  component: Registration,
} as Meta;

const Template: Story<RegistrationProps> = (args) => <Registration {...args} />;

export const FirstInput = Template.bind({});
FirstInput.args = {
  label: 'Write something: ',
};