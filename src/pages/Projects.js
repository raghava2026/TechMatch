import React from 'react';
import '../styles/Pages.css';

const projectsList = [
  'Digital Marketing',
  'Infrastructure Architecture & Web Design',
  'Database & Management Systems (for business partners)',
  'Brand Marketing',
  'School Campaign Support',
  'Foreign Trips',
  'Startup Support',
  'Poster & Creative Design',
];

const Projects = () => {
  return (
    <div className="page-container projects-page">
      <section className="content-section">
        <h1 id="projects-heading">Projects & Business Services</h1>
        <p className="section-intro">We build projects and partner with businesses to deliver real outcomes.</p>

        <div className="services-grid" aria-labelledby="projects-heading">
          {projectsList.map((p, idx) => (
            <article key={p} className="service-card" role="article">
              <div className="service-header">
                <h3>{p}</h3>
              </div>
              <div className="service-body">
                <p>We provide tailored services for <strong>{p}</strong>. Contact us to learn about example cases.</p>
                <a href="#" className="cta-button" aria-label={`Example case for ${p}`}>Example Case</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
