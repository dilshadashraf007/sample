

export const fetchEmployees = async () => {
  const { data, error } = await supabase.from('employees').select('*');
  if (error) throw error;
  return data;
};


export const addEmployee = async (employee) => {
  const { data, error } = await supabase.from('employees').insert([employee]);
  if (error) throw error;
  return data;
};

export const updateEmployee = async (id, updates) => {
  const { data, error } = await supabase.from('employees').update(updates).eq('id', id);
  if (error) throw error;
  return data;
};


export const deleteEmployee = async (id) => {
  const { data, error } = await supabase.from('employees').delete().eq('id', id);
  if (error) throw error;
  return data;
};
