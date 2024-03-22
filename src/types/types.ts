export type TCandidate = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: string;
    expectedSalary: number;
    computedScore: number;
    skills: TSkill[];
};

export type TSkill = {
    id?: string;
    name: string;
    yearsOfExperience: number;
};

export type TCandidateFormFields = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: string;
    expectedSalary: number;
    computedScore?: number;
    skills: TSkill[];
};

export type TCandidateFormFieldsWithoutSkills = Omit<
    TCandidateFormFields,
    'skills'
>;

export type TFieldConfig = {
    name: string;
    label: string;
    type: string;
    required: boolean;
    allowedValuesMap?: Record<string, string>;
};

export type TAllowedValuesMap = Record<string, string>;
