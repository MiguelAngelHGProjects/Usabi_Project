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

<<<<<<< HEAD
 changePassword: async (userId, currentPassword, newPassword, confirmPassword) => {
=======
  changePassword: async (userId, currentPassword, newPassword, confirmPassword) => {
>>>>>>> d67acd56e14dce37ef765946cdb05696a50688e8
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
<<<<<<< HEAD
=======

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
>>>>>>> d67acd56e14dce37ef765946cdb05696a50688e8
};

export default userService;
