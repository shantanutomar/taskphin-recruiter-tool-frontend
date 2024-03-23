import React, { FC, useCallback, useMemo } from 'react';
import {
    allowedSkillsMap,
    allowedStatusMap,
    detailsFieldsConfig,
} from '../../constants';
import {
    TCandidate,
    TCandidateFormFieldsWithoutSkills,
    TFieldConfig,
    TSkill,
} from '../../types/types';

type TCandidateDetailsDialogProps = {
    onClose: () => void;
    candidateDetails: TCandidate;
};

const CandidateDetailsDialog: FC<TCandidateDetailsDialogProps> = ({
    candidateDetails,
    onClose,
}) => {
    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const renderDetails = useMemo(() => {
        return detailsFieldsConfig.map((field: TFieldConfig, index: number) => {
            let fieldContent =
                candidateDetails[
                    field.name as keyof TCandidateFormFieldsWithoutSkills
                ];
            if (field.name === 'status') {
                fieldContent = allowedStatusMap[fieldContent as string];
            }
            return (
                <div
                    key={index}
                    className="p-1 flex items-center space-x-2 mb-2"
                >
                    <h3 className="font-bold w-1/3">{field.label}:</h3>
                    <h1 className="text-lg">{fieldContent}</h1>
                </div>
            );
        });
    }, [candidateDetails]);

    const renderSkills = useMemo(
        () => (
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Years of Experience
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {candidateDetails.skills.map((skill: TSkill) => (
                        <tr key={skill.id} className="hover:bg-gray-100">
                            <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                                <h1>{allowedSkillsMap[skill.name]}</h1>
                            </td>
                            <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                                <h1>{skill.yearsOfExperience}</h1>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ),
        [candidateDetails],
    );

    return (
        <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl mx-4">
                <h1 className="text-xl font-bold mb-6">Candidate Details</h1>
                {renderDetails}
                <div className="p-1">
                    <h3 className="font-bold my-3">Skills:</h3>
                    {renderSkills}
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CandidateDetailsDialog;
