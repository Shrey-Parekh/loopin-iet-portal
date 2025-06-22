import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const API_BASE_URL = 'http://localhost:3001/api';

export function useApi<T>(endpoint: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

// Specific hooks for different data types
export function useTeam() {
  return useApi('/team');
}

export function useEvents() {
  return useApi('/events');
}

export function useUpcomingEvents() {
  return useApi('/events/upcoming');
}

export function useAnnouncements() {
  return useApi('/announcements');
}

export function useRecentAnnouncements() {
  return useApi('/announcements/recent');
} 