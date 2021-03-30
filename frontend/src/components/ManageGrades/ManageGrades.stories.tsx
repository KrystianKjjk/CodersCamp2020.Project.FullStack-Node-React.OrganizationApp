import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ManageGrades , { ManageGradesProps } from './ManageGrades';

export default {
  title: 'ManageGrades component',
  component: ManageGrades,
} as Meta;

const Template: Story<ManageGradesProps> = (args) => <ManageGrades {...args} />;

export const FirstInput = Template.bind({});
FirstInput.args = {
  label: 'Write something: ',
};