import React, { useEffect, useState } from 'react';
import { Card, Spin, Avatar, Descriptions } from 'antd';
import userService from '../../services/user.services';
import './styles.css';
import Header from '../../components/header/header';

function Userconf() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

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
    );
}

export default Userconf;