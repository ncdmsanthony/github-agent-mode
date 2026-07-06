/**
 * API Configuration and Utilities
 * 
 * Environment Requirements:
 * - VITE_CODESPACE_NAME: GitHub Codespace name (required for API endpoints)
 *   Must be defined in .env.local or as an environment variable
 * 
 * Example:
 * VITE_CODESPACE_NAME=my-codespace-name
 */

/**
 * Get the base API URL
 * Falls back to localhost:8000 if VITE_CODESPACE_NAME is not defined
 */
export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }
  
  // Fallback for local development
  console.warn(
    'VITE_CODESPACE_NAME is not defined. Using localhost fallback. ' +
    'For GitHub Codespaces, define VITE_CODESPACE_NAME in .env.local'
  );
  return 'http://localhost:8000/api';
}

/**
 * Handle paginated or array responses from API
 * @param {Object|Array} data - Response data that may be paginated or a direct array
 * @returns {Array} The data array
 */
export function extractDataFromResponse(data) {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && data.results && Array.isArray(data.results)) {
    return data.results;
  }
  if (data && data.data && Array.isArray(data.data)) {
    return data.data;
  }
  return [];
}

/**
 * Fetch data from API endpoint
 * @param {string} path - API path (e.g., 'activities', 'teams')
 * @returns {Promise<Array>} Array of items from the API
 */
export async function fetchFromApi(path) {
  try {
    const url = `${getApiBaseUrl()}/${path}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return extractDataFromResponse(data);
  } catch (error) {
    console.error(`Error fetching from ${path}:`, error);
    throw error;
  }
}

/**
 * Create a new item via API
 * @param {string} path - API path (e.g., 'activities')
 * @param {Object} item - Item to create
 * @returns {Promise<Object>} Created item
 */
export async function createInApi(path, item) {
  try {
    const url = `${getApiBaseUrl()}/${path}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error creating in ${path}:`, error);
    throw error;
  }
}

/**
 * Update an item via API
 * @param {string} path - API path (e.g., 'activities')
 * @param {string|number} id - Item ID
 * @param {Object} updates - Updates to apply
 * @returns {Promise<Object>} Updated item
 */
export async function updateInApi(path, id, updates) {
  try {
    const url = `${getApiBaseUrl()}/${path}/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating in ${path}:`, error);
    throw error;
  }
}

/**
 * Delete an item via API
 * @param {string} path - API path (e.g., 'activities')
 * @param {string|number} id - Item ID
 * @returns {Promise<void>}
 */
export async function deleteFromApi(path, id) {
  try {
    const url = `${getApiBaseUrl()}/${path}/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error deleting from ${path}:`, error);
    throw error;
  }
}
