import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ManageUser , { ManageUserProps } from './ManageUser';

export default {
  title: 'ManageUser component',
  component: ManageUser,
} as Meta;

const Template: Story<ManageUserProps> = (args) => <ManageUser {...args} />;

export const FirstInput = Template.bind({});
FirstInput.args = {
  label: 'Write something: ',
};