import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ReusableTable , { ReusableTableProps } from './ReusableTable';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

import getTodos from '../../api/getTodos';

export default {
  title: 'ReusableTable component',
  component: ReusableTable,
} as Meta;

const Template: Story<ReusableTableProps> = (args) => (
  <Provider store={store}>
    <ReusableTable {...args} />
  </Provider>
);

export const SampleReusableTable = Template.bind({});
SampleReusableTable.args = {
  name: 'My Table',
  columns: [{field: 'id', width: 100}, {field: 'title', width: 400}],
  getData: getTodos,
  onRowClick: (params, e) => console.log(params.row),
};