import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Card, message } from 'antd';
import playlistService from '../../services/playlist.service';
import dashboardService from '../../services/dashboard.service';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import './styles.css';

const PlaylistComponent = () => {
  const [playlists, setPlaylists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPlaylists = async () => {
    try {
      const allPlaylists = await playlistService.getAllPlaylists();
      setPlaylists(allPlaylists);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await dashboardService.getUserDetails();
        setUser(userDetails);

        if (userDetails.data.user_type === 'admin') {
          fetchPlaylists();
        } else {
          // console.log('Este usuario no es un administrador.');
          fetchPlaylists();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchData();
    } else {
      console.error('No token found. Handle as needed.');
      setLoading(false);
    }
  }, []);

  const handleNewPlaylist = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditPlaylist = (playlistId) => {
    form.resetFields();
    const playlist = playlists.find((p) => p.id === playlistId);
    form.setFieldsValue(playlist);
    setModalVisible(true);
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await playlistService.deletePlaylist(playlistId);
      message.success('Playlist deleted successfully');
      fetchPlaylists();
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const playlistId = form.getFieldValue('id');

      if (playlistId) {
        await playlistService.updatePlaylist(playlistId, values);
        message.success('Playlist updated successfully');
      } else {
        await playlistService.createPlaylist(values);
        message.success('Playlist created successfully');
      }

      fetchPlaylists();
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving playlist:', error);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <div>
        <Header title="Playlists" />
      </div>
      <div className='playlist-container'>
        {user && user.data.user_type === 'admin' && (
          <Button type="primary" onClick={handleNewPlaylist} className='add-button'>
            New Playlist
          </Button>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            playlists.map((playlist) => (
              <Card
                className='playlist'
                key={playlist.id}
                style={{ width: 300, margin: 16 }}
                actions={[
                  user && user.data.user_type === 'admin' && (
                    <Button key="edit" onClick={() => handleEditPlaylist(playlist.id)} className='update-button'>
                      Edit
                    </Button>
                  ),
                  user && user.data.user_type === 'admin' && (
                    <Button key="delete" onClick={() => handleDeletePlaylist(playlist.id)} className='delete-button'>
                      Delete
                    </Button>
                  ),
                ]}
              >
                <div>
                  <h3 style={{ display: 'inline' }}>{playlist.WorkName}</h3>
                  <p style={{ marginLeft: 8, display: 'inline' }}>by {playlist.WorkAutor}</p>
                </div>
                <p>Playlist Order: {playlist.PlaylistOrder}</p>
              </Card>
            ))
          )}
        </div>
        <Modal
          title="Playlist Form"
          visible={modalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              name="PlaylistOrder"
              label="Playlist Order"
              rules={[{ required: true, message: 'Please enter Playlist Order!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="WorkAutor" label="Work Author">
              <Input />
            </Form.Item>
            <Form.Item
              name="WorkName"
              label="Work Name"
              rules={[{ required: true, message: 'Please enter Work Name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="WorkDuration"
              label="Work Duration"
              rules={[{ required: true, message: 'Please enter Work Duration!' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Footer image={user && user.data.icon} />
    </div>
  );
};

export default PlaylistComponent;
