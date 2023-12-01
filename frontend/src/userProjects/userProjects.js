import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, Button, Form, message } from 'antd';
import userProjectsService from '../services/user_projects.service';
import dashboardService from '../services/dashboard.service';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './style.css';

const { Option } = Select;

const UserProjectForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
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

      const detailedUserProjects = await Promise.all(
        userProjectsData.map(async (userProject) => {
          try {
            const [user, projectDetails] = await Promise.all([
              userProjectsService.getUserById(userProject.user_id),
              userProjectsService.getProjectById(userProject.project_id),
            ]);

            return {
              id: userProject.id,
              name: user.data.name,
              lastname: user.data.lastname,
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
      console.error('Error fetching user projects:', error);
      setError('Error fetching user projects: ' + error.message);
    }
  };

  useEffect(() => {
    if (user && user.data) {
      fetchUserProjects();
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const userDetails = await dashboardService.getUserDetails();

      if (!userDetails || !userDetails.data) {
        navigate('/');
        return;
      }

      await userProjectsService.createAdminUserProject(
        {
          user_id: selectedUser,
          project_id: selectedProject,
        },
        userDetails
      );

      form.resetFields();
      fetchUserProjects();
    } catch (error) {
      setError('Error creating user project: ' + error.message);
    }
  };

  const deleteUserProject = async (projectId) => {
    try {
      await userProjectsService.deleteUserProject(projectId);
      fetchUserProjects();
      message.success('Proyecto eliminado exitosamente.');
    } catch (error) {
      setError('Error deleting user project: ' + error.message);
      message.error('Error al eliminar el proyecto de usuario.');
    }
  };

  return (
    <>
      <div className="rel-container">
        <div className="header">
          <Header title="Relaciones" />
        </div>
        <div>
          <Form
            form={form}
            onFinish={handleSubmit}
            className="rel-form"
            layout="vertical"
            initialValues={{
              userSelect: '',
              projectSelect: '',
            }}
          >
            <Form.Item
              label={<h3>Usuarios :</h3>}
              name="userSelect"
              rules={[{ required: true, message: 'Seleccione un usuario' }]}
              className="form-labels"
            >
              <Select
                placeholder="Seleccionar usuario"
                value={selectedUser}
                onChange={(value) => setSelectedUser(value)}
                style={{ width: '98%' }}
              >
                {users.map((user) => (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={<h3>Proyectos:</h3>}
              name="projectSelect"
              rules={[{ required: true, message: 'Seleccione un proyecto' }]}
              className="form-labels"
            >
              <Select
                placeholder="Seleccionar proyecto"
                value={selectedProject}
                onChange={(value) => setSelectedProject(value)}
                style={{ width: '98%' }}
              >
                {projects.map((project) => (
                  <Option key={project.id} value={project.id}>
                    {project.Season}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item className='form-btn'>
              <Button type="primary" htmlType="submit" className="form-btn">
                Crear Relación
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="showUserProjects" aria-live="polite" aria-atomic="true" role="status">
          <h3>Proyectos de Usuario:</h3>
          {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}
          <ul>
            {userProjects.map((userProject) => (
              <li key={userProject.id}>
                <strong>Usuario:</strong> {userProject.name} {userProject.lastname} <strong>Proyecto:</strong> {userProject.Season}
                <Button className="delete-button" onClick={() => deleteUserProject(userProject.id)}>
                  Eliminar
                </Button>
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
