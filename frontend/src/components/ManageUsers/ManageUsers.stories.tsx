import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ManageUsers , { ManageUsersProps } from './ManageUsers';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import getUsersApi from '../../api/getUsers';


export default {
  title: 'ManageUsers component',
  component: ManageUsers,
} as Meta;

const Template: Story<ManageUsersProps> = (args) => (
  <Provider store={store}>
    <ManageUsers {...args} />
  </Provider>
);

const getUsers = () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRjNjQyZTUzNDdhZDE5ZDRmOWE0MzciLCJ0eXBlIjozLCJpYXQiOjE2MTY4NzIzNTcsImV4cCI6MTYxNjk1ODc1N30.RX1EzN6tHmdMFhDWtm6TmQPFzML6min3e_11RH3B6GA';
  return getUsersApi(token);
}
export const SampleManageUsers = Template.bind({});
SampleManageUsers.args = {
  getUsers: getUsers,
};
