import axios from 'axios';

const backendUrl = 'http://localhost:4000';

const projectsService = {
  
  getProjects: async () => {
    try {
      const response = await axios.get(`${backendUrl}/projects`);
      return response.data;
    } catch (error) {
      console.error('Error getting projects:', error);
      throw error;
    }
  },

  getProjectById: async (projectId) => {
    try {
      const response = await axios.get(`${backendUrl}/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting project with ID ${projectId}:`, error);
      throw error;
    }
  },

  createProject: async (formData) => {
    try {
      const response = await axios.post(`${backendUrl}/projects`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating project:', error.response.data);
      throw error;
    }
  },

  updateProject: async (projectId, projectData) => {
    try {
      const response = await axios.put(`${backendUrl}/projects/${projectId}`, projectData);
      return response.data;
    } catch (error) {
      console.error(`Error updating project with ID ${projectId}:`, error);
      throw error;
    }
  },

  deleteProject: async (projectId) => {

    try {
      const response = await axios.delete(`${backendUrl}/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting project with ID ${projectId}:`, error);
      throw error;
    }
  },

  
};

export default projectsService;
