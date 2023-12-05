import React, { useState } from 'react';
import { Card, Button, Spin } from 'antd';
import { format } from 'date-fns';
import './style.css';
const ProjectCard = ({ project, onDelete }) => {
  const [imageLoading, setImageLoading] = useState(true);

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
      <p>{startDate} - {endDate}</p>
      <Button className="delete-button" onClick={onDelete} style={{ marginTop: '8px' }}>
        Borrar Proyecto
      </Button>
    </Card>
  );
};

export default ProjectCard;

