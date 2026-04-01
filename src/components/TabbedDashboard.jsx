import React, { useState, useEffect } from 'react';
import GlobalLoader from './GlobalLoader';
import { supabase, supabaseAdmin, storageAPI } from '../config/supabase';
import { portfolioEvents } from '../utils/umami';
import CardAnteprimaProgetti from './cardAnteprimaProgetti';
import {
  Rocket,
  Code,
  Wrench,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Globe,
  LogOut,
  Image,
  Link,
  Tags,
  Type,
  Upload,
  FileText,
  Smartphone,
  Tablet,
  Monitor,
  ChevronLeft,
  ChevronRight,
  GripVertical
} from 'lucide-react';

const TabbedDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('stack');
  const [activeStackTab, setActiveStackTab] = useState('frontend');
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [tools, setTools] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  // Stati per paginazione templates
  const [templatesCurrentPage, setTemplatesCurrentPage] = useState(1);
  const [templatesPerPage] = useState(9); // 3 colonne x 3 righe
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  // Stati per le immagini del progetto divise per dispositivo
  const [projectImages, setProjectImages] = useState({
    pc: [], // Array di { file: File, preview: string } o { id: string, image_url: string }
    tablet: [],
    mobile: []
  });
  const [uploadingProjectImages, setUploadingProjectImages] = useState(false);
  // Stato per le tecnologie del progetto (divise per tipo: frontend/backend/database)
  const [projectTechnologies, setProjectTechnologies] = useState({
    frontend: [], // Array di technology_id selezionati
    backend: [],
    database: []
  });
  const [draggedProjectId, setDraggedProjectId] = useState(null);
  const [isReorderingProjects, setIsReorderingProjects] = useState(false);

  // Verifica se l'utente è admin
  const isAdmin = () => {
    try {
      const savedUser = localStorage.getItem('admin_user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        return user.role === 'admin';
      }
    } catch (error) {
      console.error('Errore nel controllo admin:', error);
    }
    return false;
  };

  // Usa supabaseAdmin se l'utente è admin, altrimenti supabase normale
  const getSupabaseClient = () => {
    return isAdmin() && supabaseAdmin ? supabaseAdmin : supabase;
  };

  const tabs = [
    { id: 'stack', name: 'Stack', icon: Code },
    { id: 'strumenti', name: 'Strumenti', icon: Wrench },
    { id: 'progetti', name: 'Progetti', icon: Rocket },
    { id: 'templates', name: 'Templates', icon: FileText },
  ];

  const stackTabs = [
    { id: 'frontend', name: 'Frontend', },
    { id: 'backend', name: 'Backend', },
    { id: 'database', name: 'Database', },
  ];

  useEffect(() => {
    loadData();
  }, []);

  // Reset pagina templates quando si cambia tab
  useEffect(() => {
    if (activeTab !== 'templates') {
      setTemplatesCurrentPage(1);
    }
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      const client = getSupabaseClient();
      const [projectsRes, technologiesRes, toolsRes, templatesRes] = await Promise.all([
        client.from('projects').select('*').order('order_index'),
        client.from('technologies').select('*').order('order_index'),
        client.from('tools').select('*').order('order_index'),
        client.from('templates').select('*').order('created_at', { ascending: false })
      ]);

      setProjects(projectsRes.data || []);
      setTechnologies(technologiesRes.data || []);
      setTools(toolsRes.data || []);
      const templatesData = templatesRes.data || [];
      setTemplates(templatesData);
      // Reset pagina se necessario
      const maxPage = Math.ceil(templatesData.length / templatesPerPage);
      if (templatesCurrentPage > maxPage && maxPage > 0) {
        setTemplatesCurrentPage(1);
      }
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

  const handleEdit = async (item, type) => {
    try {
      if (!item || !type) {
        console.error('handleEdit: item o type mancanti', { item, type });
        return;
      }

    setEditingItem({ ...item, type });
      setEditForm(item || {});
      
    // Se c'è un'immagine esistente, mostra l'anteprima
      if (type === 'project' && item?.cover_image) {
      setCoverImagePreview(item.cover_image);
      setCoverImageFile(null);
    } else {
      setCoverImageFile(null);
      setCoverImagePreview(null);
      }
    } catch (error) {
      console.error('Errore in handleEdit:', error);
      // Reset sicuro in caso di errore
      setEditingItem(null);
      setEditForm({});
      setCoverImageFile(null);
      setCoverImagePreview(null);
      setProjectImages({ pc: [], tablet: [], mobile: [] });
      setProjectTechnologies({ frontend: [], backend: [], database: [] });
      return;
    }

    // Carica le immagini del progetto se stiamo modificando un progetto esistente
    if (type === 'project' && item.id) {
      try {
        const client = getSupabaseClient();
        const [imagesRes, technologiesRes] = await Promise.all([
          client
            .from('project_images')
            .select('*')
            .eq('project_id', item.id)
            .order('order_index'),
          client
            .from('project_technologies')
            .select('*')
            .eq('project_id', item.id)
        ]);

        // Gestisci errori separatamente per non bloccare tutto
        if (imagesRes.error) {
          console.error('Errore nel caricamento immagini:', imagesRes.error);
        }

        if (technologiesRes.error) {
          console.error('Errore nel caricamento tecnologie:', technologiesRes.error);
        }

        // Organizza le immagini per device_type
        const imagesByDevice = {
          pc: [],
          tablet: [],
          mobile: []
        };

        if (imagesRes.data && !imagesRes.error) {
        (imagesRes.data || []).forEach(img => {
          if (img.device_type && imagesByDevice[img.device_type]) {
            imagesByDevice[img.device_type].push({
              id: img.id,
              image_url: img.image_url,
              order_index: img.order_index
            });
          }
        });
        }

        setProjectImages(imagesByDevice);

        // Organizza le tecnologie per tipo
        const technologiesByType = {
          frontend: [],
          backend: [],
          database: []
        };

        if (technologiesRes.data && !technologiesRes.error) {
        (technologiesRes.data || []).forEach(pt => {
            // Filtra solo i tipi validi per evitare errori
            if (pt.type && technologiesByType[pt.type] && pt.technology_id) {
            technologiesByType[pt.type].push(pt.technology_id);
          }
        });
        }

        setProjectTechnologies(technologiesByType);
      } catch (error) {
        console.error('Errore nel caricamento immagini/tecnologie progetto:', error);
        // Reset sicuro in caso di errore
        setProjectImages({ pc: [], tablet: [], mobile: [] });
        setProjectTechnologies({ frontend: [], backend: [], database: [] });
      }
    } else {
      setProjectImages({ pc: [], tablet: [], mobile: [] });
      setProjectTechnologies({ frontend: [], backend: [], database: [] });
    }
  };

  // Gestisce la selezione del file immagine
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Verifica che sia un'immagine
      if (!file.type.startsWith('image/')) {
        alert('Per favore seleziona un file immagine');
        return;
      }

      // Verifica la dimensione (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('L\'immagine è troppo grande. Massimo 5MB');
        return;
      }

      setCoverImageFile(file);

      // Crea anteprima
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Rimuove l'immagine selezionata
  const handleRemoveImage = () => {
    setCoverImageFile(null);
    setCoverImagePreview(null);
    setEditForm({ ...editForm, cover_image: '' });
  };

  // Gestisce la selezione di immagini per dispositivo
  const handleProjectImageSelect = (e, deviceType) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach(file => {
      // Verifica che sia un'immagine
      if (!file.type.startsWith('image/')) {
        alert('Per favore seleziona solo file immagine');
        return;
      }

      // Verifica la dimensione (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`L'immagine ${file.name} è troppo grande. Massimo 5MB`);
        return;
      }

      // Crea anteprima
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImages(prev => ({
          ...prev,
          [deviceType]: [...prev[deviceType], {
            file: file,
            preview: reader.result
          }]
        }));
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    e.target.value = '';
  };

  // Rimuove un'immagine del progetto (nuova o esistente)
  const handleRemoveProjectImage = async (deviceType, index, imageId = null) => {
    // Se è un'immagine esistente nel database, eliminala
    if (imageId) {
      try {
        const client = getSupabaseClient();
        const { error } = await client
          .from('project_images')
          .delete()
          .eq('id', imageId);

        if (error) throw error;
      } catch (error) {
        console.error('Errore nell\'eliminazione immagine:', error);
        alert('Errore nell\'eliminazione dell\'immagine');
        return;
      }
    }

    // Rimuovi dallo stato
    setProjectImages(prev => ({
      ...prev,
      [deviceType]: prev[deviceType].filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    try {
      const { type, id } = editingItem;

      // Validazione per progetti
      if (type === 'project') {
        if (!editForm.title || editForm.title.trim() === '') {
          alert('Il titolo è obbligatorio');
          return;
        }
      }

      // Validazione per strumenti
      if (type === 'tool') {
        if (!editForm.name || editForm.name.trim() === '') {
          alert('Il nome è obbligatorio');
          return;
        }
      }

      setUploadingImage(true);

      const tableName = type === 'project' ? 'projects' :
        type === 'technology' ? 'technologies' :
          type === 'tool' ? 'tools' : 'templates';

      // Prepara i dati da aggiornare rimuovendo campi non necessari
      const updateData = { ...editForm };
      delete updateData.id;
      delete updateData.type;
      delete updateData.created_at;
      delete updateData.updated_at;
      delete updateData.user_id;

      // Per i progetti, gestisci il caricamento dell'immagine
      if (type === 'project') {
        updateData.title = updateData.title.trim();
        updateData.description = updateData.description?.trim() || null;
        updateData.github_url = updateData.github_url?.trim() || null;
        updateData.domain_url = updateData.domain_url?.trim() || null;
        updateData.featured = updateData.featured || false;
        updateData.order_index = updateData.order_index || 0;

        // Se c'è un nuovo file, caricalo nello storage
        if (coverImageFile) {
          const timestamp = Date.now();
          const fileName = `projects/${timestamp}-${coverImageFile.name}`;

          // Usa admin client per bypassare RLS
          const uploadResult = await storageAPI.uploadImage(coverImageFile, fileName, isAdmin());

          if (!uploadResult.success) {
            throw new Error(uploadResult.error || 'Errore nel caricamento dell\'immagine');
          }

          // Ottieni l'URL pubblico
          updateData.cover_image = storageAPI.getPublicUrl(fileName);

          // Se c'era un'immagine precedente, eliminala (opzionale - per risparmiare spazio)
          // Potresti voler mantenere le vecchie immagini per backup
        } else if (coverImagePreview && !coverImagePreview.startsWith('data:')) {
          // Se l'anteprima è un URL (non un data URL), mantieni l'URL esistente
          updateData.cover_image = coverImagePreview;
        } else if (!coverImagePreview) {
          // Se non c'è anteprima, rimuovi l'immagine
          updateData.cover_image = null;
        }
      }

      // Validazione per templates
      if (type === 'template') {
        if (!updateData.name || !updateData.site_url) {
          alert('Nome e URL del sito sono obbligatori');
          return;
        }
        // Assicura che tags sia un array
        if (!updateData.tags || !Array.isArray(updateData.tags)) {
          updateData.tags = [];
        }
      }

      // Validazione e preparazione dati per strumenti
      if (type === 'tool') {
        updateData.name = updateData.name.trim();
        updateData.percent = updateData.percent || 50;
        updateData.order_index = updateData.order_index || tools.length + 1;
        updateData.svg_code = updateData.svg_code || '<svg></svg>';
      }

      const client = getSupabaseClient();
      
      // Se id è null, crea un nuovo record, altrimenti aggiorna
      let result;
      if (id === null) {
        result = await client
          .from(tableName)
          .insert(updateData)
          .select()
          .single();
      } else {
        result = await client
        .from(tableName)
        .update(updateData)
          .eq('id', id)
          .select()
          .single();
      }
      
      const { error } = result;

      if (error) throw error;

      // Per i progetti, salva anche le immagini del progetto
      // Usa l'id dal risultato se è una creazione, altrimenti usa l'id esistente
      const projectId = id || result.data?.id;
      if (type === 'project' && projectId) {
        setUploadingProjectImages(true);
        try {
          // Carica le nuove immagini (quelle con file)
          for (const deviceType of ['pc', 'tablet', 'mobile']) {
            const images = projectImages[deviceType] || [];
            for (let i = 0; i < images.length; i++) {
              const img = images[i];

              // Se è una nuova immagine (ha file), caricala
              if (img.file) {
                const timestamp = Date.now();
                const fileName = `projects/${id}/${deviceType}/${timestamp}-${img.file.name}`;

                const uploadResult = await storageAPI.uploadImage(img.file, fileName, isAdmin());

                if (!uploadResult.success) {
                  console.error(`Errore nel caricamento immagine ${deviceType}:`, uploadResult.error);
                  continue;
                }

                const imageUrl = storageAPI.getPublicUrl(fileName);

                // Inserisci nel database
                const { error: insertError } = await client
                  .from('project_images')
                  .insert({
                    project_id: projectId,
                    image_url: imageUrl,
                    device_type: deviceType,
                    order_index: i
                  });

                if (insertError) {
                  console.error('Errore nell\'inserimento immagine:', insertError);
                }
              }
              // Se è un'immagine esistente (ha id), aggiorna l'order_index se necessario
              else if (img.id) {
                const { error: updateError } = await client
                  .from('project_images')
                  .update({ order_index: i })
                  .eq('id', img.id);

                if (updateError) {
                  console.error('Errore nell\'aggiornamento ordine immagine:', updateError);
                }
              }
            }
          }

          // Salva le tecnologie del progetto
          // Prima elimina tutte le tecnologie esistenti (solo se è un aggiornamento)
          if (id) {
          const { error: deleteError } = await client
            .from('project_technologies')
            .delete()
            .eq('project_id', id);

            if (deleteError) {
              console.error('Errore nell\'eliminazione tecnologie esistenti:', deleteError);
            }
          }

          // Poi inserisci le nuove tecnologie
          const technologiesToInsert = [];
          for (const type of ['frontend', 'backend', 'database']) {
            const techIds = projectTechnologies[type] || [];
            techIds.forEach(techId => {
              technologiesToInsert.push({
                project_id: projectId,
                technology_id: techId,
                type: type
              });
            });
          }

          if (technologiesToInsert.length > 0) {
            const { error: insertTechError } = await client
              .from('project_technologies')
              .insert(technologiesToInsert);

            if (insertTechError) {
              console.error('Errore nell\'inserimento tecnologie:', insertTechError);
            }
          }
        } catch (error) {
          console.error('Errore nel salvataggio immagini/tecnologie progetto:', error);
          // Non bloccare il salvataggio del progetto se c'è un errore con le immagini
        } finally {
          setUploadingProjectImages(false);
        }
      }

      await loadData();
      setEditingItem(null);
      setEditForm({});
      setCoverImageFile(null);
      setCoverImagePreview(null);
      setProjectImages({ pc: [], tablet: [], mobile: [] });
      setProjectTechnologies({ frontend: [], backend: [], database: [] });
    } catch (error) {
      console.error('Errore nel salvataggio:', error);
      alert('Errore nel salvataggio: ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (!confirm('Sei sicuro di voler eliminare questo elemento?')) return;

    try {
      const tableName = type === 'project' ? 'projects' :
        type === 'technology' ? 'technologies' :
          type === 'tool' ? 'tools' : 'templates';

      const client = getSupabaseClient();
      const { error } = await client
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      await loadData();

      // Se stavamo modificando l'elemento eliminato, resetta il form
      if (editingItem?.id === id) {
        setEditingItem(null);
        setEditForm({});
      }
    } catch (error) {
      console.error('Errore nell\'eliminazione:', error);
      alert('Errore nell\'eliminazione: ' + error.message);
    }
  };

  const handleAdd = async (type) => {
    // Per i progetti e le tecnologie, apriamo il form invece di creare direttamente
    if (type === 'project') {
      setEditingItem({ type: 'project', id: null });
      setEditForm({
        title: '',
        description: '',
        cover_image: '',
        github_url: '',
        domain_url: '',
        featured: false,
        order_index: projects.length + 1
      });
      setCoverImageFile(null);
      setCoverImagePreview(null);
      setProjectImages({ pc: [], tablet: [], mobile: [] });
      setProjectTechnologies({ frontend: [], backend: [], database: [] });
      return;
    }

    // Per le tecnologie, apriamo il form
    if (type === 'technology') {
      setEditingItem({ type: 'technology', id: null });
      setEditForm({
        name: '',
        category: activeStackTab || 'frontend',
        percent: 50,
        order_index: technologies.length + 1,
        svg_code: '<svg></svg>'
      });
      return;
    }

    // Per gli strumenti, apriamo il form invece di creare direttamente
    if (type === 'tool') {
      setEditingItem({ type: 'tool', id: null });
      setEditForm({
        name: '',
        percent: 50,
        order_index: tools.length + 1,
        svg_code: '<svg></svg>'
      });
      return;
    }

    // Per i templates, creiamo direttamente
    try {
      const defaultData = {
        name: 'Nuovo Template',
        site_url: 'https://example.com',
        cover_url: 'https://via.placeholder.com/300x200',
        tags: []
      };

      const client = getSupabaseClient();
      const { error } = await client
        .from('templates')
        .insert(defaultData);

      if (error) throw error;

      await loadData();
    } catch (error) {
      console.error('Errore nell\'aggiunta:', error);
    }
  };

  const reorderProjects = (items, draggedId, targetId) => {
    const draggedIndex = items.findIndex((item) => item.id === draggedId);
    const targetIndex = items.findIndex((item) => item.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) {
      return items;
    }

    const nextItems = [...items];
    const [draggedItem] = nextItems.splice(draggedIndex, 1);
    nextItems.splice(targetIndex, 0, draggedItem);

    return nextItems.map((project, index) => ({
      ...project,
      order_index: index + 1
    }));
  };

  const persistProjectOrder = async (orderedProjects) => {
    setIsReorderingProjects(true);
    const previousProjects = projects;
    setProjects(orderedProjects);

    try {
      const client = getSupabaseClient();

      for (const project of orderedProjects) {
        const { error } = await client
          .from('projects')
          .update({ order_index: project.order_index })
          .eq('id', project.id);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Errore nel riordino progetti:', error);
      setProjects(previousProjects);
      alert('Errore nel riordino dei progetti: ' + error.message);
    } finally {
      setIsReorderingProjects(false);
      setDraggedProjectId(null);
    }
  };

  const handleProjectDragStart = (projectId) => {
    setDraggedProjectId(projectId);
  };

  const handleProjectDrop = async (targetProjectId) => {
    if (!draggedProjectId || draggedProjectId === targetProjectId || isReorderingProjects) {
      setDraggedProjectId(null);
      return;
    }

    const orderedProjects = reorderProjects(projects, draggedProjectId, targetProjectId);
    await persistProjectOrder(orderedProjects);
  };

  const handleCreateTechnology = async () => {
    if (!editForm.name || editForm.name.trim() === '') {
      alert('Il nome è obbligatorio');
      return;
    }

    if (!editForm.category) {
      alert('La categoria è obbligatoria');
      return;
    }

    try {
      const technologyData = {
        name: editForm.name.trim(),
        category: editForm.category,
        percent: editForm.percent || 50,
        order_index: editForm.order_index || technologies.length + 1,
        svg_code: editForm.svg_code || '<svg></svg>'
      };

      const client = getSupabaseClient();
      const { error } = await client
        .from('technologies')
        .insert(technologyData);

      if (error) throw error;

      await loadData();
      setEditingItem(null);
      setEditForm({});
    } catch (error) {
      console.error('Errore nella creazione della tecnologia:', error);
      alert('Errore nella creazione della tecnologia: ' + error.message);
    }
  };

  const handleCreateProject = async () => {
    if (!editForm.title || editForm.title.trim() === '') {
      alert('Il titolo è obbligatorio');
      return;
    }

    setUploadingImage(true);

    try {
      let coverImageUrl = editForm.cover_image || null;

      // Se c'è un nuovo file, caricalo nello storage
      if (coverImageFile) {
        const timestamp = Date.now();
        const fileName = `projects/${timestamp}-${coverImageFile.name}`;

        // Usa admin client per bypassare RLS
        const uploadResult = await storageAPI.uploadImage(coverImageFile, fileName, isAdmin());

        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'Errore nel caricamento dell\'immagine');
        }

        // Ottieni l'URL pubblico
        coverImageUrl = storageAPI.getPublicUrl(fileName);
      }

      const projectData = {
        title: editForm.title.trim(),
        description: editForm.description || null,
        cover_image: coverImageUrl,
        github_url: editForm.github_url || null,
        domain_url: editForm.domain_url || null,
        featured: editForm.featured || false,
        order_index: editForm.order_index || projects.length + 1
      };

      const client = getSupabaseClient();
      const { data: newProject, error } = await client
        .from('projects')
        .insert(projectData)
        .select()
        .single();

      if (error) throw error;

      // Salva le immagini del progetto se ci sono
      if (newProject && newProject.id) {
        setUploadingProjectImages(true);
        try {
          for (const deviceType of ['pc', 'tablet', 'mobile']) {
            const images = projectImages[deviceType] || [];
            for (let i = 0; i < images.length; i++) {
              const img = images[i];

              // Solo le nuove immagini hanno file
              if (img.file) {
                const timestamp = Date.now();
                const fileName = `projects/${newProject.id}/${deviceType}/${timestamp}-${img.file.name}`;

                const uploadResult = await storageAPI.uploadImage(img.file, fileName, isAdmin());

                if (!uploadResult.success) {
                  console.error(`Errore nel caricamento immagine ${deviceType}:`, uploadResult.error);
                  continue;
                }

                const imageUrl = storageAPI.getPublicUrl(fileName);

                // Inserisci nel database
                const { error: insertError } = await client
                  .from('project_images')
                  .insert({
                    project_id: newProject.id,
                    image_url: imageUrl,
                    device_type: deviceType,
                    order_index: i
                  });

                if (insertError) {
                  console.error('Errore nell\'inserimento immagine:', insertError);
                }
              }
            }
          }

          // Salva le tecnologie del progetto
          const technologiesToInsert = [];
          for (const type of ['frontend', 'backend', 'database']) {
            const techIds = projectTechnologies[type] || [];
            techIds.forEach(techId => {
              technologiesToInsert.push({
                project_id: newProject.id,
                technology_id: techId,
                type: type
              });
            });
          }

          if (technologiesToInsert.length > 0) {
            const { error: insertTechError } = await client
              .from('project_technologies')
              .insert(technologiesToInsert);

            if (insertTechError) {
              console.error('Errore nell\'inserimento tecnologie:', insertTechError);
            }
          }
        } catch (error) {
          console.error('Errore nel salvataggio immagini/tecnologie progetto:', error);
          // Non bloccare la creazione del progetto se c'è un errore con le immagini
        } finally {
          setUploadingProjectImages(false);
        }
      }

      await loadData();
      setEditingItem(null);
      setEditForm({});
      setCoverImageFile(null);
      setCoverImagePreview(null);
      setProjectImages({ pc: [], tablet: [], mobile: [] });
      setProjectTechnologies({ frontend: [], backend: [], database: [] });
    } catch (error) {
      console.error('Errore nella creazione del progetto:', error);
      alert('Errore nella creazione del progetto: ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-scuro flex items-center justify-center">
        <GlobalLoader />
      </div>
    );
  }

  return (
    <div className="admin-dashboard min-h-screen inter bg-scuro-2">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-linear-to-b from-chiaro-2/45 via-scuro-2/20 to-transparent" />

      <header className="relative border-b border-white/8">
        <div className="mx-auto max-w-[1600px] px-6 py-8 xl:px-10">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-bianco/45">
                Control Room
              </p>
              <h1 className="mt-3 text-4xl xl:text-6xl tracking-tight font-medium text-bianco">
                Dashboard di <span className='titolo-bianco font-bold'>Jader</span>
              </h1>
              <p className="mt-4 max-w-3xl text-sm xl:text-base text-bianco/68 font-medium">
                Gestisci contenuti, portfolio e asset del sito in un'unica interfaccia chiara, immersiva e ottimizzata per desktop.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/"
                target='_blank'
                rel="noreferrer"
                className="admin-toolbar-btn"
              >
                <Globe className="w-4 h-4" />
                Apri sito
              </a>
              <button
                onClick={handleLogout}
                className="admin-toolbar-btn admin-toolbar-btn--ghost"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: 'Progetti', value: projects.length, icon: Rocket },
              { label: 'Tecnologie', value: technologies.length, icon: Code },
              { label: 'Strumenti', value: tools.length, icon: Wrench },
              { label: 'Templates', value: templates.length, icon: FileText },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="admin-stat-card">
                  <div className="admin-stat-icon">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.28em] text-bianco/42">{item.label}</div>
                    <div className="mt-2 text-3xl font-bold text-bianco">{item.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-[1600px] px-6 py-8 xl:px-10">
        <div className="grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">
          <aside className="admin-sidebar xl:sticky xl:top-8">
            <div className="mb-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-bianco/40">Sezioni</p>
            </div>
            <nav className="flex flex-col gap-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`admin-side-tab ${activeTab === tab.id ? 'admin-side-tab--active' : ''}`}
                  >
                    <span className="admin-side-tab__icon">
                      <IconComponent className="w-4 h-4" />
                    </span>
                    <span className="flex-1 text-left">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="admin-content-shell">
          {/* Stack Tab */}
          {activeTab === 'stack' && (
            <div className="admin-section-panel p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-bianco">Stack Tecnologico</h2>
                {editingItem?.type !== 'technology' && (
                <button
                  onClick={() => handleAdd('technology')}
                  className="bg-scuro-2 text-white px-4 py-2 rounded-md text-sm font-medium border flex items-center"
                
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Aggiungi Tecnologia
                </button>
                )}
              </div>

              {/* Form di creazione/modifica tecnologia */}
              {editingItem?.type === 'technology' && (
                <div className="bg-scuro-2 border-2 border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${editingItem?.id ? 'bg-green-100' : 'bg-chiaro-2 bg-opacity-20'}`}>
                        {editingItem?.id ? (
                          <Edit className="w-6 h-6 text-bianco" />
                        ) : (
                          <Plus className="w-6 h-6 text-bianco" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold inter text-bianco">
                          {editingItem?.id ? 'Modifica Tecnologia' : 'Crea Nuova Tecnologia'}
                        </h3>
                        <p className="text-sm text-bianco">
                          {editingItem?.id ? 'Aggiorna le informazioni della tecnologia' : 'Compila i campi per aggiungere una nuova tecnologia'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setEditForm({});
                      }}
                      className="text-bianco hover:text-chiaro p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
              </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="flex items-center text-sm font-semibold text-bianco mb-2">
                        <Type className="w-4 h-4 mr-2 text-bianco" />
                        Nome Tecnologia *
                      </label>
                            <input
                              type="text"
                              value={editForm.name || ''}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 text-bianco font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all"
                        placeholder="Es: React, Node.js, PostgreSQL"
                        maxLength={100}
                      />
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-semibold text-bianco mb-2">
                        <Code className="w-4 h-4 mr-2 text-bianco" />
                        Categoria *
                      </label>
                            <select
                        value={editForm.category || 'frontend'}
                              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 text-bianco font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all bg-scuro-2"
                      >
                        <option className='text-bianco bg-scuro-2' value="frontend">Frontend</option>
                        <option className='text-bianco bg-scuro-2' value="backend">Backend</option>
                        <option className='text-bianco bg-scuro-2' value="database">Database</option>
                            </select>
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-semibold text-bianco mb-2">
                        Percentuale Competenza
                      </label>
                            <input
                              type="number"
                        value={editForm.percent || 50}
                        onChange={(e) => setEditForm({ ...editForm, percent: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border-2 border-gray-200 text-bianco font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all"
                        placeholder="50"
                              min="0"
                              max="100"
                            />
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-semibold text-bianco mb-2">
                        <Rocket className="w-4 h-4 mr-2 text-bianco" />
                        Ordine di Visualizzazione
                      </label>
                      <input
                        type="number"
                        value={editForm.order_index || technologies.length + 1}
                        onChange={(e) => setEditForm({ ...editForm, order_index: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border-2 border-gray-200 text-bianco font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all"
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center text-sm font-semibold text-bianco mb-2">
                        <Code className="w-4 h-4 mr-2 text-bianco" />
                        Codice SVG (Icona)
                      </label>
                      <textarea
                        value={editForm.svg_code || '<svg></svg>'}
                        onChange={(e) => setEditForm({ ...editForm, svg_code: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 text-bianco font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all resize-none font-mono"
                        placeholder="<svg>...</svg>"
                        rows={4}
                      />
                      <p className="text-xs text-bianco mt-2 opacity-70">
                        Inserisci il codice SVG dell'icona della tecnologia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <p className="text-sm text-bianco">
                      <span className="text-red-500">*</span> Campi obbligatori
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setEditingItem(null);
                          setEditForm({});
                        }}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-scuro rounded-lg text-sm font-semibold flex items-center transition-colors"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Annulla
                      </button>
                      {editingItem?.id ? (
                              <button
                                onClick={handleSave}
                          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-bianco rounded-lg text-sm font-semibold flex items-center shadow-md hover:shadow-lg transition-all"
                              >
                          <Save className="w-4 h-4 mr-2" />
                          Salva Modifiche
                              </button>
                      ) : (
                              <button
                          onClick={handleCreateTechnology}
                          className="px-8 py-3 bg-chiaro hover:bg-chiaro-2 text-bianco rounded-lg text-sm font-semibold flex items-center shadow-md hover:shadow-lg transition-all"
                              >
                          <Plus className="w-5 h-5 mr-2" />
                          Crea Tecnologia
                              </button>
                      )}
                            </div>
                          </div>
                </div>
              )}

              {/* Stack Sub-tabs */}
              <div className="">
                <nav className="-mb-px flex space-x-8">
                  {stackTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveStackTab(tab.id)}
                      className={`py-2 mb-3 px-1 font-medium text-bianco text-sm ${activeStackTab === tab.id
                          ? ` text-bianco `
                          : ' text-chiaro hover:text-bianco '
                        }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Filtered Technologies */}
              {technologies.filter(tech => tech.category === activeStackTab).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {technologies
                    .filter(tech => tech.category === activeStackTab)
                    .map((tech) => (
                      <div key={tech.id} className={`admin-skill-card ${editingItem?.id === tech.id && editingItem?.type === 'technology' ? 'ring-2 ring-chiaro' : ''}`}>
                            <div className="flex items-start justify-between gap-3 mb-4">
                              <div className="flex items-center space-x-3 min-w-0">
                                <div
                                  className="admin-skill-card__icon p-2"
                                  dangerouslySetInnerHTML={{ __html: tech.svg_code }}
                                />
                                <div className="min-w-0">
                                  <h3 className="font-semibold text-bianco text-lg leading-tight truncate">{tech.name}</h3>
                                  <p className="text-xs uppercase tracking-[0.24em] text-bianco/38 mt-1">Skill</p>
                                </div>
                              </div>
                              <span className={`admin-skill-card__badge ${tech.category === 'frontend' ? 'admin-skill-card__badge--frontend' :
                                  tech.category === 'backend' ? 'admin-skill-card__badge--backend' :
                                    'admin-skill-card__badge--database'
                                }`}>
                                {tech.category}
                              </span>
                            </div>
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] uppercase tracking-[0.24em] text-bianco/42">Livello</span>
                                <span className="text-sm font-semibold text-bianco">{tech.percent}%</span>
                              </div>
                              <div className="admin-skill-card__progress">
                                <div
                                  className="admin-skill-card__progress-bar"
                                  style={{ width: `${tech.percent}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                              <button
                                onClick={() => handleEdit(tech, 'technology')}
                            className="text-bianco font-medium border-r pr-3 text-sm flex items-center hover:text-chiaro transition-colors"
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Modifica
                              </button>
                              <button
                                onClick={() => handleDelete(tech.id, 'technology')}
                                className="text-red-600 hover:text-red-900 font-medium text-sm flex items-center"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Elimina
                              </button>
                            </div>
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
            <div className="admin-section-panel p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-bianco">Strumenti di Lavoro</h2>
                {editingItem?.type !== 'tool' && (
                <button
                  onClick={() => handleAdd('tool')}
                  className="bg-scuro-2 text-white px-4 py-2 rounded-md text-sm font-medium border flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Aggiungi Strumento
                </button>
                )}
              </div>

              {/* Form di creazione nuovo strumento */}
              {editingItem?.type === 'tool' && editingItem?.id === null && (
                <div className="bg-scuro-2 border-2 border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-lg bg-chiaro-2 bg-opacity-20">
                        <Plus className="w-6 h-6 text-bianco" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold inter text-bianco">
                          Crea Nuovo Strumento
                        </h3>
                        <p className="text-sm text-bianco">
                          Compila i campi per aggiungere un nuovo strumento
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setEditForm({});
                      }}
                      className="text-bianco hover:text-chiaro p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="flex items-center text-sm font-semibold text-bianco mb-2">
                        <Type className="w-4 h-4 mr-2 text-bianco" />
                        Nome *
                      </label>
                      <input
                        type="text"
                        value={editForm?.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 text-bianco font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all"
                        placeholder="Es: VS Code"
                        maxLength={200}
                      />
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-semibold text-bianco mb-2">
                        <span className="mr-2">%</span>
                        Percentuale
                      </label>
                      <input
                        type="number"
                        value={editForm?.percent || 50}
                        onChange={(e) => setEditForm({ ...editForm, percent: parseInt(e.target.value) || 50 })}
                        className="w-full px-4 py-3 border-2 border-gray-200 text-bianco font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all"
                        placeholder="50"
                        min="0"
                        max="100"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center text-sm font-semibold text-bianco mb-2">
                        <Code className="w-4 h-4 mr-2 text-bianco" />
                        SVG Code
                      </label>
                      <textarea
                        value={editForm?.svg_code || '<svg></svg>'}
                        onChange={(e) => setEditForm({ ...editForm, svg_code: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 text-bianco font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all resize-none font-mono"
                        placeholder="<svg></svg>"
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setEditForm({});
                      }}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-scuro rounded-lg font-medium transition-colors flex items-center"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Annulla
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-6 py-3 bg-chiaro hover:bg-chiaro-2 text-bianco rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Salva Strumento
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {tools.map((tool) => (
                  <div key={tool.id} className="admin-skill-card">
                    {editingItem?.id === tool.id && editingItem?.type === 'tool' ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-3 py-2 border text-bianco font-medium border-gray-300 rounded-md text-sm"
                          placeholder="Nome strumento"
                        />
                        <input
                          type="number"
                          value={editForm.percent || ''}
                          onChange={(e) => setEditForm({ ...editForm, percent: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 border text-bianco font-medium border-gray-300 rounded-md text-sm"
                          placeholder="Percentuale"
                          min="0"
                          max="100"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            className="flex-1 bg-chiaro hover:bg-chiaro-2 text-white px-3 py-2 rounded-md text-sm flex items-center justify-center font-medium"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Salva
                          </button>
                          <button
                            onClick={() => setEditingItem(null)}
                            className="flex-1 bg-chiaro hover:bg-chiaro-2 text-white px-3 py-2 rounded-md text-sm flex items-center justify-center font-medium"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Annulla
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center space-x-3 min-w-0">
                          <div
                            className="admin-skill-card__icon p-2"
                            dangerouslySetInnerHTML={{ __html: tool.svg_code }}
                          />
                            <div className="min-w-0">
                              <h3 className="font-semibold text-bianco text-lg leading-tight truncate">{tool.name}</h3>
                              <p className="text-xs uppercase tracking-[0.24em] text-bianco/38 mt-1">Tool</p>
                            </div>
                          </div>
                          <span className="admin-skill-card__badge admin-skill-card__badge--tool">
                            Tool
                          </span>
                        </div>
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] uppercase tracking-[0.24em] text-bianco/42">Padronanza</span>
                            <span className="text-sm font-semibold text-bianco">{tool.percent}%</span>
                          </div>
                          <div className="admin-skill-card__progress">
                            <div
                              className="admin-skill-card__progress-bar"
                              style={{ width: `${tool.percent}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                          <button
                            onClick={() => handleEdit(tool, 'tool')}
                            className="text-bianco font-medium border-r pr-3 text-sm flex items-center hover:text-chiaro transition-colors"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Modifica
                          </button>
                          <button
                            onClick={() => handleDelete(tool.id, 'tool')}
                            className="text-red-600 hover:text-red-900 font-medium text-sm flex items-center"
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
            <div className="admin-section-panel p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-bianco">Progetti</h2>
                {editingItem?.type !== 'project' && (
                  <button
                    onClick={() => handleAdd('project')}
                    className="bg-scuro-2 text-white px-4 py-2 rounded-md text-sm font-medium border flex items-center"
                
                  >
                    <Plus className="w-4 h-4 mr-2 text-bianco" />
                    Aggiungi Progetto
                  </button>
                )}
              </div>

              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-xl font-bold text-bianco">Griglia Progetti</h3>
                    <p className="text-sm text-bianco/70">
                      Trascina le card per cambiare l'ordine visualizzato nel sito.
                    </p>
                  </div>
                  <div className="text-xs text-bianco/60">
                    {isReorderingProjects ? 'Salvataggio ordine in corso...' : 'Drag and drop attivo'}
                  </div>
                </div>

                {projects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {projects.map((project) => {
                      const isDragged = draggedProjectId === project.id;
                      const isEditing = editingItem?.id === project.id && editingItem?.type === 'project';

                      return (
                        <div
                          key={project.id}
                          draggable={!isReorderingProjects}
                          onDragStart={() => handleProjectDragStart(project.id)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => handleProjectDrop(project.id)}
                          onDragEnd={() => setDraggedProjectId(null)}
                          className={`rounded-2xl border p-3 transition-all duration-200 bg-bianco text-scuro shadow-sm ${
                            isDragged
                              ? 'opacity-50 scale-[0.98] border-chiaro'
                              : 'border-gray-200 hover:border-chiaro/60 hover:shadow-lg'
                          } ${isEditing ? 'ring-2 ring-chiaro' : ''}`}
                        >
                          {project.cover_image ? (
                            <div className="relative mb-3 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                              <div className="absolute top-2 left-2 z-10 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold tracking-wide text-gray-600 shadow-sm">
                                #{project.order_index || 0}
                              </div>
                              <div className="absolute top-2 right-2 z-10 cursor-grab active:cursor-grabbing rounded-full bg-white/90 p-1.5 text-gray-500 shadow-sm">
                                <GripVertical className="w-4 h-4" />
                              </div>
                              <img
                                src={project.cover_image}
                                alt={project.title}
                                className="w-full aspect-1080/1300 object-cover"
                                loading="lazy"
                              />
                            </div>
                          ) : (
                            <div className="relative mb-3 w-full aspect-1080/1300 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400">
                              <div className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold tracking-wide text-gray-600 shadow-sm">
                                #{project.order_index || 0}
                              </div>
                              <div className="absolute top-2 right-2 cursor-grab active:cursor-grabbing rounded-full bg-white/90 p-1.5 text-gray-500 shadow-sm">
                                <GripVertical className="w-4 h-4" />
                              </div>
                              Nessuna cover
                            </div>
                          )}

                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-bold text-base leading-tight line-clamp-2 min-w-0">
                              {project.title}
                            </h4>
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => handleEdit(project, 'project')}
                                className="text-scuro font-medium text-sm flex items-center hover:text-chiaro transition-colors"
                                aria-label={`Modifica ${project.title}`}
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(project.id, 'project')}
                                className="text-scuro text-sm hover:text-chiaro flex items-center transition-colors"
                                aria-label={`Elimina ${project.title}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-6 py-12 text-center bg-bianco rounded-2xl">
                    <Rocket className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium text-scuro">Nessun progetto ancora</p>
                    <p className="text-sm text-scuro">Usa il bottone "Aggiungi Progetto" per creare il tuo primo progetto</p>
                  </div>
                )}
              </div>

              {/* Form di creazione/modifica progetto */}
              {(editingItem?.type === 'project' && editForm) && (
                <div className="bg-scuro-2 border-2 border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${editingItem?.id ? 'bg-green-100' : 'bg-chiaro-2 bg-opacity-20'}`}>
                        {editingItem?.id ? (
                          <Edit className="w-6 h-6 text-bianco" />
                        ) : (
                          <Plus className="w-6 h-6 text-bianco" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold inter text-bianco">
                          {editingItem?.id ? 'Modifica Progetto' : 'Crea Nuovo Progetto'}
                        </h3>
                        <p className="text-sm text-bianco">
                          {editingItem?.id ? 'Aggiorna le informazioni del progetto' : 'Compila i campi per aggiungere un nuovo progetto'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setEditForm({});
                        setCoverImageFile(null);
                        setCoverImagePreview(null);
                        setProjectImages({ pc: [], tablet: [], mobile: [] });
                        setProjectTechnologies({ frontend: [], backend: [], database: [] });
                      }}
                      className="text-bianco hover:text-chiaro p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      disabled={uploadingImage || uploadingProjectImages}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="md:col-span-2">
                      <label className="flex items-center text-sm font-semibold text-bianco mb-2">
                        <Type className="w-4 h-4 mr-2 text-bianco" />
                        Titolo *
                      </label>
                      <input
                        type="text"
                        value={editForm?.title || ''}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 text-bianco font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all"
                        placeholder="Es: Portfolio Moderno"
                        maxLength={200}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center text-sm font-semibold text-bianco mb-2">
                        <FileText className="w-4 h-4 mr-2 text-bianco" />
                        Descrizione
                      </label>
                      <textarea
                        value={editForm?.description || ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 text-bianco font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all resize-none"
                        placeholder="Descrizione dettagliata del progetto"
                        rows={4}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center text-sm font-semibold text-bianco mb-2">
                        <Image className="w-4 h-4 mr-2 text-bianco" />
                        Immagine Copertina
                      </label>

                      {/* Input file */}
                      <div className="mb-3">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-scuro-2 hover:bg-gray-100 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="mb-2 text-sm text-bianco">
                              <span className="font-semibold">Clicca per caricare</span> o trascina qui
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageSelect}
                            disabled={uploadingImage}
                          />
                        </label>
                      </div>

                      {/* Anteprima immagine */}
                      {coverImagePreview && (
                        <div className="relative inline-block">
                          <div className="relative w-full max-w-md">
                            <img
                              src={coverImagePreview}
                              alt="Anteprima copertina"
                              className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
                              disabled={uploadingImage}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Loader durante upload */}
                      {uploadingImage && (
                        <div className="mt-2 flex items-center text-sm text-chiaro">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-chiaro mr-2"></div>
                          Caricamento immagine...
                        </div>
                      )}
                    </div>

                    {/* Sezione Immagini Progetto per Dispositivo */}
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center text-sm font-semibold text-bianco">
                          <Image className="w-5 h-5 mr-2 text-bianco" />
                          Immagini del Progetto (divise per dispositivo)
                        </label>
                        <div className="flex items-center gap-4 text-xs text-bianco">
                          <span className="flex items-center">
                            <Monitor className="w-4 h-4 mr-1" />
                            PC: {projectImages.pc.length}
                          </span>
                          <span className="flex items-center">
                            <Tablet className="w-4 h-4 mr-1" />
                            Tablet: {projectImages.tablet.length}
                          </span>
                          <span className="flex items-center">
                            <Smartphone className="w-4 h-4 mr-1" />
                            Mobile: {projectImages.mobile.length}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* PC Images */}
                        <div className="border-2 border-gray-200 rounded-xl p-5 bg-scuro-2 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <div className="p-2 bg-chiaro rounded-lg mr-2">
                                <Monitor className="w-5 h-5 text-bianco" />
                              </div>
                              <div>
                                <h4 className="font-bold text-bianco">PC / Desktop</h4>
                                <p className="text-xs text-gray-500">{projectImages.pc.length} {projectImages.pc.length === 1 ? 'immagine' : 'immagini'}</p>
                              </div>
                            </div>
                          </div>
                          <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-scuro-2 hover:bg-gray-50 hover:border-chiaro transition-all mb-4 group">
                            <div className="flex flex-col items-center">
                              <Upload className="w-6 h-6 mb-2 text-bianco group-hover:text-chiaro transition-colors" />
                              <p className="text-sm font-medium text-bianco group-hover:text-chiaro transition-colors">Aggiungi immagini</p>
                              <p className="text-xs text-bianco mt-1">PNG, JPG, WEBP</p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleProjectImageSelect(e, 'pc')}
                              disabled={uploadingProjectImages || uploadingImage}
                            />
                          </label>
                          <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                            {projectImages.pc.length > 0 ? (
                              projectImages.pc.map((img, index) => (
                                <div key={index} className="relative group bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-chiaro transition-all shadow-sm">
                                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded z-10">
                                    #{index + 1}
                                  </div>
                                  <img
                                    src={img.preview || img.image_url}
                                    alt={`PC ${index + 1}`}
                                    className="w-full h-40 object-contain bg-gray-50"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveProjectImage('pc', index, img.id)}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                    disabled={uploadingProjectImages}
                                    title="Rimuovi immagine"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-50 transition-opacity h-12"></div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-8 text-bianco">
                                <Monitor className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Nessuna immagine</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Tablet Images */}
                        <div className="border-2 border-gray-200 rounded-xl p-5 bg-scuro-2 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <div className="p-2 bg-chiaro rounded-lg mr-2">
                                <Tablet className="w-5 h-5 text-bianco" />
                              </div>
                              <div>
                                <h4 className="font-bold text-bianco">Tablet</h4>
                                <p className="text-xs text-bianco">{projectImages.tablet.length} {projectImages.tablet.length === 1 ? 'immagine' : 'immagini'}</p>
                              </div>
                            </div>
                          </div>
                          <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-scuro-2 hover:bg-gray-50 hover:border-chiaro transition-all mb-4 group">
                            <div className="flex flex-col items-center">
                              <Upload className="w-6 h-6 mb-2 text-bianco group-hover:text-chiaro transition-colors" />
                              <p className="text-sm font-medium text-bianco group-hover:text-chiaro transition-colors">Aggiungi immagini</p>
                              <p className="text-xs text-bianco mt-1">PNG, JPG, WEBP</p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleProjectImageSelect(e, 'tablet')}
                              disabled={uploadingProjectImages || uploadingImage}
                            />
                          </label>
                          <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                            {projectImages.tablet.length > 0 ? (
                              projectImages.tablet.map((img, index) => (
                                <div key={index} className="relative group bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-chiaro transition-all shadow-sm">
                                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded z-10">
                                    #{index + 1}
                                  </div>
                                  <img
                                    src={img.preview || img.image_url}
                                    alt={`Tablet ${index + 1}`}
                                    className="w-full h-40 object-contain bg-gray-50"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveProjectImage('tablet', index, img.id)}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                    disabled={uploadingProjectImages}
                                    title="Rimuovi immagine"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-50 transition-opacity h-12"></div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-8 text-bianco">
                                <Tablet className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Nessuna immagine</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Mobile Images */}
                        <div className="border-2 border-gray-200 rounded-xl p-5 bg-scuro-2 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <div className="p-2 bg-chiaro rounded-lg mr-2">
                                <Smartphone className="w-5 h-5 text-bianco" />
                              </div>
                              <div>
                                <h4 className="font-bold text-bianco">Mobile</h4>
                                <p className="text-xs text-bianco">{projectImages.mobile.length} {projectImages.mobile.length === 1 ? 'immagine' : 'immagini'}</p>
                              </div>
                            </div>
                          </div>
                          <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-scuro-2 hover:bg-gray-50 hover:border-chiaro transition-all mb-4 group">
                            <div className="flex flex-col items-center">
                              <Upload className="w-6 h-6 mb-2 text-bianco group-hover:text-chiaro transition-colors" />
                              <p className="text-sm font-medium text-bianco group-hover:text-chiaro transition-colors">Aggiungi immagini</p>
                              <p className="text-xs text-bianco mt-1">PNG, JPG, WEBP</p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleProjectImageSelect(e, 'mobile')}
                              disabled={uploadingProjectImages || uploadingImage}
                            />
                          </label>
                          <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                            {projectImages.mobile.length > 0 ? (
                              projectImages.mobile.map((img, index) => (
                                <div key={index} className="relative group bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-chiaro transition-all shadow-sm">
                                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded z-10">
                                    #{index + 1}
                                  </div>
                                  <img
                                    src={img.preview || img.image_url}
                                    alt={`Mobile ${index + 1}`}
                                    className="w-full h-40 object-contain bg-gray-50"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveProjectImage('mobile', index, img.id)}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                    disabled={uploadingProjectImages}
                                    title="Rimuovi immagine"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-50 transition-opacity h-12"></div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-8 text-bianco">
                                <Smartphone className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Nessuna immagine</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Loader durante upload immagini progetto */}
                      {uploadingProjectImages && (
                        <div className="mt-4 flex items-center justify-center text-sm text-scuro bg-chiaro bg-opacity-10 rounded-lg p-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-chiaro mr-3"></div>
                          Caricamento immagini progetto in corso...
                        </div>
                      )}
                    </div>

                    {/* Sezione Tecnologie del Progetto */}
                    <div className="md:col-span-2">
                      <label className="flex items-center text-sm font-semibold text-bianco mb-4">
                        <Code className="w-4 h-4 mr-2 text-bianco" />
                        Tecnologie Utilizzate
                      </label>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Frontend Technologies */}
                        <div className="border-2 border-gray-200 rounded-xl p-5 bg-scuro-2 shadow-sm">
                          <div className="flex items-center mb-4">
                            <div className="p-2 bg-blue-500 rounded-lg mr-2">
                              <Code className="w-5 h-5 text-bianco" />
                            </div>
                            <div>
                              <h4 className="font-bold text-bianco">Frontend</h4>
                              <p className="text-xs text-bianco">
                                {projectTechnologies.frontend.length} {projectTechnologies.frontend.length === 1 ? 'tecnologia selezionata' : 'tecnologie selezionate'}
                              </p>
                            </div>
                          </div>
                          <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                            {technologies.filter(tech => tech.category === 'frontend').length > 0 ? (
                              technologies
                                .filter(tech => tech.category === 'frontend')
                                .map((tech) => (
                                  <label
                                    key={tech.id}
                                    className="flex items-center p-3 bg-scuro-1 rounded-lg hover:bg-scuro cursor-pointer transition-colors"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={projectTechnologies.frontend.includes(tech.id)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setProjectTechnologies(prev => ({
                                            ...prev,
                                            frontend: [...prev.frontend, tech.id]
                                          }));
                                        } else {
                                          setProjectTechnologies(prev => ({
                                            ...prev,
                                            frontend: prev.frontend.filter(id => id !== tech.id)
                                          }));
                                        }
                                      }}
                                      className="w-5 h-5 text-chiaro border-gray-300 rounded focus:ring-chiaro mr-3"
                                      disabled={uploadingImage || uploadingProjectImages}
                                    />
                                    <div
                                      className="w-6 h-6 rounded flex items-center justify-center mr-2"
                                      dangerouslySetInnerHTML={{ __html: tech.svg_code }}
                                    />
                                    <span className="text-bianco font-medium">{tech.name}</span>
                                  </label>
                                ))
                            ) : (
                              <div className="text-center py-8 text-bianco">
                                <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Nessuna tecnologia frontend disponibile</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Backend Technologies */}
                        <div className="border-2 border-gray-200 rounded-xl p-5 bg-scuro-2 shadow-sm">
                          <div className="flex items-center mb-4">
                            <div className="p-2 bg-green-500 rounded-lg mr-2">
                              <Code className="w-5 h-5 text-bianco" />
                            </div>
                            <div>
                              <h4 className="font-bold text-bianco">Backend</h4>
                              <p className="text-xs text-bianco">
                                {projectTechnologies.backend.length} {projectTechnologies.backend.length === 1 ? 'tecnologia selezionata' : 'tecnologie selezionate'}
                              </p>
                            </div>
                          </div>
                          <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                            {technologies.filter(tech => tech.category === 'backend').length > 0 ? (
                              technologies
                                .filter(tech => tech.category === 'backend')
                                .map((tech) => (
                                  <label
                                    key={tech.id}
                                    className="flex items-center p-3 bg-scuro-1 rounded-lg hover:bg-scuro cursor-pointer transition-colors"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={projectTechnologies.backend.includes(tech.id)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setProjectTechnologies(prev => ({
                                            ...prev,
                                            backend: [...prev.backend, tech.id]
                                          }));
                                        } else {
                                          setProjectTechnologies(prev => ({
                                            ...prev,
                                            backend: prev.backend.filter(id => id !== tech.id)
                                          }));
                                        }
                                      }}
                                      className="w-5 h-5 text-chiaro border-gray-300 rounded focus:ring-chiaro mr-3"
                                      disabled={uploadingImage || uploadingProjectImages}
                                    />
                                    <div
                                      className="w-6 h-6 rounded flex items-center justify-center mr-2"
                                      dangerouslySetInnerHTML={{ __html: tech.svg_code }}
                                    />
                                    <span className="text-bianco font-medium">{tech.name}</span>
                                  </label>
                                ))
                            ) : (
                              <div className="text-center py-8 text-bianco">
                                <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Nessuna tecnologia backend disponibile</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Database Technologies */}
                        <div className="border-2 border-gray-200 rounded-xl p-5 bg-scuro-2 shadow-sm">
                          <div className="flex items-center mb-4">
                            <div className="p-2 bg-purple-500 rounded-lg mr-2">
                              <Code className="w-5 h-5 text-bianco" />
                            </div>
                            <div>
                              <h4 className="font-bold text-bianco">Database</h4>
                              <p className="text-xs text-bianco">
                                {projectTechnologies.database.length} {projectTechnologies.database.length === 1 ? 'tecnologia selezionata' : 'tecnologie selezionate'}
                              </p>
                            </div>
                          </div>
                          <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                            {technologies.filter(tech => tech.category === 'database').length > 0 ? (
                              technologies
                                .filter(tech => tech.category === 'database')
                                .map((tech) => (
                                  <label
                                    key={tech.id}
                                    className="flex items-center p-3 bg-scuro-1 rounded-lg hover:bg-scuro cursor-pointer transition-colors"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={projectTechnologies.database.includes(tech.id)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setProjectTechnologies(prev => ({
                                            ...prev,
                                            database: [...prev.database, tech.id]
                                          }));
                                        } else {
                                          setProjectTechnologies(prev => ({
                                            ...prev,
                                            database: prev.database.filter(id => id !== tech.id)
                                          }));
                                        }
                                      }}
                                      className="w-5 h-5 text-chiaro border-gray-300 rounded focus:ring-chiaro mr-3"
                                      disabled={uploadingImage || uploadingProjectImages}
                                    />
                                    <div
                                      className="w-6 h-6 rounded flex items-center justify-center mr-2"
                                      dangerouslySetInnerHTML={{ __html: tech.svg_code }}
                                    />
                                    <span className="text-bianco font-medium">{tech.name}</span>
                                  </label>
                                ))
                            ) : (
                              <div className="text-center py-8 text-bianco">
                                <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Nessuna tecnologia database disponibile</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-semibold text-bianco mb-2">
                        <Link className="w-4 h-4 mr-2 text-chiaro" />
                        URL GitHub
                      </label>
                      <input
                        type="url"
                        value={editForm?.github_url || ''}
                        onChange={(e) => setEditForm({ ...editForm, github_url: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 text-bianco font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all"
                        placeholder="https://github.com/user/repo"
                      />
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-semibold text-bianco mb-2">
                        <Globe className="w-4 h-4 mr-2 text-chiaro" />
                        URL Dominio
                      </label>
                      <input
                        type="url"
                        value={editForm?.domain_url || ''}
                        onChange={(e) => setEditForm({ ...editForm, domain_url: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 text-bianco font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all"
                        placeholder="https://esempio.com"
                      />
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-semibold text-bianco mb-2">
                        <Rocket className="w-4 h-4 mr-2 text-chiaro" />
                        Ordine di Visualizzazione
                      </label>
                      <input
                        type="number"
                        value={editForm?.order_index || 0}
                        onChange={(e) => setEditForm({ ...editForm, order_index: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border-2 border-gray-200 text-bianco font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all"
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center text-sm font-semibold text-bianco cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editForm?.featured || false}
                          onChange={(e) => setEditForm({ ...editForm, featured: e.target.checked })}
                          className="w-5 h-5 text-chiaro border-gray-300 rounded focus:ring-chiaro mr-2"
                        />
                        Progetto in Evidenza
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <p className="text-sm text-bianco">
                      <span className="text-red-500">*</span> Campi obbligatori
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setEditingItem(null);
                          setEditForm({});
                          setCoverImageFile(null);
                          setCoverImagePreview(null);
                          setProjectImages({ pc: [], tablet: [], mobile: [] });
                          setProjectTechnologies({ frontend: [], backend: [], database: [] });
                        }}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-scuro rounded-lg text-sm font-semibold flex items-center transition-colors"
                        disabled={uploadingImage || uploadingProjectImages}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Annulla
                      </button>
                      {editingItem?.id ? (
                        <button
                          onClick={handleSave}
                          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-bianco rounded-lg text-sm font-semibold flex items-center shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={uploadingImage || uploadingProjectImages}
                        >
                          {uploadingImage ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Caricamento...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Salva Modifiche
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={handleCreateProject}
                          className="px-8 py-3 bg-chiaro hover:bg-chiaro-2 text-bianco rounded-lg text-sm font-semibold flex items-center shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={uploadingImage || uploadingProjectImages}
                        >
                          {uploadingImage ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Caricamento...
                            </>
                          ) : (
                            <>
                              <Plus className="w-5 h-5 mr-2" />
                              Crea Progetto
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Anteprima progetti con card */}
              {projects.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-bianco mb-4">Anteprima Progetti</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <CardAnteprimaProgetti
                        key={project.id}
                        title={project.title}
                        description={project.description || ''}
                        imageUrl={project.cover_image || ''}
                        link={project.domain_url || null}
                      />
                    ))}
                  </div>
                </div>
              )}


            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div className="admin-section-panel p-6">
              <h2 className="text-2xl font-bold text-bianco mb-6">Templates</h2>

              {/* Form in alto - larghezza piena */}
              <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${editingItem?.type === 'template' ? 'bg-green-100' : 'bg-chiaro-2 bg-opacity-20'}`}>
                      {editingItem?.type === 'template' ? (
                        <Edit className="w-6 h-6 text-green-600" />
                      ) : (
                        <Plus className="w-6 h-6 text-chiaro" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-bianco">
                        {editingItem?.type === 'template' ? 'Modifica Template' : 'Crea Nuovo Template'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {editingItem?.type === 'template' ? 'Aggiorna le informazioni del template' : 'Compila i campi per aggiungere un nuovo template'}
                      </p>
                    </div>
                  </div>
                  {editingItem?.type === 'template' && (
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setEditForm({});
                      }}
                      className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="lg:col-span-1">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Type className="w-4 h-4 mr-2 text-chiaro" />
                      Nome Template *
                    </label>
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 text-scuro font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all"
                      placeholder="Es: Portfolio Moderno"
                    />
                  </div>

                  <div className="lg:col-span-1">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Link className="w-4 h-4 mr-2 text-chiaro" />
                      URL del Sito *
                    </label>
                    <input
                      type="url"
                      value={editForm.site_url || ''}
                      onChange={(e) => setEditForm({ ...editForm, site_url: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 text-scuro font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all"
                      placeholder="https://esempio.com"
                    />
                  </div>

                  <div className="lg:col-span-1">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Image className="w-4 h-4 mr-2 text-chiaro" />
                      URL Immagine Copertina
                    </label>
                    <input
                      type="url"
                      value={editForm.cover_url || ''}
                      onChange={(e) => setEditForm({ ...editForm, cover_url: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 text-scuro font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all"
                      placeholder="https://esempio.com/img.jpg"
                    />
                  </div>

                  <div className="lg:col-span-1">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Tags className="w-4 h-4 mr-2 text-chiaro" />
                      Tags
                    </label>
                    <input
                      type="text"
                      value={editForm.tags?.join(', ') || ''}
                      onChange={(e) => setEditForm({ ...editForm, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                      className="w-full px-4 py-3 border-2 border-gray-200 text-scuro font-medium rounded-lg text-sm focus:border-chiaro focus:ring-2 focus:ring-chiaro focus:ring-opacity-20 transition-all"
                      placeholder="react, tailwind, nextjs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    <span className="text-red-500">*</span> Campi obbligatori
                  </p>
                  {editingItem?.type === 'template' ? (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setEditingItem(null);
                          setEditForm({});
                        }}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold flex items-center transition-colors"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Annulla
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold flex items-center shadow-md hover:shadow-lg transition-all"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Salva Modifiche
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={async () => {
                        if (!editForm.name || !editForm.site_url) {
                          alert('Nome e URL del sito sono obbligatori');
                          return;
                        }
                        try {
                          const { error } = await supabase
                            .from('templates')
                            .insert({
                              name: editForm.name,
                              site_url: editForm.site_url,
                              cover_url: editForm.cover_url || null,
                              tags: editForm.tags || []
                            });

                          if (error) throw error;

                          await loadData();
                          setEditForm({});
                        } catch (error) {
                          console.error('Errore nella creazione:', error);
                          alert('Errore nella creazione del template');
                        }
                      }}
                      className="px-8 py-3 bg-chiaro hover:bg-chiaro-2 text-white rounded-lg text-sm font-semibold flex items-center shadow-md hover:shadow-lg transition-all"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Crea Template
                    </button>
                  )}
                </div>
              </div>

              {/* Lista Templates sotto */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-bianco flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-chiaro" />
                    Templates Salvati ({templates.length})
                  </h3>
                  {templates.length > templatesPerPage && (
                    <div className="text-sm text-bianco">
                      Pagina {templatesCurrentPage} di {Math.ceil(templates.length / templatesPerPage)}
                    </div>
                  )}
                </div>

                {templates.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                      {templates
                        .slice((templatesCurrentPage - 1) * templatesPerPage, templatesCurrentPage * templatesPerPage)
                        .map((template) => (
                      <div
                        key={template.id}
                        className={`border-2 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300 ${editingItem?.id === template.id
                            ? 'ring-4 ring-chiaro ring-opacity-50 border-chiaro shadow-lg scale-105'
                            : 'border-gray-200 hover:border-chiaro'
                          }`}
                      >
                        {template.cover_url && (
                          <div className="p-1 w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative group">
                            <img
                              src={template.cover_url}
                              alt={template.name}
                              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x225?text=Immagine+non+disponibile';
                              }}
                            />
                            {editingItem?.id === template.id && (
                              <div className="absolute top-2 right-2 bg-chiaro text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center">
                                <Edit className="w-3 h-3 mr-1" />
                                In modifica
                              </div>
                            )}
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-bold text-bianco mb-3 text-base flex items-center">
                            <Type className="w-4 h-4 mr-2 text-chiaro flex-shrink-0" />
                            <span className="truncate">{template.name}</span>
                          </h3>
                          <a
                            href={template.site_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-chiaro hover:text-chiaro-2 font-medium flex items-center mb-3 hover:underline transition-colors"
                          >
                            <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="truncate">Visita sito</span>
                          </a>
                          {template.tags && template.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {template.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 text-xs bg-chiaro bg-opacity-10 text-chiaro font-medium rounded-full border border-chiaro border-opacity-20"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flex space-x-2 pt-3 border-t border-gray-100">
                            <button
                              onClick={() => handleEdit(template, 'template')}
                              className="flex-1 bg-scuro-2 hover:bg-scuro text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center transition-colors"
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Modifica
                            </button>
                            <button
                              onClick={() => handleDelete(template.id, 'template')}
                              className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg text-sm font-semibold flex items-center justify-center transition-colors"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Elimina
                            </button>
                          </div>
                        </div>
                      </div>
                        ))}
                    </div>

                    {/* Controlli paginazione */}
                    {templates.length > templatesPerPage && (
                      <div className="flex items-center justify-center gap-2 mt-6">
                        <button
                          onClick={() => setTemplatesCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={templatesCurrentPage === 1}
                          className="px-4 py-2 bg-scuro-2 text-bianco rounded-lg font-medium flex items-center gap-2 hover:bg-scuro transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Precedente
                        </button>
                        
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.ceil(templates.length / templatesPerPage) }, (_, i) => i + 1).map((page) => {
                            // Mostra sempre la prima, l'ultima, la pagina corrente e quelle adiacenti
                            const totalPages = Math.ceil(templates.length / templatesPerPage);
                            const showPage = 
                              page === 1 || 
                              page === totalPages || 
                              (page >= templatesCurrentPage - 1 && page <= templatesCurrentPage + 1);
                            
                            if (!showPage) {
                              // Mostra ellipsis
                              if (page === templatesCurrentPage - 2 || page === templatesCurrentPage + 2) {
                                return <span key={page} className="px-2 text-bianco">...</span>;
                              }
                              return null;
                            }
                            
                            return (
                              <button
                                key={page}
                                onClick={() => setTemplatesCurrentPage(page)}
                                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                                  templatesCurrentPage === page
                                    ? 'bg-chiaro text-bianco'
                                    : 'bg-scuro-2 text-bianco hover:bg-scuro'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => setTemplatesCurrentPage(prev => Math.min(Math.ceil(templates.length / templatesPerPage), prev + 1))}
                          disabled={templatesCurrentPage >= Math.ceil(templates.length / templatesPerPage)}
                          className="px-4 py-2 bg-scuro-2 text-bianco rounded-lg font-medium flex items-center gap-2 hover:bg-scuro transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Successiva
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-lg font-semibold text-gray-600 mb-2">Nessun template ancora</p>
                    <p className="text-sm text-gray-500">Usa il form qui sopra per creare il tuo primo template</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default TabbedDashboard;
