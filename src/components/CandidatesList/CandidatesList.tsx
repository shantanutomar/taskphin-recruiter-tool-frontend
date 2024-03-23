import React, { FC, useEffect, useMemo } from 'react';
import Loader from '../Loader/Loader';
import {
    CandidatesDispatchContext,
    CandidatesStateContext,
    FETCH_DATA_REQUEST,
} from '../../context/candidateContext';
import { fetchCandidatesListAPI } from '../../api/candidatesApi';
import ListItem from '../ListItem/ListItem';
import { TCandidate } from '../../types/types';

type TCandidatesListProps = {
    onUpdate: (candidate: TCandidate) => void;
    onDelete: (candidate: TCandidate) => void;
    onDetails: (candidate: TCandidate) => void;
};
const CandidatesList: FC<TCandidatesListProps> = ({
    onUpdate,
    onDelete,
    onDetails,
}) => {
    const { candidates, error, isLoading } = React.useContext(
        CandidatesStateContext,
    );
    const dispatch = React.useContext(CandidatesDispatchContext);

    const fetchCandidates = async () => {
        dispatch({ type: FETCH_DATA_REQUEST });
        try {
            const candidates = await fetchCandidatesListAPI();
            if (candidates) {
                dispatch({
                    type: 'CANDIDATE_LIST',
                    candidates,
                });
            }
        } catch (error) {
            dispatch({
                type: 'FETCH_DATA_FAILURE',
                error: error as string,
            });

            throw new Error(
                `Error occurred while fetching getting candidates list: ${error}`,
            );
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    const renderList = useMemo(() => {
        return (
            candidates &&
            candidates.map((candidate) => (
                <ListItem
                    key={candidate.id}
                    candidate={candidate}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onDetails={onDetails}
                />
            ))
        );
    }, [candidates, onUpdate, onDelete, onDetails]);

    if (isLoading) return <Loader />;

    if (candidates && candidates.length === 0)
        return (
            <h1 className="text-lg leading-6 font-medium text-gray-900 p-4">
                No candidates. Please add a candidate
            </h1>
        );

    return (
        <section className="bg-white shadow overflow-hidden rounded-lg mt-4">
            {error && (
                <p className="text-red-500 text-xs italic p-4">
                    Error: {error}
                </p>
            )}
            {!isLoading && (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase">
                                Name
                            </th>
                            <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase">
                                Email
                            </th>
                            <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase">
                                Phone number
                            </th>
                            <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase">
                                Status
                            </th>
                            <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase">
                                Expected Salary
                            </th>
                            <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase">
                                Score
                            </th>
                            <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {renderList}
                    </tbody>
                </table>
            )}
        </section>
    );
};

export default CandidatesList;
