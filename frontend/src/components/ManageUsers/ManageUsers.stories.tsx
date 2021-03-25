import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ManageUsers , { ManageUsersProps } from './ManageUsers';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

export default {
  title: 'ManageUsers component',
  component: ManageUsers,
} as Meta;

const Template: Story<ManageUsersProps> = (args) => (
  <Provider store={store}>
    <ManageUsers {...args} />
  </Provider>
);

export const SampleManageUsers = Template.bind({});
SampleManageUsers.args = {
  name: 'ManageUsers',
};