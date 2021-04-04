import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import CourseList , { CourseListProps } from './CourseList';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

export default {
  title: 'CourseList component',
  component: CourseList,
} as Meta;

const Template: Story<CourseListProps> = (args) => (
  <Provider store={store}>
    <CourseList {...args} />
  </Provider>
);

export const SampleCourseList = Template.bind({});
SampleCourseList.args = {
  name: 'CourseList',
};