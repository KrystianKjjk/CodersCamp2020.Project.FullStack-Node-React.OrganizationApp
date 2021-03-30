import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import TeamProjects , { TeamProjectsProps } from './TeamProjects';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

export default {
  title: 'TeamProjects component',
  component: TeamProjects,
} as Meta;

const Template: Story<TeamProjectsProps> = (args) => (
  <Provider store={store}>
    <TeamProjects {...args} />
  </Provider>
);

export const SampleTeamProjects = Template.bind({});
SampleTeamProjects.args = {
  name: 'TeamProjects',
};