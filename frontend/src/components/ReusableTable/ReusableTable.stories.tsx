import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ReusableTable , { ReusableTableProps } from './ReusableTable';

export default {
  title: 'ReusableTable component',
  component: ReusableTable,
} as Meta;

const Template: Story<ReusableTableProps> = (args) => <ReusableTable {...args} />;

export const SampleReusableTable = Template.bind({});
SampleReusableTable.args = {
  name: 'My Table',
  columns: [{field: 'id', width: 100}, {field: 'name', width: 100}],
};