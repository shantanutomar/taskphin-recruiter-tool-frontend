import React, { FC } from 'react';
import { TCandidate } from '../../types/types';
import { allowedStatusMap } from '../../constants';

type TListItemProps = {
    candidate: TCandidate;
    onUpdate: (candidate: TCandidate) => void;
    onDelete: (candidate: TCandidate) => void;
    onDetails: (candidate: TCandidate) => void;
};

const ListItem: FC<TListItemProps> = ({
    candidate,
    onUpdate,
    onDelete,
    onDetails,
}) => {
    const onItemUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onUpdate(candidate);
    };

    const onItemDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onDelete(candidate);
    };

    const onItemDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onDetails(candidate);
    };

    return (
        <tr className="hover:bg-gray-100">
            <td className="text-blue-600 px-2 py-2 text-center whitespace-nowrap text-sm font-medium">
                <button
                    className="bg-transparent underline text-blue-600 hover:bg-transparent"
                    onClick={onItemDetails}
                >{`${candidate.firstName} ${candidate.lastName}`}</button>
            </td>
            <td className="px-2 py-2 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                {candidate.email}
            </td>
            <td className="px-2 py-2 text-center whitespace-nowrap text-sm font-medium text-gray-900 ">
                {candidate.phone}
            </td>
            <td className="px-2 py-2 text-center whitespace-nowrap text-sm font-medium text-gray-900 ">
                {allowedStatusMap[candidate.status]}
            </td>
            <td className="px-2 py-2 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                {candidate.expectedSalary}
            </td>
            <td className="px-2 py-2 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                {candidate.computedScore}
            </td>
            <td className="px-2 py-2 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                <button
                    className="text-white bg-blue-500 mr-2"
                    onClick={(event) => onItemUpdate(event)}
                >
                    Update
                </button>
                <button
                    className="text-white bg-blue-500"
                    onClick={(event) => onItemDelete(event)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default ListItem;
