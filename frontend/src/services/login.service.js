import axios from 'axios';
const backendUrl = 'http://localhost:4000';

const setToken = (token) => {
  localStorage.setItem('token', token);
}

const loginService = {
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
      if (error.response && error.response.status === 401) {
        // Puedes lanzar un error personalizado o devolver un código de error específico.
        throw new Error('Invalid credentials');
      } else {
        // Otros casos de error
        throw error;
      }
    }
  },

  logout: async () => {
    try {
      const response = await axios.delete(`${backendUrl}/logout`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default loginService;
