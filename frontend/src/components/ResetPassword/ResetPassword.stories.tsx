import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ResetPassword from './ResetPassword';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { StyledTextFieldProps } from '../StyledTextField/StyledTextField';

export default {
  title: 'ResetPassword component',
  component: ResetPassword,
} as Meta;

const Template: Story<StyledTextFieldProps> = (args) => (
  <Provider store={store}>
    <ResetPassword {...args} />
  </Provider>
);

export const FirstInput = Template.bind({});
FirstInput.args = {
  label: 'Write something: ',
};