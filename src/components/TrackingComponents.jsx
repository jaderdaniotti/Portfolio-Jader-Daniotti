import React from 'react';
import { portfolioEvents } from '../utils/umami';

// Componente per tracciare le visualizzazioni dei progetti
export const ProjectTracker = ({ projectId, projectTitle, children }) => {
  const handleProjectView = () => {
    portfolioEvents.viewProject(projectId, projectTitle);
  };

  return (
    <div onClick={handleProjectView}>
      {children}
    </div>
  );
};

// Componente per tracciare la navigazione tra sezioni
export const SectionTracker = ({ section, children }) => {
  const handleSectionView = () => {
    portfolioEvents.navigateToSection(section);
  };

  return (
    <div onClick={handleSectionView}>
      {children}
    </div>
  );
};

// Componente per tracciare le visualizzazioni delle competenze
export const SkillsTracker = ({ category, children }) => {
  const handleSkillsView = () => {
    portfolioEvents.viewSkills(category);
  };

  return (
    <div onClick={handleSkillsView}>
      {children}
    </div>
  );
};

// Hook per tracciare il tempo di caricamento delle pagine
export const usePageLoadTracking = () => {
  React.useEffect(() => {
    const startTime = performance.now();
    
    const handleLoad = () => {
      const loadTime = Math.round(performance.now() - startTime);
      portfolioEvents.pageLoadTime(loadTime);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);
};

export default {
  ProjectTracker,
  SectionTracker,
  SkillsTracker,
  usePageLoadTracking
};
