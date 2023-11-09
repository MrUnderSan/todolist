import type {Meta, StoryObj} from '@storybook/react';
import {Todolist} from './Todolist';
import {bool, func, string} from 'prop-types';
import {action} from '@storybook/addon-actions';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Todolist> = {
    title: 'UI/Todolist',
    component: Todolist,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        title: string,
        tasks: {
            id: string,
            title: string,
            isDone: bool,
        },
        removeTask: func,
        addTask: func,
        changeTaskStatus: func
    },

};

export default meta;
type Story = StoryObj<typeof Todolist>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SomeTodolist: Story = {
    args: {
        title: 'What to learn',
        tasks: [
            {id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true},
            {id: crypto.randomUUID(), title: 'JS', isDone: true},
            {id: crypto.randomUUID(), title: 'React', isDone: false},
        ],
        removeTask: action('removeTask'),
        addTask: action('addTask'),
        changeTaskStatus: action('changeTaskStatus'),
    },
};

export const EmptyTodolist: Story = {
    args: {
        title: 'What to bye',
        tasks: [],
        addTask: action('addTask'),
    },

};