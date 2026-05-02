const API_URL = 'http://localhost:8080/api/users';

export const getUsers = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
};

