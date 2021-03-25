import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Button , { ButtonProps } from './Button';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

export default {
  title: 'Button component',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <Provider store={store}>
    <Button {...args} />
  </Provider>
);

export const SampleButton = Template.bind({});
SampleButton.args = {
  name: 'Button',
};