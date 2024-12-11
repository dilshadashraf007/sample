// backend/models/Event.js
const express=require('express');

const Event = {
  create: async (eventData) => {
    const { data, error } = await supabase.from('events').insert([eventData]);
    if (error) throw error;
    return data;
  },

  getAll: async () => {
    const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
    if (error) throw error;
    return data;
  },

  getById: async (id) => {
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  updateById: async (id, eventData) => {
    const { data, error } = await supabase.from('events').update(eventData).eq('id', id);
    if (error) throw error;
    return data;
  },

  deleteById: async (id) => {
    const { data, error } = await supabase.from('events').delete().eq('id', id);
    if (error) throw error;
    return data;
  }
};

module.exports = Event;
