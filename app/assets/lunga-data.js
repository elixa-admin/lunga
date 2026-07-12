/**
 * LUNGA — Auth & Data Module
 * Handles: signup, login, logout, profile sync, logo upload,
 * client CRUD, invoice save/history, saved items.
 * 
 * All data is tenant-isolated via Supabase RLS.
 * Requires: supabase-config.js loaded first.
 */

const LungaData = {
  client: null,
  user: null,
  profile: null,

  // ---- Initialize (call on page load) ----
  async init() {
    if (!window.LungaSupabase) {
      console.warn('Supabase config not loaded — running in local-only mode');
      return false;
    }
    try {
      this.client = await window.LungaSupabase.loadSupabase();
      const { data: { session } } = await this.client.auth.getSession();
      if (session) {
        this.user = session.user;
        await this.loadProfile();
      }
      return true;
    } catch (e) {
      console.warn('Supabase init failed — local-only mode:', e.message);
      return false;
    }
  },

  // ---- AUTH ----

  async signUp(email, password) {
    const { data, error } = await this.client.auth.signUp({ email, password });
    if (error) throw error;
    this.user = data.user;
    return data;
  },

  async signIn(email, password) {
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    this.user = data.user;
    await this.loadProfile();
    return data;
  },

  async signOut() {
    await this.client.auth.signOut();
    this.user = null;
    this.profile = null;
  },

  isLoggedIn() {
    return !!this.user;
  },

  // ---- PROFILE (business details) ----

  async loadProfile() {
    if (!this.user) return null;
    const { data, error } = await this.client
      .from('profiles')
      .select('*')
      .eq('user_id', this.user.id)
      .single();
    if (error && error.code !== 'PGRST116') {
      console.warn('Profile load error:', error.message);
      return null;
    }
    this.profile = data;
    return data;
  },

  async saveProfile(updates) {
    if (!this.user) throw new Error('Not logged in');
    const { data, error } = await this.client
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', this.user.id)
      .select()
      .single();
    if (error) throw error;
    this.profile = data;
    return data;
  },

  // ---- LOGO UPLOAD ----

  async uploadLogo(file) {
    if (!this.user) throw new Error('Not logged in');
    const ext = file.name.split('.').pop().toLowerCase();
    const path = `${this.user.id}/logo.${ext}`;
    
    const { error: uploadError } = await this.client.storage
      .from('logos')
      .upload(path, file, { upsert: true, contentType: file.type });
    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = this.client.storage
      .from('logos')
      .getPublicUrl(path);

    await this.saveProfile({ logo_url: publicUrl });
    return publicUrl;
  },

  // ---- CLIENTS (the subscriber's customers) ----

  async getClients() {
    if (!this.user) return [];
    const { data, error } = await this.client
      .from('clients')
      .select('*')
      .eq('user_id', this.user.id)
      .order('name');
    if (error) throw error;
    return data || [];
  },

  async saveClient(client) {
    if (!this.user) throw new Error('Not logged in');
    const payload = { ...client, user_id: this.user.id };
    if (client.id) {
      const { data, error } = await this.client.from('clients').update(payload).eq('id', client.id).select().single();
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await this.client.from('clients').insert(payload).select().single();
      if (error) throw error;
      return data;
    }
  },

  async deleteClient(clientId) {
    if (!this.user) throw new Error('Not logged in');
    const { error } = await this.client.from('clients').delete().eq('id', clientId);
    if (error) throw error;
  },

  // ---- INVOICES (save + history) ----

  async saveInvoice(invoiceData) {
    if (!this.user) throw new Error('Not logged in');
    const payload = { ...invoiceData, user_id: this.user.id };
    const { data, error } = await this.client.from('invoices').insert(payload).select().single();
    if (error) throw error;
    return data;
  },

  async getInvoices() {
    if (!this.user) return [];
    const { data, error } = await this.client
      .from('invoices')
      .select('*')
      .eq('user_id', this.user.id)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  // ---- SAVED ITEMS (reusable line items) ----

  async getSavedItems() {
    if (!this.user) return [];
    const { data, error } = await this.client
      .from('saved_items')
      .select('*')
      .eq('user_id', this.user.id)
      .order('description');
    if (error) throw error;
    return data || [];
  },

  async saveSavedItem(item) {
    if (!this.user) throw new Error('Not logged in');
    const payload = { ...item, user_id: this.user.id };
    const { data, error } = await this.client.from('saved_items').insert(payload).select().single();
    if (error) throw error;
    return data;
  },

  // ---- INVOICE NUMBER INCREMENT ----

  async incrementInvoiceNum() {
    if (!this.profile) return;
    const next = (this.profile.next_invoice_num || 1) + 1;
    await this.saveProfile({ next_invoice_num: next });
  },
};

window.LungaData = LungaData;
