import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ContentBox , { ContentBoxProps } from './ContentBox';

export default {
  title: 'ContentBox component',
  component: ContentBox,
} as Meta;

const Template: Story<ContentBoxProps> = (args) => <ContentBox {...args} />;

export const FirstInput = Template.bind({});
FirstInput.args = {
  label: 'Write something: ',
};