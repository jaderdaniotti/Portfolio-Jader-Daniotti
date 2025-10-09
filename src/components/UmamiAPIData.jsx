import React, { useState, useEffect } from 'react';
import { 
  getUmamiStats, 
  getTopPages, 
  getReferrers, 
  getCustomEvents 
} from '../utils/umami';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer,
  Globe,
  Calendar,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

const UmamiAPIData = () => {
  const [stats, setStats] = useState(null);
  const [topPages, setTopPages] = useState([]);
  const [referrers, setReferrers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('30d');

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [statsData, pagesData, referrersData, eventsData] = await Promise.all([
        getUmamiStats(dateRange),
        getTopPages(dateRange),
        getReferrers(dateRange),
        getCustomEvents(dateRange)
      ]);

      setStats(statsData);
      setTopPages(pagesData || []);
      setReferrers(referrersData || []);
      setEvents(eventsData || []);
    } catch (err) {
      setError('Errore nel caricamento dati Umami');
      console.error('Errore:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [dateRange]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num?.toString() || '0';
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('it-IT');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-center h-64 text-red-600">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4" />
            <p className="text-lg font-medium">{error}</p>
            <button 
              onClick={loadData}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Riprova
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con controlli */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Dati API Umami</h3>
            <p className="text-sm text-gray-600">Statistiche in tempo reale dal tuo sito</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black font-medium"
            >
              <option value="7d">Ultimi 7 giorni</option>
              <option value="30d">Ultimi 30 giorni</option>
              <option value="90d">Ultimi 90 giorni</option>
            </select>
            <button 
              onClick={loadData}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Aggiorna dati"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Statistiche principali */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Page Views</p>
                  <p className="text-2xl font-bold text-blue-900">{formatNumber(stats.pageviews)}</p>
                </div>
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Visite Uniche</p>
                  <p className="text-2xl font-bold text-green-900">{formatNumber(stats.uniques)}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Bounce Rate</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.bounceRate?.toFixed(1) || 0}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Durata Media</p>
                  <p className="text-2xl font-bold text-orange-900">{Math.round(stats.avgDuration || 0)}s</p>
                </div>
                <MousePointer className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagine più visitate */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Pagine Più Visitate</h4>
        <div className="space-y-3">
          {topPages.slice(0, 5).map((page, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-indigo-600">{index + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{page.url || 'Homepage'}</p>
                  <p className="text-xs text-gray-500">{page.title || 'Nessun titolo'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{formatNumber(page.pageviews)}</p>
                <p className="text-xs text-gray-500">views</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referrers */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Sorgenti di Traffico</h4>
        <div className="space-y-3">
          {referrers.slice(0, 5).map((referrer, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {referrer.referrer || 'Direct'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {referrer.visitors} visitatori unici
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{formatNumber(referrer.pageviews)}</p>
                <p className="text-xs text-gray-500">views</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eventi personalizzati */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Eventi Personalizzati</h4>
        <div className="space-y-3">
          {events.length > 0 ? (
            events.slice(0, 5).map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{event.event_name}</p>
                    <p className="text-xs text-gray-500">
                      {event.event_data ? JSON.parse(event.event_data).section || 'N/A' : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{event.count}</p>
                  <p className="text-xs text-gray-500">eventi</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Nessun evento personalizzato registrato</p>
            </div>
          )}
        </div>
      </div>

      {/* Debug Info */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Debug Info</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700">API Key:</p>
            <p className="text-gray-600 font-mono">api_pNPWLJDfNfBusGp5caLlgnYUJGtYbT2h</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Website ID:</p>
            <p className="text-gray-600 font-mono">Hv1uHdpcZObOcURY</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Date Range:</p>
            <p className="text-gray-600">{dateRange}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Ultimo Aggiornamento:</p>
            <p className="text-gray-600">{new Date().toLocaleString('it-IT')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmamiAPIData;
