import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form, Input, DatePicker, Upload, message, notification, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProjectCard from '../../components/Projects/projectCard';
import projectsService from '../../services/projects.service';
import playlistService from '../../services/playlist.service';
import './style.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import dashboardService from '../../services/dashboard.service';

const { RangePicker } = DatePicker;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [imageLoading, setImageLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await dashboardService.getUserDetails();
        setUser(userDetails);

        if (userDetails.data.user_type === 'admin') {
          const projectsData = await projectsService.getProjects();
          const playlistsData = await playlistService.getAllPlaylists();

          setProjects(projectsData);
          setPlaylists(playlistsData);
        } else {
          console.log('Este usuario no es un administrador. Puedes personalizar la lógica aquí.');
        }
      } catch (error) {
        console.error('Error fetching data in Dashboard:', error);
      }
    };

    const token = localStorage.getItem('token');

    if (token) {
      fetchData();
    } else {
      console.error('No token found in Dashboard. Handle as needed.');
    }
  }, []);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (!values.dateRange || values.dateRange.length !== 2) {
        throw new Error('Por favor, selecciona un rango de fechas válido.');
      }

      const formData = new FormData();

      formData.append('project[playlist_id]', values.PlaylistId);
      formData.append('project[Season]', values.Season);
      formData.append('project[ProjectNote]', values.ProjectNote);
      formData.append('project[Projectrevision]', values.Projectrevision);

      formData.append(
        'project[projectDateRange]',
        values.dateRange.map(date => date.format('YYYY-MM-DD')).join(' to ')
      );

      if (values.projectImage.fileList && values.projectImage.fileList.length > 0) {
        const file = values.projectImage.fileList[0].originFileObj;
        formData.append('project[projectImage]', file);
      }

      await projectsService.createProject(formData);

      form.resetFields();
      setOpen(false);
      setImageLoading(false);
      message.success('Proyecto creado exitosamente');

      const updatedProjects = await projectsService.getProjects();
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error creating project:', error.message);
      setImageLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
    setImageLoading(false);
  };

  const handleDelete = async projectId => {
    try {
      await projectsService.deleteProject(projectId);
      setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const updateProject = async (projectId, projectData) => {
    try {
      await projectsService.updateProject(projectId, { ...projectData, playlist_id: projectData.PlaylistId });
      notification.success({
        message: 'Proyecto actualizado',
        description: 'El proyecto se ha actualizado correctamente.'
      });

      const updatedProjects = await projectsService.getProjects();
      setProjects(updatedProjects);
    } catch (error) {
      notification.error({
        message: 'Error al actualizar el proyecto',
        description: 'Hubo un error al intentar actualizar el proyecto.'
      });

      console.error(`Error updating project with ID ${projectId}:`, error);
    }
  };

  const handleUpdate = async (projectId, updatedData) => {
    try {
      await updateProject(projectId, updatedData);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const uploadProps = {
    beforeUpload: file => {
      form.setFieldsValue({ projectImage: file });
      setImageLoading(true);
      return false;
    },
    onChange: info => {
      if (info.file.status === 'done' || info.file.status === 'error') {
        setImageLoading(false);
      }
    },
    onError: error => {
      console.error('Error uploading image:', error);
      setImageLoading(false);
      message.error('Error al cargar la imagen del proyecto');
    }
  };

  return (
    <div className="dashboard-container">
      <div>
        <Header title="Proyectos" />
      </div>
      <div className="primary-container">
        {user && user.data.user_type === 'admin' && (
          <>
            <Button type="primary" onClick={showModal} style={{ marginLeft: '16px' }} disabled={imageLoading}>
              Crear Proyecto
            </Button>
            {projects.length === 0 ? (
              <p>No hay proyectos disponibles.</p>
            ) : (
              projects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={() => handleDelete(project.id)}
                  onUpdate={updatedData => handleUpdate(project.id, updatedData)}
                />
              ))
            )}

            <Modal title="Crear Nuevo Proyecto" visible={open} onOk={handleOk} onCancel={handleCancel}>
              <Form form={form} name="createProjectForm">
                <Form.Item
                  name="projectImage"
                  label="Imagen del Proyecto"
                  rules={[{ required: true, message: 'Por favor, sube la imagen del proyecto' }]}
                >
                  <Upload {...uploadProps} accept=".png, .jpg, .jpeg">
                    <Button icon={<PlusOutlined />} />
                  </Upload>
                </Form.Item>
                <Form.Item
                  name="PlaylistId"
                  label="Playlist ID"
                  rules={[{ required: true, message: 'Por favor, selecciona una Playlist' }]}
                >
                  <Select placeholder="Selecciona una Playlist">
                    {playlists.map(playlist => (
                      <Option key={playlist.id} value={playlist.id}>
                        {playlist.WorkName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="Season"
                  label="Season"
                  rules={[{ required: true, message: 'Por favor, ingresa la temporada' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="ProjectNote"
                  label="Project Note"
                  rules={[{ required: true, message: 'Por favor, ingresa la nota del proyecto' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="Projectrevision"
                  label="Revisión del Proyecto"
                  rules={[{ required: true, message: 'Por favor, ingresa la revisión del proyecto' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="dateRange"
                  label="Date Range"
                  rules={[{ required: true, message: 'Por favor, selecciona el rango de fechas' }]}
                >
                  <RangePicker />
                </Form.Item>
              </Form>
            </Modal>
          </>
        )}
        {!user && <Link to="/" />}
      </div>
      <div>
        <Footer image={user && user.data.icon} />
      </div>
    </div>
  );
};

export default Dashboard;
