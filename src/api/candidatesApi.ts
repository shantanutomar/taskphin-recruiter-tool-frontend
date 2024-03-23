const baseUrl =
    process.env.REACT_APP_NODE_ENV === 'development'
        ? process.env.REACT_APP_DEV_API_URL
        : process.env.REACT_APP_PROD_API_URL;

export interface ISkillRequest {
    id?: string;
    name: string;
    yearsOfExperience: number;
}

export interface ISkillResponse {
    id: string;
    name: string;
    yearsOfExperience: number;
}

export interface ICandidateRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: string;
    expectedSalary: number;
    skills: ISkillRequest[];
}

export interface ICandidateResponse {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: string;
    expectedSalary: number;
    computedScore: number;
    skills: ISkillResponse[];
}

export const fetchCandidatesListAPI = async (): Promise<
    ICandidateResponse[] | undefined
> => {
    try {
        const response = await fetch(`${baseUrl}/candidates/list`, {
            method: 'GET',
        });
        if (response.status === 200) {
            return await response.json();
        }
    } catch (error) {
        console.error(
            `Error occurred while fetching getting candidates list: ${error}`,
        );
    }
};

export const updateCandidateAPI = async (
    candidateId: string,
    candidateDataToUpdate: ICandidateRequest,
): Promise<ICandidateResponse | undefined> => {
    try {
        const response = await fetch(`${baseUrl}/candidates/${candidateId}`, {
            method: 'PUT',
            body: JSON.stringify(candidateDataToUpdate),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
        if (response.status === 200) {
            return await response.json();
        }
    } catch (error) {
        console.error(
            `Error occurred while updating candidate details: ${error}`,
        );
    }
};

export const deleteCandidateAPI = async (candidateId: string) => {
    try {
        await fetch(`${baseUrl}/candidates/${candidateId}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error(`Error occurred while deleting candidate: ${error}`);
    }
};

export const addCandidateAPI = async (
    candidateDataToAdd: ICandidateRequest,
): Promise<ICandidateResponse | undefined> => {
    try {
        const response = await fetch(`${baseUrl}/candidates/create`, {
            method: 'POST',
            body: JSON.stringify(candidateDataToAdd),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
        if (response.status === 200) {
            return await response.json();
        }
    } catch (error) {
        console.error(`Error occurred while creating candidate: ${error}`);
    }
};

export const getCandidateDetailsAPI = async (
    candidateId: string,
): Promise<ICandidateResponse | undefined> => {
    try {
        const response = await fetch(`${baseUrl}/candidates/${candidateId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
        if (response.status === 200) {
            return await response.json();
        }
    } catch (error) {
        console.error(
            `Error occurred while fetching candidate details: ${error}`,
        );
    }
};
