import { TAllowedValuesMap, TFieldConfig } from './types/types';

export const allowedStatusMap: TAllowedValuesMap = {
    CONTACTED: 'Contacted',
    INTERVIEW_SCHEDULED: 'Interview Scheduled',
    OFFER_EXTENDED: 'Offer Extended',
    HIRED: 'Hired',
    REJECTED: 'Rejected',
};

export const allowedSkillsMap: TAllowedValuesMap = {
    HTML: 'HTML',
    REACTJS: 'ReactJS',
    NODEJS: 'NodeJS',
    CSS: 'CSS',
    AWS: 'AWS',
};

export const addFieldsConfig: TFieldConfig[] = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
    },
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
    },
    {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: true,
    },
    {
        name: 'status',
        label: 'Status',
        type: 'select',
        required: true,
        allowedValuesMap: allowedStatusMap,
    },
    {
        name: 'expectedSalary',
        label: 'Expected Salary',
        type: 'number',
        required: true,
    },
];

export const updateFieldsConfig: TFieldConfig[] = [
    {
        name: 'status',
        label: 'Status',
        type: 'select',
        required: true,
        allowedValuesMap: allowedStatusMap,
    },
];

export const detailsFieldsConfig: TFieldConfig[] = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
    },
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
    },
    {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: true,
    },
    {
        name: 'status',
        label: 'Status',
        type: 'select',
        required: true,
        allowedValuesMap: allowedStatusMap,
    },
    {
        name: 'expectedSalary',
        label: 'Expected Salary',
        type: 'number',
        required: true,
    },
    {
        name: 'computedScore',
        label: 'Score',
        type: 'text',
        required: true,
    },
];
