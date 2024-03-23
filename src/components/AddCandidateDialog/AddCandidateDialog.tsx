import React, { FC, useCallback, useMemo, useState } from 'react';
import { addFieldsConfig, allowedSkillsMap } from '../../constants';
import { CandidatesDispatchContext } from '../../context/candidateContext';
import { addCandidateAPI } from '../../api/candidatesApi';
import {
    TCandidateFormFields,
    TCandidateFormFieldsWithoutSkills,
    TFieldConfig,
    TSkill,
} from '../../types/types';

type TAddCandidateDialogProps = {
    onClose: () => void;
};

const AddCandidateDialog: FC<TAddCandidateDialogProps> = ({ onClose }) => {
    const dispatch = React.useContext(CandidatesDispatchContext);
    const [formData, setFormData] = useState<TCandidateFormFields>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        status: '',
        expectedSalary: 0,
        skills: [],
    });

    const handleChange = useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = event.target as
                | HTMLInputElement
                | HTMLSelectElement;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        },
        [setFormData],
    );

    const isFormDataValid = useCallback((): boolean => {
        if (
            formData.firstName === '' ||
            formData.lastName === '' ||
            formData.email === '' ||
            formData.phone === '' ||
            formData.status === '' ||
            formData.expectedSalary === 0
        ) {
            alert('All the fields are mandatory');
            return false;
        }

        if (formData.skills.length === 0) {
            alert(
                'Atleast one skill is required. Click on Add Skill to add a skill',
            );
            return false;
        }

        for (const skill of formData.skills) {
            if (skill.name === '' || skill.yearsOfExperience === 0) {
                alert('Select the skill and enter total years of experience');
                return false;
            }
        }

        return true;
    }, [formData]);

    const handleSave = useCallback(async () => {
        if (!isFormDataValid()) return;

        dispatch({
            type: 'FETCH_DATA_REQUEST',
        });
        onClose();

        try {
            const addedCandidate = await addCandidateAPI(formData);
            if (addedCandidate) {
                dispatch({
                    type: 'CANDIDATE_CREATE',
                    candidate: addedCandidate,
                });
            }
        } catch (error) {
            dispatch({
                type: 'FETCH_DATA_FAILURE',
                error: error as string,
            });
            throw new Error(`Error occurred while adding candidate: ${error}`);
        }
    }, [formData, onClose, dispatch, isFormDataValid]);

    const handleCancel = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleSkillChange = useCallback(
        (index: number, field: keyof TSkill, value: string | number) => {
            const updatedSkills = [...formData.skills];
            updatedSkills[index] = { ...updatedSkills[index], [field]: value };
            setFormData({ ...formData, skills: updatedSkills });
        },
        [formData],
    );

    const addSkill = () => {
        const newSkill = { name: '', yearsOfExperience: 0 };
        setFormData({ ...formData, skills: [...formData.skills, newSkill] });
    };

    const removeSkill = useCallback(
        (index: number) => {
            const updatedSkills = [...formData.skills];
            updatedSkills.splice(index, 1);
            setFormData({ ...formData, skills: updatedSkills });
        },
        [formData],
    );

    const renderInputs = useMemo(() => {
        return addFieldsConfig.map((field: TFieldConfig, index: number) =>
            field.type === 'select' ? (
                <div key={index} className="flex items-center space-x-2 mb-2">
                    <label
                        className="font-bold w-1/3 block text-md"
                        htmlFor={field.name}
                    >
                        {field.label}:
                    </label>
                    <select
                        className="p-2 w-2/3 mt-1 rounded-md border-gray-500 shadow ring-transparent outline-none"
                        name={field.name}
                        value={
                            formData[
                                field.name as keyof TCandidateFormFieldsWithoutSkills
                            ]
                        }
                        onChange={handleChange}
                        required
                    >
                        <option value="">{`Select ${field.label}`}</option>
                        {field.allowedValuesMap &&
                            Object.keys(field.allowedValuesMap).map((value) => {
                                return (
                                    <option key={value} value={value}>
                                        {field.allowedValuesMap![value]}
                                    </option>
                                );
                            })}
                    </select>
                </div>
            ) : (
                <div key={index} className="flex items-center space-x-2 mb-2">
                    <label
                        className="font-bold w-1/3 block text-md"
                        htmlFor={field.name}
                    >
                        {field.label}:
                    </label>
                    <input
                        className="w-2/3 p-2 mt-1 rounded-md border-gray-600 shadow ring-transparent outline-none"
                        type={field.type}
                        name={field.name}
                        value={
                            formData[
                                field.name as keyof TCandidateFormFieldsWithoutSkills
                            ]
                        }
                        onChange={handleChange}
                        required={field.required}
                        placeholder={`Enter ${field.label}`}
                    />
                </div>
            ),
        );
    }, [formData, handleChange]);

    const renderSkillInputs = useMemo(
        () => (
            <section className="overflow-scroll max-h-48">
                {formData.skills &&
                    formData.skills.map((skill: TSkill, index: number) => (
                        <div
                            key={index}
                            className="flex justify-center items-center space-x-2 mb-2"
                        >
                            <select
                                className="w-1/3 p-2 mt-1 rounded-md border-gray-600 shadow ring-transparent outline-none"
                                value={skill.name}
                                onChange={(
                                    event: React.FormEvent<HTMLSelectElement>,
                                ) => {
                                    const { value } =
                                        event.target as HTMLSelectElement;
                                    handleSkillChange(index, 'name', value);
                                }}
                            >
                                <option value="">Select Skill</option>
                                {allowedSkillsMap &&
                                    Object.keys(allowedSkillsMap).map(
                                        (value) => {
                                            return (
                                                <option
                                                    key={value}
                                                    value={value}
                                                >
                                                    {allowedSkillsMap[value]}
                                                </option>
                                            );
                                        },
                                    )}
                            </select>
                            <input
                                className="w-1/3 p-1 mt-1 rounded-md border-gray-600 shadow ring-transparent outline-none"
                                type="number"
                                value={skill.yearsOfExperience}
                                onChange={(
                                    event: React.FormEvent<HTMLInputElement>,
                                ) => {
                                    const { value } =
                                        event.target as HTMLInputElement;
                                    handleSkillChange(
                                        index,
                                        'yearsOfExperience',
                                        value,
                                    );
                                }}
                                placeholder="Years of Experience"
                            />
                            <button
                                className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600 transition-colors"
                                onClick={() => removeSkill(index)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
            </section>
        ),
        [formData, handleSkillChange, removeSkill],
    );

    return (
        <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl mx-4">
                <h1 className="text-xl text-center font-semibold mb-6">
                    Add Candidate Details
                </h1>
                {renderInputs}
                <div>
                    <h3 className="font-bold my-3">Skills:</h3>
                    {renderSkillInputs}
                    <button
                        className="mt-2 px-2 text-sm rounded text-white bg-green-500 hover:bg-green-600 transition-colors"
                        onClick={addSkill}
                    >
                        Add Skill
                    </button>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className="px-4 py-2 rounded text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AddCandidateDialog;
