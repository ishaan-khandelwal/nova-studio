import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, []);

  const addProject = async (projectData) => {
    try {
      const response = await axios.post('/api/projects', projectData);
      setProjects((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to add project');
    }
  };

  const removeProject = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to delete project');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProjects();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    addProject,
    removeProject,
  };
}
