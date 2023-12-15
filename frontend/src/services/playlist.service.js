import axios from 'axios';

const backendUrl = 'http://localhost:4000';

const playlistService = {
  getAllPlaylists: async () => {
    try {
      const response = await axios.get(`${backendUrl}/playlists`);
      return response.data;
    } catch (error) {
      console.error('Error getting playlists:', error);
      throw error;
    }
  },

  getPlaylistById: async (playlistId) => {
    try {
      const response = await axios.get(`${backendUrl}/playlists/${playlistId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting playlist with ID ${playlistId}:`, error);
      throw error;
    }
  },

  createPlaylist: async (formData) => {
    try {
      const response = await axios.post(`${backendUrl}/playlists`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating playlist:', error.response.data);
      throw error;
    }
  },

  updatePlaylist: async (playlistId, playlistData) => {
    try {
      const response = await axios.put(`${backendUrl}/playlists/${playlistId}`, playlistData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating playlist with ID ${playlistId}:`, error);
      throw error;
    }
  },

  deletePlaylist: async (playlistId) => {
    try {
      const response = await axios.delete(`${backendUrl}/playlists/${playlistId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting playlist with ID ${playlistId}:`, error);
      throw error;
    }
  },
};

export default playlistService;
