// services/userService.js
import axios from 'axios';
import Cookies from 'js-cookie'; // Assuming you're using js-cookie for cookie management

export const login = async (email, password) => {
    try {
        console.log({ email, password });
        const response = await axios.post('/api/user/login', {
            email,
            password,
        });

        // console.log(response.data);
        const token = response.data.token;
        // console.log(token);

        if (token) {
            localStorage.setItem("token",token);
            Cookies.set('token', token); 
            return 'Login berhasil!'; 
        } else {
            throw new Error('Token tidak ditemukan dalam respons');
        }
    } catch (err) {
        throw new Error(err.response?.data?.message || 'Login failed');
    }
};

export const register = async (fullName, email, password) => {
    const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
    });

    // Check if the response is okay
    if (!response.ok) {
        throw new Error('Failed to register');
    }

    // Assuming the response is JSON and includes a success property
    return await response.json();
};
