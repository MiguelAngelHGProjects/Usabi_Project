import React, { useState, useEffect } from 'react';
import userProjectsService from '../services/user_projects.service';
import dashboardService from '../services/dashboard.service';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import "./style.css"
const UserProjectForm = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener la lista de usuarios y proyectos al cargar el componente
        const usersResponse = await userProjectsService.getUsers();
        const projectsData = await userProjectsService.getProjects();
        const userDetails = await dashboardService.getUserDetails();
        setUser(userDetails);
        // Verificar que la respuesta del servidor sea un array
        if (Array.isArray(usersResponse.data)) {
          setUsers(usersResponse.data);
        } else {
          console.error('La respuesta del servidor para usuarios no es un array:', usersResponse.data);
        }
  
        if (Array.isArray(projectsData)) {
          setProjects(projectsData);
        } else {
          console.error('La respuesta del servidor para proyectos no es un array:', projectsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Obtener la información del usuario del estado
      const userDetails = await dashboardService.getUserDetails();
  
      // Crear la relación user_project con la verificación de usuario admin
      await userProjectsService.createAdminUserProject({
        user_id: selectedUser,
        project_id: selectedProject,
      }, userDetails);  
      // Limpiar la selección después de enviar el formulario
      setSelectedUser('');
      setSelectedProject('');
    } catch (error) {
      console.error('Error creating user project:', error);
    }
  };

  return (
    <>
      <div className="rel-container">
        <div className="header">
          <Header title="Relaciones" />
        </div>
        <div className="rel-form">
          <form onSubmit={handleSubmit}>
            <label className='form-labels'>
              Usuario:
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="input-field"
              >
                <option value="">Seleccionar usuario</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>

            <br />

            <label className='form-labels'>
              Proyecto:
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="input-field"
              >
                <option value="">Seleccionar proyecto</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.Season}
                  </option>
                ))}
              </select>
            </label>

            <br />

            <button type="submit" className="login-btn">
              Crear Relación
            </button>
          </form>
        </div>
      </div>
      <div>
        <Footer image={user && user.data.icon} />
      </div>
    </>
  );
};

export default UserProjectForm;
