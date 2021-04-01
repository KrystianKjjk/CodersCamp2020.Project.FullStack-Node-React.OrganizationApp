import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ManageUsers , { ManageUsersProps } from './ManageUsers';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import getUsersApi from '../../api/getUsers';
import { ThemeProvider } from '@material-ui/styles';
import darkTheme from '../../theme/customMaterialTheme';


export default {
  title: 'ManageUsers component',
  component: ManageUsers,
} as Meta;

const Template: Story<ManageUsersProps> = (args) => (
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <ManageUsers {...args} />
    </ThemeProvider>
  </Provider>
);

const getUsers = () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRjNjQyZTUzNDdhZDE5ZDRmOWE0MzciLCJ0eXBlIjozLCJpYXQiOjE2MTY4NzIzNTcsImV4cCI6MTYxNjk1ODc1N30.RX1EzN6tHmdMFhDWtm6TmQPFzML6min3e_11RH3B6GA';
  return getUsersApi(token);
}
export const SampleManageUsers = Template.bind({});
SampleManageUsers.args = {
  getUsers: getUsers,
  onClickAdd: () => console.log('ADD user clicked')
};

const getFakeUsers = () => {
  return Promise.resolve([
    {id: 1, name: 'Naame', surname: 'Suurname', type: 'Mentor', status: 'Active'},
    {id: 2, name: 'Naaame', surname: 'Suuuurname', type: 'Participant', status: 'Archived'},
    {id: 3, name: 'Naaaame', surname: 'Suuurname', type: 'Participant', status: 'Resigned'},
    {id: 4, name: 'Naaaaaame', surname: 'Suuuuurname', type: 'Admin', status: 'Active'},
    {id: 5, name: 'CName', surname: 'CSurname', type: 'Candidate', status: 'Active'},
  ])
}
export const SampleManageFakeUsers = Template.bind({});
SampleManageFakeUsers.args = {
  getUsers: getFakeUsers,
  onClickAdd: () => console.log('ADD user clicked')
};