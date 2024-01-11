import axios from 'axios';

const reportsService = async () => {
  try {
    const usabiDataEndpoint = 'http://127.0.0.1:4000/user_projects/usabi_data/';
    const response = await axios.get(usabiDataEndpoint);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Error en la solicitud. Código de estado:', response.status);
      throw new Error(`Error en la solicitud. Código de estado: ${response.status}`);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error.message);
    throw error;
  }
};

export default reportsService;
