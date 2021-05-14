import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import SearchInput, { SearchInputProps } from './SearchInput'
import { store } from '../../app/store'
import { Provider } from 'react-redux'

export default {
  title: 'SearchInput component',
  component: SearchInput,
} as Meta

const Template: Story<SearchInputProps> = (args) => (
  <Provider store={store}>
    <SearchInput {...args} />
  </Provider>
)

export const SampleSearchInput = Template.bind({})
SampleSearchInput.args = {
  onSubmit: (value: string) => console.log(value),
  placeholder: 'Search',
}
