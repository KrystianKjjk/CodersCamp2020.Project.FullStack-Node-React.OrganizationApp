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

export const SampleManageTeams = Template.bind({});
SampleManageTeams.args = {
  name: 'ManageTeams',
};