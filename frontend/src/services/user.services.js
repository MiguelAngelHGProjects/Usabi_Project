import axios from 'axios';

const backendUrl = 'http://localhost:4000';

const userService = {
  getUserData: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage.');
      }

      const response = await axios.get(`${backendUrl}/current_user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (error) {
      console.error('Error getting user data:', error);
      throw error;
    }
  },
};

export default userService;