import { createContext, useReducer, ReactNode, FC, Dispatch } from 'react';
import { TCandidate } from '../types/types';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const CANDIDATE_LIST = 'CANDIDATE_LIST';
export const CANDIDATE_CREATE = 'CANDIDATE_CREATE';
export const CANDIDATE_DELETE = 'CANDIDATE_DELETE';
export const CANDIDATE_UPDATE = 'CANDIDATE_UPDATE';

type Action =
    | { type: 'FETCH_DATA_REQUEST' }
    | { type: 'FETCH_DATA_FAILURE'; error: string }
    | { type: 'CANDIDATE_LIST'; candidates: TCandidate[] }
    | { type: 'CANDIDATE_CREATE'; candidate: TCandidate }
    | { type: 'CANDIDATE_DELETE'; candidateId: string | undefined }
    | { type: 'CANDIDATE_UPDATE'; candidate: TCandidate };

export type TState = {
    candidates: TCandidate[];
    isLoading: boolean;
    error: null | string;
};

const initialState: TState = {
    candidates: [],
    isLoading: false,
    error: null,
};

export const CandidatesStateContext = createContext<TState>(initialState);
export const CandidatesDispatchContext = createContext<Dispatch<Action>>(
    () => null,
);

const reducer = (state: TState, action: any) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return { ...state, isLoading: true, error: null };
        case FETCH_DATA_FAILURE:
            return { ...state, error: action.error, isLoading: false };
        case CANDIDATE_LIST:
            return {
                ...state,
                candidates: action.candidates,
                isLoading: false,
            };
        case CANDIDATE_CREATE:
            console.log('action.candidates', action.candidate);
            return {
                ...state,
                candidates: [...state.candidates, action.candidate],
                isLoading: false,
                error: null,
            };
        case CANDIDATE_UPDATE:
            const updatedCandidates = state.candidates.map(
                (candidate: TCandidate) => {
                    if (candidate.id === action.candidate.id) {
                        return action.candidate;
                    }
                    return candidate;
                },
            );
            return {
                ...state,
                candidates: updatedCandidates,
                isLoading: false,
                error: null,
            };
        case CANDIDATE_DELETE:
            const remainingCandidates = state.candidates.filter(
                (candidate: TCandidate) => candidate.id !== action.candidateId,
            );
            return {
                ...state,
                candidates: remainingCandidates,
                isLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

interface TCandidatesContextProps {
    children: ReactNode;
}

const CandidatesContext: FC<TCandidatesContextProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CandidatesStateContext.Provider value={state}>
            <CandidatesDispatchContext.Provider value={dispatch}>
                {children}
            </CandidatesDispatchContext.Provider>
        </CandidatesStateContext.Provider>
    );
};

export default CandidatesContext;
