import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import MainView , { MainViewProps } from './MainView';

export default {
  title: 'MainView component',
  component: MainView,
} as Meta;

const Template: Story<MainViewProps> = (args) => <MainView {...args} />;

export const FirstInput = Template.bind({});
FirstInput.args = {
  label: 'Write something: ',
};