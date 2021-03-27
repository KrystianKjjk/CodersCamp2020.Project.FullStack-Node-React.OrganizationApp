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
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRjNjQyZTUzNDdhZDE5ZDRmOWE0MzciLCJ0eXBlIjozLCJpYXQiOjE2MTY4NDQxNzksImV4cCI6MTYxNjg0NTM3OX0.FLhyRwah2nmU-DycG3oPGmTOo4hM1GBz893BKsT-vt8';
const getUsers = () => {
  return getUsersApi(token);
}
export const SampleManageUsers = Template.bind({});
SampleManageUsers.args = {
  getUsers: getUsers,
};
//Promise.resolve([
    // {id: 1, name: 'Name1', surname: 'Surname1', type: 'Admin', status: 'Active'},
    // {id: 2, name: 'Name2', surname: 'Surname2', type: 'Admin', status: 'Active'},
    // {id: 3, name: 'Name3', surname: 'Surname3', type: 'Admin', status: 'Active'},
    // {id: 4, name: 'Name4', surname: 'Surname4', type: 'Admin', status: 'Active'},
    //]);