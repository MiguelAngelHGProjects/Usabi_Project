import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userProjectsService from '../services/user_projects.service';
import dashboardService from '../services/dashboard.service';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import "./style.css";

const UserProjectForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [userProjects, setUserProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await dashboardService.getUserDetails();

        if (!userDetails || !userDetails.data) {
          navigate('/');
          return;
        }

        setUser(userDetails);

        const usersResponse = await userProjectsService.getUsers();
        const projectsData = await userProjectsService.getProjects();

        if (Array.isArray(usersResponse.data)) {
          setUsers(usersResponse.data);
        } else {
          setError('La respuesta del servidor para usuarios no es un array.');
        }

        if (Array.isArray(projectsData)) {
          setProjects(projectsData);
        } else {
          setError('La respuesta del servidor para proyectos no es un array.');
        }
      } catch (error) {
        setError('Error fetching initial data: ' + error.message);
      }
    };

    fetchData();
  }, [navigate]);

  const fetchUserProjects = async () => {
    try {
      const userProjectsData = await userProjectsService.getUserProjects();
      console.log('User Projects Data:', userProjectsData);

      // Mapea los datos para obtener información detallada de usuario y proyecto
      const detailedUserProjects = await Promise.all(
        userProjectsData.map(async (userProject) => {
          try {
            // Obtener el nombre del usuario y el proyecto usando las ID proporcionadas
            const [user, projectDetails] = await Promise.all([
              userProjectsService.getUserById(userProject.user_id),
              userProjectsService.getProjectById(userProject.project_id),
            ]);

            console.log('User Details:', user);
            console.log('Project Details:', projectDetails);

            return {
              id: userProject.id,
              name: user.data.name,
              Season: projectDetails.Season,
              createdAt: userProject.created_at,
              updatedAt: userProject.updated_at,
            };
          } catch (error) {
            console.error('Error fetching user or project details:', error);
            throw error;
          }
        })
      );

      setUserProjects(detailedUserProjects);
    } catch (error) {
      // Manejar errores al obtener proyectos de usuario
      console.error('Error fetching user projects:', error);
      setError('Error fetching user projects: ' + error.message);
    }
  };

  useEffect(() => {
    if (user && user.data) {
      fetchUserProjects();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userDetails = await dashboardService.getUserDetails();

      if (!userDetails || !userDetails.data) {
        navigate('/');
        return;
      }

      await userProjectsService.createAdminUserProject({
        user_id: selectedUser,
        project_id: selectedProject,
      }, userDetails);

      setSelectedUser('');
      setSelectedProject('');
      fetchUserProjects();
    } catch (error) {
      setError('Error creating user project: ' + error.message);
    }
  };
  const deleteUserProject = async (projectId) => {
    try {
      // Lógica para eliminar el proyecto de usuario con el projectId
      await userProjectsService.deleteUserProject(projectId);

      // Actualizar la lista de proyectos de usuario después de la eliminación
      fetchUserProjects();
    } catch (error) {
      setError('Error deleting user project: ' + error.message);
    }
  };

  return (
    <>
      <div className="rel-container">
        <div className="header">
          <Header title="Relaciones" />
        </div>
        <div>
          <form onSubmit={handleSubmit} className="rel-form" aria-labelledby="form-title">
            <label className='form-labels' htmlFor="user-select">
              <h3>Usuarios :</h3>
              <select
                id="user-select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="input-field"
                aria-required="true"
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

            <label className='form-labels' htmlFor="project-select">
              <h3>Proyectos:</h3>
              <select
                id="project-select"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="input-field"
                aria-required="true"
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

        <div className='showUserProjects' aria-live="polite" aria-atomic="true" role="status">
          <h3>Proyectos de Usuario:</h3>
          {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}
          <ul>
            {userProjects.map((userProject) => (
              <li key={userProject.id}>
                <strong>Usuario:</strong> {userProject.name} <strong>Proyecto:</strong> {userProject.Season}
                <button onClick={() => deleteUserProject(userProject.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Footer image={user && user.data.icon} />
      </div>
    </>
  );
};

export default UserProjectForm;
