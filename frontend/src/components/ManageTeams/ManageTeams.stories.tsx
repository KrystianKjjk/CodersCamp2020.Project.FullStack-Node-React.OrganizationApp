import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ManageTeams , { ManageTeamsProps } from './ManageTeams';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import getTeams from '../../api/getTeams';
import darkTheme from '../../theme/customMaterialTheme';
import { ThemeProvider } from '@material-ui/styles';


export default {
  title: 'ManageTeams component',
  component: ManageTeams,
} as Meta;

const Template: Story<ManageTeamsProps> = (args) => (
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <ManageTeams {...args} />  
    </ThemeProvider>
  </Provider>
);

const teamsDatabase = [
  {id: 1, name: 'Naame', surname: 'Suurname', courseName: 'CodersCamp 1. edition'},
  {id: 2, name: 'Naaame', surname: 'Suuuurname', courseName: 'CodersCamp 2. edition'},
  {id: 3, name: 'Naaaame', surname: 'Suuurname', courseName: 'CodersCamp 3. edition'},
  {id: 4, name: 'Naaaaaame', surname: 'Suuuuurname', courseName: 'CodersCamp 4. edition'},
  {id: 5, name: 'CName', surname: 'CSurname', courseName: 'CodersCamp 5. edition'},
]
const getFakeTeams = () => {
  return Promise.resolve(teamsDatabase);
}

export const SampleFakeManageTeams = Template.bind({});
SampleFakeManageTeams.args = {
  getTeams: getFakeTeams,
  onClickAdd: () => console.log('Clicked Add'),
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRjNjQyZTUzNDdhZDE5ZDRmOWE0MzciLCJ0eXBlIjozLCJpYXQiOjE2MTY4NzIzNTcsImV4cCI6MTYxNjk1ODc1N30.RX1EzN6tHmdMFhDWtm6TmQPFzML6min3e_11RH3B6GA';

export const SampleManageTeams = Template.bind({});
SampleManageTeams.args = {
  getTeams: () => getTeams(token),
  onClickAdd: () => console.log('Clicked Add'),
};