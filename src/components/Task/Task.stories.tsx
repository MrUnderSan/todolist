import type {Meta, StoryObj} from '@storybook/react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'Components/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
        todolistId: 'todolistId'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const completedTask: Story = {
    args: {
        task: {
            id: 'taskId',
            title: 'Some title',
            isDone: true
        }
    },
};

export const uncompletedTask: Story = {
    args: {
        task: {
            id: 'taskId',
            title: 'Some title',
            isDone: false
        }
    },
};
