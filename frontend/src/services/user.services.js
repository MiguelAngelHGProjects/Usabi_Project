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

  changePassword: async (userId, currentPassword, newPassword, confirmPassword) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage.');
      }

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
      console.error('Error changing password:', error);
      throw error;
    }
  },

  updateProfile: async (userId, profileData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage.');
      }

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
      console.error('Error updating profile:', error);
      throw error;
    }
  },
};

export default userService;
