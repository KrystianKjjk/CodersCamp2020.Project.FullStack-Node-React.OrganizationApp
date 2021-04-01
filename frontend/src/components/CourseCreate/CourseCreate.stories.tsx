import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import CourseCreate , { CourseCreateProps } from './CourseCreate';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

export default {
  title: 'CourseCreate component',
  component: CourseCreate,
} as Meta;

const Template: Story<CourseCreateProps> = (args) => (
  <Provider store={store}>
    <CourseCreate {...args} />
  </Provider>
);

export const SampleCourseCreate = Template.bind({});
SampleCourseCreate.args = {
  name: 'CourseCreate',
};