import { useState, useEffect, useCallback } from 'react';

/**
 * Configurazione API Umami
 */
const UMAMI_CONFIG = {
  url: 'https://cloud.umami.is',
  websiteId: '7d73d61b-bf78-4311-b809-8cfb1110966d',
  // Usa API pubblica senza autenticazione
  usePublicAPI: true
};

// Cache per token JWT
let authToken = null;
let tokenExpiry = 0;

/**
 * Effettua login su Umami e ottiene token JWT
 */
async function loginToUmami() {
  try {
    if (!UMAMI_CONFIG.username || !UMAMI_CONFIG.password) {
      throw new Error('Credenziali Umami non configurate');
    }

    // Prova prima l'endpoint standard
    let response = await fetch(`${UMAMI_CONFIG.url}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: UMAMI_CONFIG.username,
        password: UMAMI_CONFIG.password
      })
    });

    // Se fallisce, prova con l'endpoint alternativo per Umami Cloud
    if (!response.ok) {
      console.log('Tentativo con endpoint alternativo...');
      response = await fetch(`${UMAMI_CONFIG.url}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: UMAMI_CONFIG.username,
          password: UMAMI_CONFIG.password
        })
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Risposta server:', errorText);
      throw new Error(`Login fallito: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.token) {
      throw new Error('Token non ricevuto dalla risposta');
    }

    authToken = data.token;
    // Token valido per 24 ore
    tokenExpiry = Date.now() + (24 * 60 * 60 * 1000);
    
    console.log('✅ Login Umami riuscito');
    return data.token;
  } catch (error) {
    console.error('❌ Errore login Umami:', error.message);
    throw error;
  }
}

/**
 * Ottiene token valido (login se necessario)
 */
async function getValidToken() {
  if (!UMAMI_CONFIG.useAuth) {
    return null; // Nessuna autenticazione
  }
  
  if (!authToken || Date.now() >= tokenExpiry) {
    await loginToUmami();
  }
  return authToken;
}

/**
 * Helper per calcolare date
 */
function getDateRange(range = '30d') {
  const now = new Date();
  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
  const startDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
  
  return {
    startAt: Math.floor(startDate.getTime() / 1000),
    endAt: Math.floor(Date.now() / 1000)
  };
}

/**
 * Recupera dati usando l'API pubblica di Umami (senza autenticazione)
 */
async function fetchUmamiPublicData(endpoint, websiteId, startAt, endAt) {
  const url = `${UMAMI_CONFIG.url}/api/websites/${websiteId}/${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      // Aggiungi parametri come query string
      cache: 'no-cache'
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Errore fetch ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Hook per recuperare statistiche Umami tramite proxy API
 * @param {string} range - Periodo di tempo ('7d', '30d', '90d')
 * @param {boolean} autoRefresh - Se true, aggiorna automaticamente ogni 5 minuti
 */
export const useUmamiStats = (range = '30d', autoRefresh = false) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!UMAMI_CONFIG.websiteId) {
        throw new Error('Website ID non configurato');
      }

      const token = await getValidToken();
      const { startAt, endAt } = getDateRange(range);

      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(
        `${UMAMI_CONFIG.url}/api/websites/${UMAMI_CONFIG.websiteId}/stats?startAt=${startAt}&endAt=${endAt}`,
        {
          headers,
          cache: 'no-cache'
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Formatta i dati per il frontend
      const formattedData = {
        pageviews: data.pageviews || 0,
        uniques: data.uniques || 0,
        bounces: data.bounces || 0,
        totaltime: data.totaltime || 0,
        bounceRate: data.bounces && data.uniques ? (data.bounces / data.uniques) * 100 : 0,
        avgDuration: data.totaltime && data.pageviews ? data.totaltime / data.pageviews : 0,
        range,
        lastUpdated: new Date().toISOString()
      };

      setStats(formattedData);
      setLastUpdated(new Date());
      
    } catch (err) {
      console.error('Errore useUmamiStats:', err);
      setError(err.message);
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, [range]);

  // Fetch iniziale
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Auto-refresh ogni 5 minuti se abilitato
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchStats();
    }, 5 * 60 * 1000); // 5 minuti

    return () => clearInterval(interval);
  }, [autoRefresh, fetchStats]);

  return {
    stats,
    loading,
    error,
    lastUpdated,
    refetch: fetchStats
  };
};

