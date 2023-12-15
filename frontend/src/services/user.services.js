import axios from 'axios';

const backendUrl = 'http://localhost:4000';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found in localStorage.');
  }
  return token;
};

const userService = {
  getUserData: async () => {
    try {
      const token = getToken();
      const response = await axios.get(`${backendUrl}/current_user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (error) {
      console.error('Error getting user data:', error.message);
      throw error;
    }
  },

  changePassword: async (userId, currentPassword, newPassword, confirmPassword) => {
    try {
      const token = getToken();
      const response = await axios.put(
        `${backendUrl}/users/${userId}/change_password`,
        {
          current_password: currentPassword,
          new_password: newPassword,
          password_confirmation: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('Error changing password:', error.message);
      throw error;
    }
  },

  updateProfile: async (userId, profileData) => {
    try {
      const token = getToken();
      const response = await axios.put(
        `${backendUrl}/users/${userId}/update_profile`,
        {
          ...profileData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('Error updating profile:', error.message);
      throw error;
    }
  },
  
  deleteUser: async (userId) => {
    try {
      const token = getToken(); 
      const response = await axios.delete(`${backendUrl}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.clear('token');
      return response.data.data;
    } catch (error) {
      console.error('Error deleting user:', error.message);
      throw error;
    }
  },
};

export default userService;
