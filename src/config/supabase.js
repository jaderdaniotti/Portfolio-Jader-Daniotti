import { createClient } from '@supabase/supabase-js'

// Configurazione Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Credenziali Supabase mancanti! Controlla il file .env')
}

// Crea il client Supabase per operazioni pubbliche
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Crea il client Supabase per operazioni amministrative (se necessario)
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

// Funzioni per il portfolio
export const portfolioAPI = {
  // Recupera informazioni profilo
  async getProfile() {
    try {
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Errore nel recupero profilo:', error)
      return { success: false, error: error.message }
    }
  },

  // Recupera progetti
  async getProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Errore nel recupero progetti:', error)
      return { success: false, error: error.message }
    }
  },

  // Recupera tools
  async getTools() {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('percent', { ascending: false })

      if (error) throw error
      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Errore nel recupero tools:', error)
      return { success: false, error: error.message }
    }
  },

  // Recupera tecnologie
  async getTechnologies() {
    try {
      const { data, error } = await supabase
        .from('technologies')
        .select('*')
        .order('percent', { ascending: false })

      if (error) throw error
      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Errore nel recupero tecnologie:', error)
      return { success: false, error: error.message }
    }
  },

  // Recupera tecnologie per categoria (frontend, backend, database)
  async getTechnologiesByCategory(category) {
    try {
      const { data, error } = await supabase
        .from('technologies')
        .select('*')
        .eq('category', category)
        .order('percent', { ascending: false })

      if (error) throw error
      return { success: true, data: data || [] }
    } catch (error) {
      console.error(`Errore nel recupero tecnologie ${category}:`, error)
      return { success: false, error: error.message }
    }
  },

  // Recupera tools
  async getTools() {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('percent', { ascending: false })

      if (error) throw error
      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Errore nel recupero tools:', error)
      return { success: false, error: error.message }
    }
  },

  // Recupera esperienze lavorative
  async getExperiences() {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Errore nel recupero esperienze:', error)
      return { success: false, error: error.message }
    }
  },

  // Recupera certificazioni
  async getCertifications() {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Errore nel recupero certificazioni:', error)
      return { success: false, error: error.message }
    }
  },

  // Invia messaggio di contatto
  async sendContactMessage({ name, email, subject, message }) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name,
            email,
            subject: subject || 'Messaggio dal portfolio',
            message,
            created_at: new Date().toISOString()
          }
        ])

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Errore nell\'invio messaggio:', error)
      return { success: false, error: error.message }
    }
  },

  // Recupera statistiche portfolio
  async getStats() {
    try {
      const [projectsResult, skillsResult, messagesResult] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('skills').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true })
      ])

      return {
        success: true,
        data: {
          projects: projectsResult.count || 0,
          skills: skillsResult.count || 0,
          messages: messagesResult.count || 0
        }
      }
    } catch (error) {
      console.error('Errore nel recupero statistiche:', error)
      return { success: false, error: error.message }
    }
  }
}

// Funzioni per upload file (Supabase Storage)
export const storageAPI = {
  // Upload immagine
  async uploadImage(file, path) {
    try {
      const { data, error } = await supabase.storage
        .from(import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'portfolio-assets')
        .upload(path, file)

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Errore nell\'upload immagine:', error)
      return { success: false, error: error.message }
    }
  },

  // Ottieni URL pubblico
  getPublicUrl(path) {
    const { data } = supabase.storage
      .from(import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'portfolio-assets')
      .getPublicUrl(path)
    
    return data.publicUrl
  },

  // Elimina file
  async deleteFile(path) {
    try {
      const { error } = await supabase.storage
        .from(import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'portfolio-assets')
        .remove([path])

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Errore nell\'eliminazione file:', error)
      return { success: false, error: error.message }
    }
  }
}

export default supabase
