import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Course , { CourseProps } from './Course';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

// export default {
//   title: 'Course component',
//   component: Course,
// } as Meta;

// const Template: Story<CourseProps> = (args) => (
//   <Provider store={store}>
//     <Course {...args} />
//   </Provider>
// );

// export const SampleCourse = Template.bind({});
// SampleCourse.args = {
//   name: 'Course',
// };