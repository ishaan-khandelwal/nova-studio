import { useState, useEffect } from 'react';
import axios from 'axios';

export function useStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await axios.get('/api/stats');
        setStats(response.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return { stats, loading, error };
}
