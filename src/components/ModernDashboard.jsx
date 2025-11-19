import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { portfolioEvents } from '../utils/umami';
import UmamiAPIData from './UmamiAPIData';
import { 
  BarChart3, 
  Rocket, 
  Code, 
  Wrench, 
  ArrowLeft, 
  TrendingUp,
  Users,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import GlobalLoader from './GlobalLoader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ModernDashboard = ({ user, onLogout }) => {
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [projectsRes, technologiesRes, toolsRes] = await Promise.all([
        supabase.from('projects').select('*').order('order_index'),
        supabase.from('technologies').select('*').order('order_index'),
        supabase.from('tools').select('*').order('order_index')
      ]);

      setProjects(projectsRes.data || []);
      setTechnologies(technologiesRes.data || []);
      setTools(toolsRes.data || []);
    } catch (error) {
      console.error('Errore nel caricamento dati:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Traccia il logout admin
    portfolioEvents.adminLogout();
    localStorage.removeItem('admin_user');
    onLogout();
  };

  // Dati per i grafici
  const technologiesByCategory = technologies.reduce((acc, tech) => {
    acc[tech.category] = (acc[tech.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    technologies: {
      labels: Object.keys(technologiesByCategory),
      datasets: [{
        data: Object.values(technologiesByCategory),
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 0,
      }]
    },
    skills: {
      labels: technologies.slice(0, 6).map(t => t.name),
      datasets: [{
        label: 'Livello Competenza',
        data: technologies.slice(0, 6).map(t => t.percent),
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: '#3B82F6',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      }]
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <GlobalLoader/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grigio">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Portfolio Analytics</p>
            </div>
            <div className="flex items-center space-x-4">

              <a 
                href="/" 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Torna al sito</span>
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Progetti Totali</p>
                <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
                <p className="text-sm text-green-600 mt-1">+12% dal mese scorso</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Rocket className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tecnologie</p>
                <p className="text-3xl font-bold text-gray-900">{technologies.length}</p>
                <p className="text-sm text-green-600 mt-1">+8% dal mese scorso</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Code className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Strumenti</p>
                <p className="text-3xl font-bold text-gray-900">{tools.length}</p>
                <p className="text-sm text-green-600 mt-1">+5% dal mese scorso</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Wrench className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Competenze Medie</p>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.round(technologies.reduce((acc, t) => acc + t.percent, 0) / technologies.length)}%
                </p>
                <p className="text-sm text-green-600 mt-1">Livello Esperto</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Technologies by Category */}
          <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Tecnologie per Categoria</h3>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {Object.entries(technologiesByCategory).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      category === 'frontend' ? 'bg-blue-500' :
                      category === 'backend' ? 'bg-green-500' :
                      'bg-purple-500'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Competenze</h3>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64">
              <Line 
                data={chartData.skills}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      grid: {
                        color: 'rgba(0,0,0,0.05)'
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Website Analytics */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Analytics Sito</h3>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-gray-400" />
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="h-80 rounded-lg overflow-hidden">
              <iframe
                src="https://cloud.umami.is/share/Hv1uHdpcZObOcURY/jaderdaniotti.netlify.app"
                title="Analytics - Jader Portfolio"
                className="h-full w-full border-0"
              />
            </div>
          </div>

          {/* Projects Overview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Progetti Overview</h3>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {projects.slice(0, 5).map((project, index) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-indigo-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{project.title}</p>
                      <p className="text-xs text-gray-500">{project.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {project.featured && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Featured
                      </span>
                    )}
                    <span className="text-sm text-gray-500">{project.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Umami API Data */}
        <div className="mb-8">
          <UmamiAPIData />
        </div>

        {/* Tools and Technologies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tools */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Strumenti di Lavoro</h3>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {tools.map((tool) => (
                <div key={tool.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: tool.svg_code }}
                    />
                    <span className="text-sm font-medium text-gray-900">{tool.name}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${tool.percent}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{tool.percent}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Stack Tecnologico</h3>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {technologies.map((tech) => (
                <div key={tech.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-6 h-6 rounded flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: tech.svg_code }}
                    />
                    <span className="text-sm font-medium text-gray-900">{tech.name}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      tech.category === 'frontend' ? 'bg-blue-100 text-blue-800' :
                      tech.category === 'backend' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {tech.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${tech.percent}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{tech.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;
