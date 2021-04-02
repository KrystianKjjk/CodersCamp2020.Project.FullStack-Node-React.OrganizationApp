import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ManageTeam , { ManageTeamProps } from './ManageTeam';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import getTeam from '../../api/getTeam';
import darkTheme from '../../theme/customMaterialTheme';
import { ThemeProvider } from '@material-ui/styles';


export default {
  title: 'ManageTeam component',
  component: ManageTeam,
} as Meta;

const Template: Story<ManageTeamProps> = (args) => (
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <ManageTeam {...args} />  
    </ThemeProvider>
  </Provider>
);

const teamsDatabase = [{
  id: '0',
  mentor: {
    name: 'Naame',
    surname: 'Suurname',
  },
  users: [{
    id: '11',
    name: 'UserName',
    surname: 'UserSurname',
    status: 'Active',
    averageGrade: 11,
  }],
  projects: [],
  teamAvgGrade: 11,
  maxPoints: 111,
}];
const getFakeTeam = (id: string) => {
  return Promise.resolve(teamsDatabase[Number(id)]);
}

export const SampleFakeManageTeam = Template.bind({});
SampleFakeManageTeam.args = {
  teamId: '0',
  getTeamInfo: getFakeTeam,
  onClickAdd: () => console.log('Clicked Add'),
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRjNjQyZTUzNDdhZDE5ZDRmOWE0MzciLCJ0eXBlIjozLCJpYXQiOjE2MTY4NzIzNTcsImV4cCI6MTYxNjk1ODc1N30.RX1EzN6tHmdMFhDWtm6TmQPFzML6min3e_11RH3B6GA';

export const SampleManageTeam = Template.bind({});
SampleManageTeam.args = {
  teamId: '6041184b4864b56a243b20bf',
  getTeamInfo: (id: string) => getTeam(token, id),
  onClickAdd: () => console.log('Clicked Add'),
};