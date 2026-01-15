/**
 * API Configuration
 * Centralizes API base URL for frontend
 * Uses environment variable in production, localhost in development
 */

const getApiUrl = (): string => {
  // Check for production environment variable
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Development fallback
  if (import.meta.env.DEV) {
    return 'http://localhost:3000';
  }
  
  // Production fallback (should not happen if env var is set)
  console.warn('VITE_API_URL not set, using localhost fallback');
  return 'http://localhost:3000';
};

export const API_BASE_URL = getApiUrl();

/**
 * Helper function to build API endpoints
 */
export const apiUrl = (endpoint: string): string => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  // Ensure API prefix
  const apiEndpoint = cleanEndpoint.startsWith('api/') ? cleanEndpoint : `api/${cleanEndpoint}`;
  return `${API_BASE_URL}/${apiEndpoint}`;
};
