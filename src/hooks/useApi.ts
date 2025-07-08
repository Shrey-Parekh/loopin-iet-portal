import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Use environment variable for backend API URL, fallback to relative for local dev
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

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

// Team member filtering hook
export function useTeamMembers(filters?: {
  department?: string;
  member_type?: string;
  position_hierarchy?: string;
}) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = new URLSearchParams();
        if (filters?.department) params.append('department', filters.department);
        if (filters?.member_type) params.append('member_type', filters.member_type);
        if (filters?.position_hierarchy) params.append('position_hierarchy', filters.position_hierarchy);
        
        const queryString = params.toString();
        const url = `${API_BASE_URL}/team${queryString ? `?${queryString}` : ''}`;
        
        const response = await fetch(url);
        
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
  }, [filters?.department, filters?.member_type, filters?.position_hierarchy]);

  return { data, loading, error };
}

// Specific hooks for different data types
export function useTeam() {
  return useApi('/team');
}

export function useSuperCore() {
  return useApi('/team/super-core');
}

export function useCore() {
  return useApi('/team/core');
}

export function useDepartments() {
  return useApi('/departments');
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

export function useNewsletters() {
  return useApi('/newsletters');
} 