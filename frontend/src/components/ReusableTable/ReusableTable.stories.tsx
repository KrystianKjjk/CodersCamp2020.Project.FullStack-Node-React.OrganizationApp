import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ReusableTable , { ReusableTableProps } from './ReusableTable';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import TeamService from '../../api/Team.service';

export default {
  title: 'ReusableTable component',
  component: ReusableTable,
} as Meta;

const Template: Story<ReusableTableProps> = (args) => (
  <Provider store={store}>
    <ReusableTable {...args} />
  </Provider>
);

const api = new TeamService();

export const SampleReusableTable = Template.bind({});
SampleReusableTable.args = {
  name: 'My Table',
  columns: [{field: 'id', width: 200}, {field: 'name', width: 200}, {field: 'surname', width: 200}, {field: 'courseName', width: 200}],
  getData: api.getTeams,
  onRowClick: (params, e) => console.log(params.row),
};