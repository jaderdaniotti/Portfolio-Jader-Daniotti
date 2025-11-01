import React from 'react';

// Configurazione Umami API
const UMAMI_CONFIG = {
  apiKey: 'api_pNPWLJDfNfBusGp5caLlgnYUJGtYbT2h',
  websiteId: 'Hv1uHdpcZObOcURY', // Dal tuo iframe esistente
  baseUrl: 'https://cloud.umami.is/api'
};

// Funzione per recuperare le statistiche da Umami
export const getUmamiStats = async (dateRange = '30d') => {
  try {
    const response = await fetch(`${UMAMI_CONFIG.baseUrl}/websites/${UMAMI_CONFIG.websiteId}/stats?startAt=${getStartDate(dateRange)}&endAt=${getEndDate()}`, {
      headers: {
        'Authorization': `Bearer ${UMAMI_CONFIG.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Errore nel recupero statistiche Umami:', error);
    return null;
  }
};

// Funzione per recuperare le pagine più visitate
export const getTopPages = async (dateRange = '30d') => {
  try {
    const response = await fetch(`${UMAMI_CONFIG.baseUrl}/websites/${UMAMI_CONFIG.websiteId}/pageviews?startAt=${getStartDate(dateRange)}&endAt=${getEndDate()}`, {
      headers: {
        'Authorization': `Bearer ${UMAMI_CONFIG.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Errore nel recupero pagine Umami:', error);
    return null;
  }
};

// Funzione per recuperare i referrers
export const getReferrers = async (dateRange = '30d') => {
  try {
    const response = await fetch(`${UMAMI_CONFIG.baseUrl}/websites/${UMAMI_CONFIG.websiteId}/referrers?startAt=${getStartDate(dateRange)}&endAt=${getEndDate()}`, {
      headers: {
        'Authorization': `Bearer ${UMAMI_CONFIG.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Errore nel recupero referrers Umami:', error);
    return null;
  }
};

// Funzione per recuperare gli eventi personalizzati
export const getCustomEvents = async (dateRange = '30d') => {
  try {
    const response = await fetch(`${UMAMI_CONFIG.baseUrl}/websites/${UMAMI_CONFIG.websiteId}/events?startAt=${getStartDate(dateRange)}&endAt=${getEndDate()}`, {
      headers: {
        'Authorization': `Bearer ${UMAMI_CONFIG.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Errore nel recupero eventi Umami:', error);
    return null;
  }
};

// Funzioni helper per le date
const getStartDate = (range) => {
  const now = new Date();
  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
  const startDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
  return Math.floor(startDate.getTime() / 1000);
};

const getEndDate = () => {
  return Math.floor(Date.now() / 1000);
};

// Funzione per inviare eventi a Umami
export const trackEvent = async (eventName, eventData = {}) => {
  // Usa il metodo nativo di Umami se disponibile
  if (window.umami && typeof window.umami.track === 'function') {
    try {
      window.umami.track(eventName, eventData);
      return;
    } catch (error) {
      // Fallback all'API se il metodo nativo fallisce
      if (import.meta.env.DEV) {
        console.warn('Umami native tracking failed, falling back to API:', error);
      }
    }
  }

  // Altrimenti, usa l'API
  try {
    const payload = {
      website: UMAMI_CONFIG.websiteId,
      hostname: window.location.hostname,
      url: window.location.pathname,
      referrer: document.referrer,
      title: document.title,
      event_type: 'event',
      event_name: eventName,
      event_data: JSON.stringify(eventData)
    };

    const response = await fetch(`${UMAMI_CONFIG.baseUrl}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${UMAMI_CONFIG.apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      // Logga solo in sviluppo
      if (import.meta.env.DEV) {
        console.warn('Umami tracking failed:', response.status);
      }
    }
  } catch (error) {
    // Logga solo in sviluppo
    if (import.meta.env.DEV) {
      console.warn('Umami tracking error:', error);
    }
  }
};

// Funzione per tracciare page views (disabilitata se lo script tag Umami è già presente)
export const trackPageView = async () => {
  // Se lo script tag Umami è già presente, non tracciare manualmente per evitare duplicati
  if (window.umami && typeof window.umami.track === 'function') {
    // Usa il metodo nativo di Umami se disponibile
    window.umami.track(window.location.pathname);
    return;
  }

  // Altrimenti, prova il metodo API (solo in caso di necessità)
  try {
    const payload = {
      website: UMAMI_CONFIG.websiteId,
      hostname: window.location.hostname,
      url: window.location.pathname,
      referrer: document.referrer,
      title: document.title
    };

    const response = await fetch(`${UMAMI_CONFIG.baseUrl}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${UMAMI_CONFIG.apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      // Silenzia l'errore se lo script tag è già presente (tracking automatico)
      if (response.status === 400 && window.umami) {
        return; // Lo script tag già traccia, non serve loggare l'errore
      }
      // Logga solo se è un errore diverso o se non c'è lo script tag
      if (import.meta.env.DEV) {
        console.warn('Umami page view tracking failed:', response.status);
      }
    }
  } catch (error) {
    // Silenzia gli errori se lo script tag è già presente
    if (!window.umami && import.meta.env.DEV) {
      console.warn('Umami page view tracking error:', error);
    }
  }
};

// Hook per tracciare automaticamente le page views (disabilitato se lo script tag è presente)
export const useUmamiTracking = () => {
  React.useEffect(() => {
    // Se lo script tag Umami è già presente, non tracciare manualmente
    // Lo script tag gestisce automaticamente il tracking delle page views
    if (window.umami && typeof window.umami.track === 'function') {
      return; // Esci senza configurare il tracking manuale
    }

    // Altrimenti, usa il tracking manuale
    trackPageView();

    // Traccia quando cambia la route (per SPA) - solo se non c'è lo script tag
    const handleRouteChange = () => {
      setTimeout(() => {
        if (!window.umami || typeof window.umami.track !== 'function') {
          trackPageView();
        }
      }, 100);
    };

    // Listener per cambiamenti di route
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);
};

// Eventi specifici per il portfolio
export const portfolioEvents = {
  // Eventi di navigazione
  navigateToSection: (section) => trackEvent('navigation', { section }),
  
  // Eventi di interazione con progetti
  viewProject: (projectId, projectTitle) => trackEvent('project_view', { 
    project_id: projectId, 
    project_title: projectTitle 
  }),
  
  // Eventi di contatto
  contactFormSubmit: () => trackEvent('contact_form_submit'),
  
  // Eventi di download/CV
  downloadCV: () => trackEvent('cv_download'),
  
  // Eventi di competenze
  viewSkills: (category) => trackEvent('skills_view', { category }),
  
  // Eventi admin
  adminLogin: () => trackEvent('admin_login'),
  adminLogout: () => trackEvent('admin_logout'),
  
  // Eventi di performance
  pageLoadTime: (loadTime) => trackEvent('performance', { 
    metric: 'page_load_time', 
    value: loadTime 
  })
};

export default UMAMI_CONFIG;
