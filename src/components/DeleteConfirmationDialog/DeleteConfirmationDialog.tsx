import React, { FC } from 'react';

type TDeleteConfirmationDialogProps = {
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
};

const DeleteConfirmationDialog: FC<TDeleteConfirmationDialogProps> = ({
    message,
    onCancel,
    onConfirm,
}) => {
    return (
        <section className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
                <p className="font-medium text-center text-gray-800">
                    {message}
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        className="px-4 py-2 rounded text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600 transition-colors"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </section>
    );
};

export default DeleteConfirmationDialog;
