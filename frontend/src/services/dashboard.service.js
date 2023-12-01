import axios from 'axios';

const backendUrl = 'http://localhost:4000';

const setToken = (token) => {
  // console.log('Token set:', token);
  localStorage.setItem('token', token);
};

const dashboardService = {
  login: async ({ email, password }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/login`,
        { user: { email, password } },
        {
          headers: {
            Authorization: `Basic ${btoa(`${email}:${password}`)}`,
          },
        }
      );
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      throw error;
    }
  },

  getUserDetails: async () => {
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
    
      return response.data;
    } catch (error) {
      console.error('Error getting user details:', error);
      throw error;
    }
  },
  
  logout: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${backendUrl}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('token');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
};

export default dashboardService;
