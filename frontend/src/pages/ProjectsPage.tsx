import React, { useState, useEffect } from 'react';
import '../styles/ProjectsPage.css';
import estimationService from '../services/estimationService';

interface Project {
  id: number;
  total_area: number;
  build_quality: string;
  estimated_cost: number;
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const data = await estimationService.getEstimations();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('Could not load your estimations. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);

  return (
    <div className="projects-container">
      <h2>Your Saved Estimations</h2>

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      ) : projects.length === 0 ? (
        <p className="empty-message">You have no saved estimations yet.</p>
      ) : (
        <div className="projects-list">
          {projects.map((project, index) => (
            <React.Fragment key={project.id}>
              <div className="project-card">
                <div className="project-row">
                  <span className="label">Project Type:</span>
                  <span className="value">{project.build_quality}</span>
                </div>
                <div className="project-row">
                  <span className="label">Total Area:</span>
                  <span className="value">{project.total_area} m²</span>
                </div>
                <div className="project-row">
                  <span className="label">Estimated Cost:</span>
                  <span className="value cost">{formatCurrency(project.estimated_cost)}</span>
                </div>
              </div>
              {index < projects.length - 1 && <hr className="divider" />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
