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
  Calendar,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Globe,
  LogOut
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
import { Line, Bar, Doughnut } from 'react-chartjs-2';

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

const TabbedDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [activeStackTab, setActiveStackTab] = useState('frontend');
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});

  const tabs = [
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'stack', name: 'Stack', icon: Code },
    { id: 'strumenti', name: 'Strumenti', icon: Wrench },
    { id: 'progetti', name: 'Progetti', icon: Rocket },
  ];

  const stackTabs = [
    { id: 'frontend', name: 'Frontend', color: 'blue' },
    { id: 'backend', name: 'Backend', color: 'green' },
    { id: 'database', name: 'Database', color: 'purple' },
  ];

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
    portfolioEvents.adminLogout();
    localStorage.removeItem('admin_user');
    onLogout();
  };

  const handleEdit = (item, type) => {
    setEditingItem({ ...item, type });
    setEditForm(item);
  };

  const handleSave = async () => {
    try {
      const { type, id } = editingItem;
      const tableName = type === 'project' ? 'projects' : 
                      type === 'technology' ? 'technologies' : 'tools';
      
      const { error } = await supabase
        .from(tableName)
        .update(editForm)
        .eq('id', id);

      if (error) throw error;

      await loadData();
      setEditingItem(null);
      setEditForm({});
    } catch (error) {
      console.error('Errore nel salvataggio:', error);
    }
  };

  const handleDelete = async (id, type) => {
    if (!confirm('Sei sicuro di voler eliminare questo elemento?')) return;

    try {
      const tableName = type === 'project' ? 'projects' : 
                      type === 'technology' ? 'technologies' : 'tools';
      
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      await loadData();
    } catch (error) {
      console.error('Errore nell\'eliminazione:', error);
    }
  };

  const handleAdd = async (type) => {
    try {
      const tableName = type === 'project' ? 'projects' : 
                      type === 'technology' ? 'technologies' : 'tools';
      
      const defaultData = type === 'project' ? {
        title: 'Nuovo Progetto',
        description: 'Descrizione del progetto',
        category: 'web',
        status: 'completed',
        featured: false,
        order_index: projects.length + 1
      } : type === 'technology' ? {
        name: 'Nuova Tecnologia',
        category: 'frontend',
        percent: 50,
        order_index: technologies.length + 1,
        svg_code: '<svg></svg>'
      } : {
        name: 'Nuovo Strumento',
        percent: 50,
        order_index: tools.length + 1,
        svg_code: '<svg></svg>'
      };

      const { error } = await supabase
        .from(tableName)
        .insert(defaultData);

      if (error) throw error;

      await loadData();
    } catch (error) {
      console.error('Errore nell\'aggiunta:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-semibold text-gray-900">Dashboard di <span className='text-chiaro'>Jader</span></h1>
              <p className="text-gray-600 mt-1"></p>
            </div>
             <div className="flex items-center gap-2">
               <a 
                 href="/" target='_blank'
                 className="flex items-center  bg-chiaro text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
               >
                 <Globe className="w-4 h-4" />
               </a>
               <button
                 onClick={handleLogout}
                 className="bg-scuro-2 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
               >
                 <LogOut className="w-4 h-4" />
               </button>
             </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow rounded-lg">
          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
                <div className="flex items-center space-x-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm font-medium text-blue-600">Progetti</p>
                      <p className="text-2xl font-bold text-blue-900">{projects.length}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-sm font-medium text-green-600">Tecnologie</p>
                      <p className="text-2xl font-bold text-green-900">{technologies.length}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="text-sm font-medium text-purple-600">Strumenti</p>
                      <p className="text-2xl font-bold text-purple-900">{tools.length}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <p className="text-sm font-medium text-orange-600">Competenze Medie</p>
                      <p className="text-2xl font-bold text-orange-900">
                        {Math.round(technologies.reduce((acc, t) => acc + t.percent, 0) / technologies.length)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <UmamiAPIData />
            </div>
          )}

           {/* Stack Tab */}
           {activeTab === 'stack' && (
             <div className="p-6">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-gray-900">Stack Tecnologico</h2>
                 <button 
                   onClick={() => handleAdd('technology')}
                   className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                 >
                   <Plus className="w-4 h-4 mr-2" />
                   Aggiungi Tecnologia
                 </button>
               </div>
               
               {/* Stack Sub-tabs */}
               <div className="border-b border-gray-200 mb-6">
                 <nav className="-mb-px flex space-x-8">
                   {stackTabs.map((tab) => (
                     <button
                       key={tab.id}
                       onClick={() => setActiveStackTab(tab.id)}
                       className={`py-2 px-1 border-b-2 font-medium text-sm ${
                         activeStackTab === tab.id
                           ? `border-${tab.color}-500 text-${tab.color}-600`
                           : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                       }`}
                     >
                       {tab.name}
                     </button>
                   ))}
                 </nav>
               </div>

               {/* Filtered Technologies */}
               {technologies.filter(tech => tech.category === activeStackTab).length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {technologies
                    .filter(tech => tech.category === activeStackTab)
                    .map((tech) => (
                  <div key={tech.id} className="border rounded-lg p-4">
                    {editingItem?.id === tech.id && editingItem?.type === 'technology' ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Nome tecnologia"
                        />
                        <select
                          value={editForm.category || ''}
                          onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        >
                          <option value="frontend">Frontend</option>
                          <option value="backend">Backend</option>
                          <option value="database">Database</option>
                        </select>
                        <input
                          type="number"
                          value={editForm.percent || ''}
                          onChange={(e) => setEditForm({...editForm, percent: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Percentuale"
                          min="0"
                          max="100"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm flex items-center justify-center"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Salva
                          </button>
                          <button
                            onClick={() => setEditingItem(null)}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm flex items-center justify-center"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Annulla
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-8 h-8 rounded flex items-center justify-center"
                              dangerouslySetInnerHTML={{ __html: tech.svg_code }}
                            />
                            <h3 className="font-medium text-gray-900">{tech.name}</h3>
                          </div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            tech.category === 'frontend' ? 'bg-blue-100 text-blue-800' :
                            tech.category === 'backend' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {tech.category}
                          </span>
                        </div>
                        <div className="mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full" 
                              style={{ width: `${tech.percent}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{tech.percent}%</p>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEdit(tech, 'technology')}
                            className="text-indigo-600 hover:text-indigo-900 text-sm flex items-center"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Modifica
                          </button>
                          <button 
                            onClick={() => handleDelete(tech.id, 'technology')}
                            className="text-red-600 hover:text-red-900 text-sm flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Elimina
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                 </div>
               ) : (
                 <div className="text-center py-12 text-gray-500">
                   <Code className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                   <p className="text-lg font-medium">Nessuna tecnologia {activeStackTab}</p>
                   <p className="text-sm">Aggiungi una nuova tecnologia per questa categoria</p>
                 </div>
               )}
             </div>
           )}

          {/* Strumenti Tab */}
          {activeTab === 'strumenti' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Strumenti di Lavoro</h2>
                <button 
                  onClick={() => handleAdd('tool')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Aggiungi Strumento
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool) => (
                  <div key={tool.id} className="border rounded-lg p-4">
                    {editingItem?.id === tool.id && editingItem?.type === 'tool' ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Nome strumento"
                        />
                        <input
                          type="number"
                          value={editForm.percent || ''}
                          onChange={(e) => setEditForm({...editForm, percent: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Percentuale"
                          min="0"
                          max="100"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm flex items-center justify-center"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Salva
                          </button>
                          <button
                            onClick={() => setEditingItem(null)}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm flex items-center justify-center"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Annulla
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-3 mb-2">
                          <div 
                            className="w-8 h-8 rounded flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: tool.svg_code }}
                          />
                          <h3 className="font-medium text-gray-900">{tool.name}</h3>
                        </div>
                        <div className="mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full" 
                              style={{ width: `${tool.percent}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{tool.percent}%</p>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEdit(tool, 'tool')}
                            className="text-indigo-600 hover:text-indigo-900 text-sm flex items-center"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Modifica
                          </button>
                          <button 
                            onClick={() => handleDelete(tool.id, 'tool')}
                            className="text-red-600 hover:text-red-900 text-sm flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Elimina
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progetti Tab */}
          {activeTab === 'progetti' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Progetti</h2>
                <button 
                  onClick={() => handleAdd('project')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Aggiungi Progetto
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Titolo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrizione
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Featured
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Azioni
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {project.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {project.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {project.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            project.status === 'completed' ? 'bg-green-100 text-green-800' :
                            project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            project.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {project.featured ? 'Sì' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleEdit(project, 'project')}
                            className="text-indigo-600 hover:text-indigo-900 mr-3 flex items-center"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Modifica
                          </button>
                          <button 
                            onClick={() => handleDelete(project.id, 'project')}
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Elimina
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabbedDashboard;
