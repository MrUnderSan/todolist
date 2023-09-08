import type { Meta, StoryObj } from '@storybook/react';

import { TodolistInput } from './TodolistInput';
import {func} from 'prop-types';
import '../../../App.css';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TodolistInput> = {
  title: 'UI/Todolist Input',
  component: TodolistInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    addTask: func
  },
};

export default meta;
type Story = StoryObj<typeof TodolistInput>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ClearInput: Story = {
  args: {
    addTask: ()=>{}
  }
};