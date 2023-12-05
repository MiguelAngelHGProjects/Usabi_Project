import React, { useState, useEffect } from 'react';
import { Card, Button, Spin, Modal, Form, Input, DatePicker, Select } from 'antd';
import { format } from 'date-fns';
import './style.css';
import playlistService from '../../services/playlist.service';

const ProjectCard = ({ project, onDelete, onUpdate }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateForm] = Form.useForm();
  const [playlists, setPlaylists] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlistsData = await playlistService.getAllPlaylists();
        setPlaylists(playlistsData);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  const showUpdateModal = () => {
    setUpdateModalVisible(true);
    updateForm.setFieldsValue({
      PlaylistId: project.PlaylistId,
      Season: project.Season,
      ProjectNote: project.ProjectNote,
      Projectrevision: project.Projectrevision,
    });
  };

  const handleUpdate = async () => {
    try {
      const values = await updateForm.validateFields();
      onUpdate(values);
      setUpdateModalVisible(false);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleUpdateCancel = () => {
    setUpdateModalVisible(false);
  };

  if (!project) {
    return <p>Error: No project data available</p>;
  }

  const cleanSeason = project.Season.trim();
  const startDate = project.project_date_ini ? format(new Date(project.project_date_ini), 'yyyy-MM-dd') : 'N/A';
  const endDate = project.project_date_end ? format(new Date(project.project_date_end), 'yyyy-MM-dd') : 'N/A';

  const imageUrl = project.projectImage_data && project.projectImage_data.url ? project.projectImage_data.url : null;

  return (
    <Card title={cleanSeason} style={{ margin: '16px 0' }}>
      {imageUrl ? (
        <Spin spinning={imageLoading} tip="Cargando...">
          <div style={{ textAlign: 'center' }}>
            <img
              src={imageUrl}
              alt="Project"
              style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                console.error('Error loading image:', imageUrl);
                setImageLoading(false);
              }}
            />
          </div>
        </Spin>
      ) : (
        <p>No hay imagen disponible</p>
      )}
      <p>{project.ProjectNote}</p>
      <p>
        {startDate} - {endDate}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
        <Button className="delete-button" onClick={onDelete}>
          Borrar Proyecto
        </Button>
        <Button type="primary" onClick={showUpdateModal} className="update-button">
          Actualizar Proyecto
        </Button>
      </div>
      <Modal
        title="Actualizar Proyecto"
        visible={updateModalVisible}
        onOk={handleUpdate}
        onCancel={handleUpdateCancel}
      >
        <Form form={updateForm} name="updateProjectForm">
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
            <DatePicker.RangePicker />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ProjectCard;
