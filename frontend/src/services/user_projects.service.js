import axios from 'axios';

const backendUrl = 'http://localhost:4000';

const userProjectsService = {
  
  // Función para obtener todos los proyectos de usuario
  getUserProjects: async () => {
    try {
      const response = await axios.get(`${backendUrl}/user_projects`);
      return response.data;
    } catch (error) {
      console.error('Error getting user projects:', error);
      throw error;
    }
  },

  // Función para obtener un proyecto específico de usuario por su ID
  getUserProjectById: async (userProjectId) => {
    try {
      const response = await axios.get(`${backendUrl}/user_projects/${userProjectId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting user project with ID ${userProjectId}:`, error);
      throw error;
    }
  },

  // Función para crear un nuevo proyecto de usuario
  createUserProject: async (userProjectData) => {
    try {
      const response = await axios.post(`${backendUrl}/user_projects`, userProjectData);
      return response.data;
    } catch (error) {
      console.error('Error creating user project:', error);
      throw error;
    }
  },

  // Función para crear un nuevo proyecto de usuario con verificación de usuario admin
  createAdminUserProject: async (userProjectData, user) => {
    try {
      // Verifica si el usuario es admin antes de crear la relación user_project
      if (user && user.data && user.data.user_type === 'admin') {
        const response = await axios.post(`${backendUrl}/user_projects`, userProjectData);
        return response.data;
      } else {
        console.log('Usuario no autorizado para crear la relación user_project');
        throw new Error('Unauthorized user');
      }
    } catch (error) {
      console.error('Error creating user project:', error);
      throw error;
    }
  },

  // Función para actualizar un proyecto de usuario existente
  updateUserProject: async (userProjectId, userProjectData) => {
    try {
      const response = await axios.put(`${backendUrl}/user_projects/${userProjectId}`, userProjectData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user project with ID ${userProjectId}:`, error);
      throw error;
    }
  },

  // Función para borrar un proyecto de usuario
  deleteUserProject: async (userProjectId) => {
    try {
      const response = await axios.delete(`${backendUrl}/user_projects/${userProjectId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user project with ID ${userProjectId}:`, error);
      throw error;
    }
  },
  getUsers: async () => {
    try {
      const response = await axios.get(`${backendUrl}/users`);
      return response.data;
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  },

  // Función para obtener todos los proyectos
  getProjects: async () => {
    try {
      const response = await axios.get(`${backendUrl}/projects`);
      return response.data;
    } catch (error) {
      console.error('Error getting projects:', error);
      throw error;
    }
  },
};

export default userProjectsService;