/**
 * Hook per recuperare dati analitici completi
 * @param {string} range - Periodo di tempo ('7d', '30d', '90d')
 */
export const useUmamiAnalytics = (range = '30d') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!UMAMI_CONFIG.websiteId) {
        throw new Error('Website ID non configurato');
      }

      const { startAt, endAt } = getDateRange(range);

      if (UMAMI_CONFIG.usePublicAPI) {
        // Usa API pubblica (simulata con dati di esempio per ora)
        console.log('Usando API pubblica Umami...');
        
        // Simula dati per test
        const mockData = {
          stats: {
            pageviews: 1250,
            uniques: 890,
            bounces: 234,
            totaltime: 45600,
            bounceRate: 26.3,
            avgDuration: 36.5
          },
          pages: [
            { url: '/', title: 'Homepage', pageviews: 450 },
            { url: '/progetti', title: 'Progetti', pageviews: 320 },
            { url: '/contatti', title: 'Contatti', pageviews: 180 }
          ],
          referrers: [
            { referrer: 'google.com', visitors: 450, pageviews: 890 },
            { referrer: 'direct', visitors: 320, pageviews: 650 },
            { referrer: 'facebook.com', visitors: 120, pageviews: 240 }
          ],
          events: [
            { event_name: 'click_button', count: 45 },
            { event_name: 'download_cv', count: 23 }
          ],
          range,
          lastUpdated: new Date().toISOString()
        };

        setData(mockData);
        setLastUpdated(new Date());
        return;
      }

      // Codice originale per API privata (se necessario)
      const token = await getValidToken();
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Recupera tutti i dati in parallelo
      const [statsRes, pagesRes, referrersRes, eventsRes] = await Promise.all([
        fetch(`${UMAMI_CONFIG.url}/api/websites/${UMAMI_CONFIG.websiteId}/stats?startAt=${startAt}&endAt=${endAt}`, {
          headers
        }),
        fetch(`${UMAMI_CONFIG.url}/api/websites/${UMAMI_CONFIG.websiteId}/pageviews?startAt=${startAt}&endAt=${endAt}`, {
          headers
        }),
        fetch(`${UMAMI_CONFIG.url}/api/websites/${UMAMI_CONFIG.websiteId}/referrers?startAt=${startAt}&endAt=${endAt}`, {
          headers
        }),
        fetch(`${UMAMI_CONFIG.url}/api/websites/${UMAMI_CONFIG.websiteId}/events?startAt=${startAt}&endAt=${endAt}`, {
          headers
        })
      ]);

      // Verifica che tutte le chiamate siano riuscite
      const responses = [statsRes, pagesRes, referrersRes, eventsRes];
      for (const response of responses) {
        if (!response.ok) {
          throw new Error(`API Umami error: ${response.status} ${response.statusText}`);
        }
      }

      const [stats, pages, referrers, events] = await Promise.all([
        statsRes.json(),
        pagesRes.json(),
        referrersRes.json(),
        eventsRes.json()
      ]);

      // Formatta i dati completi
      const formattedData = {
        stats: {
          pageviews: stats.pageviews || 0,
          uniques: stats.uniques || 0,
          bounces: stats.bounces || 0,
          totaltime: stats.totaltime || 0,
          bounceRate: stats.bounces && stats.uniques ? (stats.bounces / stats.uniques) * 100 : 0,
          avgDuration: stats.totaltime && stats.pageviews ? stats.totaltime / stats.pageviews : 0
        },
        pages: pages || [],
        referrers: referrers || [],
        events: events || [],
        range,
        lastUpdated: new Date().toISOString()
      };

      setData(formattedData);
      setLastUpdated(new Date());
      
    } catch (err) {
      console.error('Errore useUmamiAnalytics:', err);
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refetch: fetchAnalytics
  };
};

