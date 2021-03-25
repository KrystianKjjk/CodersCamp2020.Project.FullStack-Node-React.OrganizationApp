import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import MainViewContent , { MainViewContentProps } from './MainViewContent';

export default {
  title: 'MainViewContent component',
  component: MainViewContent,
} as Meta;

const Template: Story<MainViewContentProps> = (args) => <MainViewContent {...args} />;

export const FirstInput = Template.bind({});
FirstInput.args = {
  label: 'Write something: ',
};