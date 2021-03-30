import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ManageTeams , { ManageTeamsProps } from './ManageTeams';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

export default {
  title: 'ManageTeams component',
  component: ManageTeams,
} as Meta;

const Template: Story<ManageTeamsProps> = (args) => (
  <Provider store={store}>
    <ManageTeams {...args} />
  </Provider>
);

const teamsDatabase = [
  {id: 1, name: 'Naame', surname: 'Suurname', courseName: 'CodersCamp 1. edition'},
  {id: 2, name: 'Naaame', surname: 'Suuuurname', courseName: 'CodersCamp 1. edition'},
  {id: 3, name: 'Naaaame', surname: 'Suuurname', courseName: 'CodersCamp 1. edition'},
  {id: 4, name: 'Naaaaaame', surname: 'Suuuuurname', courseName: 'CodersCamp 1. edition'},
  {id: 5, name: 'CName', surname: 'CSurname', courseName: 'CodersCamp 1. edition'},
]
const getFakeTeams = () => {
  return Promise.resolve(teamsDatabase);
}

export const SampleManageTeams = Template.bind({});
SampleManageTeams.args = {
  getTeams: getFakeTeams,
  onClickAdd: () => console.log('Clicked Add'),
};