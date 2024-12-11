const express=require('express');


const Task = {
  create: async (taskData) => {
    const { data, error } = await supabase.from('tasks').insert([taskData]);
    if (error) throw error;
    return data;
  },

  getAll: async () => {
    const { data, error } = await supabase.from('tasks').select('*').order('due_date', { ascending: true });
    if (error) throw error;
    return data;
  },

  getById: async (id) => {
    const { data, error } = await supabase.from('tasks').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  updateById: async (id, taskData) => {
    const { data, error } = await supabase.from('tasks').update(taskData).eq('id', id);
    if (error) throw error;
    return data;
  },

  deleteById: async (id) => {
    const { data, error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) throw error;
    return data;
  }
};

module.exports = Task;
