import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import UButton , { UButtonProps } from './UButton';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

export default {
  title: 'UButton component',
  component: UButton,
} as Meta;

const Template: Story<UButtonProps> = (args) => (
  <Provider store={store}>
    <UButton {...args} />
  </Provider>
);

export const SampleUButton = Template.bind({});
SampleUButton.args = {
    text: 'ADD',
    color: 'primary',
    onClick: ()=>{},
};