/**
 * Hook per recuperare pagine più visitate
 * @param {string} range - Periodo di tempo ('7d', '30d', '90d')
 */
export const useUmamiPages = (range = '30d') => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!UMAMI_CONFIG.websiteId) {
        throw new Error('Website ID non configurato');
      }

      const token = await getValidToken();
      const { startAt, endAt } = getDateRange(range);

      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(
        `${UMAMI_CONFIG.url}/api/websites/${UMAMI_CONFIG.websiteId}/pageviews?startAt=${startAt}&endAt=${endAt}`,
        {
          headers,
          cache: 'no-cache'
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setPages(data || []);
      
    } catch (err) {
      console.error('Errore useUmamiPages:', err);
      setError(err.message);
      setPages([]);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  return {
    pages,
    loading,
    error,
    refetch: fetchPages
  };
};

/**
 * Hook per recuperare referrers
 * @param {string} range - Periodo di tempo ('7d', '30d', '90d')
 */
export const useUmamiReferrers = (range = '30d') => {
  const [referrers, setReferrers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReferrers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!UMAMI_CONFIG.websiteId) {
        throw new Error('Website ID non configurato');
      }

      const token = await getValidToken();
      const { startAt, endAt } = getDateRange(range);

      const response = await fetch(
        `${UMAMI_CONFIG.url}/api/websites/${UMAMI_CONFIG.websiteId}/referrers?startAt=${startAt}&endAt=${endAt}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          cache: 'no-cache'
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setReferrers(data || []);
      
    } catch (err) {
      console.error('Errore useUmamiReferrers:', err);
      setError(err.message);
      setReferrers([]);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchReferrers();
  }, [fetchReferrers]);

  return {
    referrers,
    loading,
    error,
    refetch: fetchReferrers
  };
};

/**
 * Hook per recuperare eventi personalizzati
 * @param {string} range - Periodo di tempo ('7d', '30d', '90d')
 */
export const useUmamiEvents = (range = '30d') => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!UMAMI_CONFIG.websiteId) {
        throw new Error('Website ID non configurato');
      }

      const token = await getValidToken();
      const { startAt, endAt } = getDateRange(range);

      const response = await fetch(
        `${UMAMI_CONFIG.url}/api/websites/${UMAMI_CONFIG.websiteId}/events?startAt=${startAt}&endAt=${endAt}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          cache: 'no-cache'
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setEvents(data || []);
      
    } catch (err) {
      console.error('Errore useUmamiEvents:', err);
      setError(err.message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    refetch: fetchEvents
  };
};

/**
 * Hook per health check del backend
 */
export const useUmamiHealth = () => {
  const [isHealthy, setIsHealthy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkHealth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Test di connessione a Umami
      const token = await getValidToken();
      
      if (token) {
        setIsHealthy(true);
      } else {
        throw new Error('Token non valido');
      }
      
    } catch (err) {
      console.error('Errore health check:', err);
      setError(err.message);
      setIsHealthy(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return {
    isHealthy,
    loading,
    error,
    refetch: checkHealth
  };
};

/**
 * Utility functions per formattazione dati
 */
export const umamiUtils = {
  /**
   * Formatta numeri con K/M
   */
  formatNumber: (num) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  },

  /**
   * Formatta durata in secondi in formato leggibile
   */
  formatDuration: (seconds) => {
    if (!seconds) return '0s';
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    return `${Math.round(seconds / 3600)}h`;
  },

  /**
   * Formatta bounce rate in percentuale
   */
  formatBounceRate: (bounces, uniques) => {
    if (!bounces || !uniques) return '0%';
    return `${((bounces / uniques) * 100).toFixed(1)}%`;
  },

  /**
   * Formatta data timestamp
   */
  formatDate: (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('it-IT');
  },

  /**
   * Formatta URL per display
   */
  formatUrl: (url) => {
    if (!url) return 'Homepage';
    return url.replace(/^\/+/, '') || 'Homepage';
  }
};

export default {
  useUmamiStats,
  useUmamiAnalytics,
  useUmamiPages,
  useUmamiReferrers,
  useUmamiEvents,
  useUmamiHealth,
  umamiUtils
};
