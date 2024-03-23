import React, { FC, useCallback, useMemo, useState } from 'react';
import { updateFieldsConfig } from '../../constants';
import { CandidatesDispatchContext } from '../../context/candidateContext';
import { updateCandidateAPI } from '../../api/candidatesApi';
import {
    TCandidate,
    TCandidateFormFields,
    TCandidateFormFieldsWithoutSkills,
    TFieldConfig,
} from '../../types/types';

type TUpdateCandidateDialogProps = {
    onClose: () => void;
    candidateToUpdate: TCandidate;
};

const UpdateCandidateDialog: FC<TUpdateCandidateDialogProps> = ({
    candidateToUpdate,
    onClose,
}) => {
    const dispatch = React.useContext(CandidatesDispatchContext);
    const [formData, setFormData] = useState<Partial<TCandidateFormFields>>({
        status: candidateToUpdate.status,
    });

    const handleChange = useCallback(
        (event: React.FormEvent<HTMLSelectElement>) => {
            const { name, value } = event.target as HTMLSelectElement;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        },
        [setFormData],
    );

    const handleSave = useCallback(async () => {
        dispatch({
            type: 'FETCH_DATA_REQUEST',
        });
        onClose();
        try {
            const updatedCandidate = await updateCandidateAPI(
                candidateToUpdate.id!,
                { ...candidateToUpdate, ...formData },
            );
            if (updatedCandidate) {
                dispatch({
                    type: 'CANDIDATE_UPDATE',
                    candidate: updatedCandidate,
                });
            }
        } catch (error) {
            dispatch({
                type: 'FETCH_DATA_FAILURE',
                error: error as string,
            });
            throw new Error(
                `Error occurred while updating candidate: ${error}`,
            );
        }
    }, [formData, onClose, dispatch, candidateToUpdate]);

    const handleCancel = useCallback(() => {
        onClose();
    }, [onClose]);

    const renderInputs = useMemo(() => {
        return updateFieldsConfig.map((field: TFieldConfig, index: number) =>
            field.type === 'select' ? (
                <div key={index} className="flex items-center mb-8">
                    <label
                        htmlFor={field.name}
                        className="font-bold w-1/3 block text-md"
                    >
                        {field.label}
                    </label>
                    <select
                        className="w-2/3 p-2 mt-1 rounded-md border-gray-600 shadow ring-transparent outline-none"
                        name={field.name}
                        value={
                            formData[
                                field.name as keyof TCandidateFormFieldsWithoutSkills
                            ]
                        }
                        onChange={handleChange}
                        required
                    >
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
                []
            ),
        );
    }, [formData, handleChange]);

    return (
        <section className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h1 className="text-xl text-center font-semibold mb-6">
                    Update Candidate Details
                </h1>
                {renderInputs}
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-blue-700"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-gray-700"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UpdateCandidateDialog;
