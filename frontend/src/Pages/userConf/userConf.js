import React, { useEffect, useState } from 'react';
import { Card, Spin, Avatar, Descriptions, Form, Input, Button, message } from 'antd';
import userService from '../../services/user.services';
import './styles.css';
import Header from '../../components/header/header';

function Userconf() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
  
    const handleChangePassword = async (values) => {
      try {
        const userId = userData?.id; // Obtén el ID del usuario de userData
        if (!userId) {
          console.error('User ID not found.');
          return;
        }
  
        await userService.changePassword(
          userId,
          values.currentPassword,
          values.newPassword,
          values.confirmPassword
        );
        message.success('Password changed successfully!');
        form.resetFields();
      } catch (error) {
        console.error('Error changing password:', error);
        message.error('Error changing password. Please try again.');
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await userService.getUserData();
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div>
      <Header title={userData?.name} />
      <Card>
        {loading ? (
          <Spin />
        ) : (
          <div>
            <div className="userconf-container">
            <Header title={userData?.name} />
            <Card>
                {loading ? (
                    <Spin />
                ) : (
                    <div>
                        <Avatar size={100} src={userData?.icon} />
                        <Descriptions title="User Info" bordered column={1}>
                            <Descriptions.Item label="Name,lastname" >{userData?.name} {userData?.lastname}</Descriptions.Item>
                            <Descriptions.Item label="Email">{userData?.email}</Descriptions.Item>
                            <Descriptions.Item label="User Type">{userData?.user_type}</Descriptions.Item>
                        </Descriptions>
                    </div>
                )}
            </Card>
        </div>
            <Form form={form} onFinish={handleChangePassword} layout="vertical">
              <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[{ required: true, message: 'Please enter your current password' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[{ required: true, message: 'Please enter a new password' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your new password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('The two passwords do not match');
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Userconf;
