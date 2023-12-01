import axios from 'axios';

const backendUrl = 'http://localhost:4000';

const registerService = {
  
  register: async (formData) => {
    try {
      const response = await axios.post(`${backendUrl}/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      throw error;
    }
  },
};

export default registerService;
