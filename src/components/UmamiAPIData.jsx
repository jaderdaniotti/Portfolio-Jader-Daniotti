import React, { useState } from 'react';
import { 
  useUmamiAnalytics,
  umamiUtils
} from '../hooks/useUmamiStats';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer,
  Globe,
  Calendar,
  RefreshCw,
  AlertCircle,
  Activity,
  Clock,
  ExternalLink
} from 'lucide-react';

const UmamiAPIData = () => {
  const [dateRange, setDateRange] = useState('30d');
  
  // Utilizza il nuovo hook per recuperare tutti i dati analitici
  const { data, loading, error, lastUpdated, refetch } = useUmamiAnalytics(dateRange);

  // Estrai i dati dalla risposta
  const stats = data?.stats || null;
  const topPages = data?.pages || [];
  const referrers = data?.referrers || [];
  const events = data?.events || [];

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chiaro mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Caricamento dati Umami...</p>
          </div>
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
            <p className="text-lg font-medium">Errore nel caricamento dati</p>
            <p className="text-sm text-gray-500 mb-4">{error}</p>
            <button 
              onClick={refetch}
              className="px-6 py-2 bg-chiaro text-white rounded-md hover:bg-chiaro-2 transition-colors font-medium"
            >
              <RefreshCw className="w-4 h-4 mr-2 inline" />
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
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-chiaro bg-opacity-20 rounded-lg">
              <Activity className="w-6 h-6 text-chiaro" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Analytics Umami</h3>
              <p className="text-sm text-gray-600">Statistiche in tempo reale dal tuo portfolio</p>
              {lastUpdated && (
                <p className="text-xs text-gray-500 mt-1">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Aggiornato: {lastUpdated.toLocaleString('it-IT')}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 text-gray-700 font-medium transition-all"
            >
              <option value="7d">Ultimi 7 giorni</option>
              <option value="30d">Ultimi 30 giorni</option>
              <option value="90d">Ultimi 90 giorni</option>
            </select>
            <button 
              onClick={refetch}
              className="p-3 bg-chiaro text-white rounded-lg hover:bg-chiaro-2 transition-colors shadow-md hover:shadow-lg"
              title="Aggiorna dati"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Statistiche principali */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-600 mb-1">Page Views</p>
                  <p className="text-3xl font-bold text-blue-900">{umamiUtils.formatNumber(stats.pageviews)}</p>
                </div>
                <div className="p-3 bg-blue-500 rounded-lg">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-green-600 mb-1">Visite Uniche</p>
                  <p className="text-3xl font-bold text-green-900">{umamiUtils.formatNumber(stats.uniques)}</p>
                </div>
                <div className="p-3 bg-green-500 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-purple-600 mb-1">Bounce Rate</p>
                  <p className="text-3xl font-bold text-purple-900">{umamiUtils.formatBounceRate(stats.bounces, stats.uniques)}</p>
                </div>
                <div className="p-3 bg-purple-500 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-orange-600 mb-1">Durata Media</p>
                  <p className="text-3xl font-bold text-orange-900">{umamiUtils.formatDuration(stats.avgDuration)}</p>
                </div>
                <div className="p-3 bg-orange-500 rounded-lg">
                  <MousePointer className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagine più visitate */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <ExternalLink className="w-5 h-5 mr-2 text-chiaro" />
            Pagine Più Visitate
          </h4>
          <span className="text-sm text-gray-500">{topPages.length} pagine</span>
        </div>
        <div className="space-y-3">
          {topPages.slice(0, 5).map((page, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-chiaro bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-chiaro">{index + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{umamiUtils.formatUrl(page.url)}</p>
                  <p className="text-xs text-gray-500">{page.title || 'Nessun titolo'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{umamiUtils.formatNumber(page.pageviews)}</p>
                <p className="text-xs text-gray-500">views</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referrers */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-chiaro" />
            Sorgenti di Traffico
          </h4>
          <span className="text-sm text-gray-500">{referrers.length} sorgenti</span>
        </div>
        <div className="space-y-3">
          {referrers.slice(0, 5).map((referrer, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-chiaro bg-opacity-20 rounded-lg">
                  <Globe className="w-5 h-5 text-chiaro" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {referrer.referrer || 'Direct'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {umamiUtils.formatNumber(referrer.visitors)} visitatori unici
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{umamiUtils.formatNumber(referrer.pageviews)}</p>
                <p className="text-xs text-gray-500">views</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eventi personalizzati */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-chiaro" />
            Eventi Personalizzati
          </h4>
          <span className="text-sm text-gray-500">{events.length} eventi</span>
        </div>
        <div className="space-y-3">
          {events.length > 0 ? (
            events.slice(0, 5).map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-chiaro bg-opacity-20 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-chiaro" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{event.event_name}</p>
                    <p className="text-xs text-gray-500">
                      {event.event_data ? JSON.parse(event.event_data).section || 'N/A' : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{umamiUtils.formatNumber(event.count)}</p>
                  <p className="text-xs text-gray-500">eventi</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-lg font-medium">Nessun evento personalizzato</p>
              <p className="text-sm">Gli eventi vengono registrati automaticamente</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Sistema */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-chiaro" />
          Info Sistema
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-700 mb-1">Backend URL:</p>
            <p className="text-gray-600 font-mono text-xs">{import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api'}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-700 mb-1">Periodo:</p>
            <p className="text-gray-600 font-medium">{dateRange}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-700 mb-1">Ultimo Aggiornamento:</p>
            <p className="text-gray-600">{lastUpdated ? lastUpdated.toLocaleString('it-IT') : 'N/A'}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-700 mb-1">Stato Connessione:</p>
            <p className={`font-medium ${error ? 'text-red-600' : 'text-green-600'}`}>
              {loading ? 'Caricamento...' : error ? 'Errore' : 'Connesso'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmamiAPIData;
