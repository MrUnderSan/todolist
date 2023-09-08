import type {Meta, StoryObj} from '@storybook/react';

import {Task} from './Task';
import {func, object} from 'prop-types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
  title: 'UI/Task',
  component: Task,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    task: object,
    onChangeCheckboxHandler: func,
    onClickButtonHandler: func
  },

};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const CompletedTask: Story = {
  args: {
    task: {
      title: "task name",
      isDone: true,
      id: 'someId'
    }
  },
};

export const UncompletedTask: Story = {
  args: {
    task: {
      title: "task name",
      isDone: false,
      id: 'someId'
    }
  },
};