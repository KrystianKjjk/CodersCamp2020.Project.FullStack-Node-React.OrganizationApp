import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import PrivateRoute , { PrivateRouteProps } from './PrivateRoute';

export default {
  title: 'PrivateRoute component',
  component: PrivateRoute,
} as Meta;

const Template: Story<PrivateRouteProps> = (args) => <PrivateRoute {...args} />;

export const FirstInput = Template.bind({});
FirstInput.args = {
  // label: 'Write something: ',
};