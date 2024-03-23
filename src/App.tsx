import React, { useCallback, useState } from 'react';
import CandidatesList from './components/CandidatesList/CandidatesList';
import AddCandidateDialog from './components/AddCandidateDialog/AddCandidateDialog';
import UpdateCandidateDialog from './components/UpdateCandidateDialog/UpdateCandidateDialog';
import { TCandidate } from './types/types';
import { CandidatesDispatchContext } from './context/candidateContext';
import { deleteCandidateAPI } from './api/candidatesApi';
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog/DeleteConfirmationDialog';
import CandidateDetailsDialog from './components/CandidateDetailsDialog/CandidateDetailsDialog';

function App() {
    const dispatch = React.useContext(CandidatesDispatchContext);
    const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState<boolean>(false);
    const [showDetailsDialog, setShowDetailsDialog] = useState<boolean>(false);
    const [selectedCandidate, setSelectedCandidate] =
        useState<TCandidate | null>(null);
    const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
        useState<boolean>(false);

    const handleCloseDialogs = useCallback(() => {
        setShowAddDialog(false);
        setShowUpdateDialog(false);
        setShowDeleteConfirmationDialog(false);
        setShowDetailsDialog(false);
    }, []);

    const handleDelete = useCallback((candidate: TCandidate) => {
        setSelectedCandidate(candidate);
        setShowDeleteConfirmationDialog(true);
    }, []);

    const handleUpdate = useCallback((candidate: TCandidate) => {
        setSelectedCandidate(candidate);
        setShowUpdateDialog(true);
    }, []);

    const handleDetails = useCallback((candidate: TCandidate) => {
        setSelectedCandidate(candidate);
        setShowDetailsDialog(true);
    }, []);

    const handleConfirmDelete = async () => {
        if (!selectedCandidate) return;

        dispatch({
            type: 'FETCH_DATA_REQUEST',
        });
        setShowDeleteConfirmationDialog(false);
        await deleteCandidateAPI(selectedCandidate.id!);

        dispatch({
            type: 'CANDIDATE_DELETE',
            candidateId: selectedCandidate.id,
        });
    };

    return (
        <section className="min-h-screen bg-gray-100 text-gray-800">
            <header className="bg-blue-500 text-white p-4">
                <h1 className="text-xl text-center">Candidates Dashboard</h1>
            </header>
            <section className="p-4 flex flex-col">
                <button
                    onClick={() => setShowAddDialog(true)}
                    className="w-1/12 self-end mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Candidate
                </button>
                <CandidatesList
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    onDetails={handleDetails}
                />
                {showAddDialog && (
                    <AddCandidateDialog onClose={handleCloseDialogs} />
                )}
                {showUpdateDialog && selectedCandidate !== null && (
                    <UpdateCandidateDialog
                        candidateToUpdate={selectedCandidate}
                        onClose={handleCloseDialogs}
                    />
                )}
                {showDetailsDialog && selectedCandidate !== null && (
                    <CandidateDetailsDialog
                        onClose={handleCloseDialogs}
                        candidateDetails={selectedCandidate}
                    />
                )}
                {showDeleteConfirmationDialog && (
                    <DeleteConfirmationDialog
                        message="Are you sure you want to delete this item?"
                        onCancel={handleCloseDialogs}
                        onConfirm={handleConfirmDelete}
                    />
                )}
            </section>
        </section>
    );
}

export default App;
