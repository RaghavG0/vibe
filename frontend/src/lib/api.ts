/**
 * API Utility Functions
 * 
 * Centralized API calls to the backend.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Helper function to get auth token
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

// Helper function to create headers
function getHeaders(includeAuth: boolean = true): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

// Handle API response
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }
  return response.json();
}

// ============ Authentication API ============

export async function signup(data: {
  full_name: string;
  email: string;
  password: string;
  role: 'customer' | 'retailer' | 'wholesaler';
}) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: getHeaders(false),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function login(email: string, password: string) {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse(response);
}

export async function getCurrentUser() {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
}

// ============ Products API ============

export async function getProducts(params?: {
  page?: number;
  per_page?: number;
  category?: string;
  search?: string;
}) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
  if (params?.category) queryParams.append('category', params.category);
  if (params?.search) queryParams.append('search', params.search);

  const response = await fetch(`${API_BASE_URL}/products?${queryParams}`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function getProduct(productId: string) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function createProduct(data: any) {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateProduct(productId: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function deleteProduct(productId: string) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Delete failed' }));
    throw new Error(error.detail);
  }
}

// ============ Orders API ============

export async function getOrders(params?: {
  page?: number;
  per_page?: number;
  status?: string;
}) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
  if (params?.status) queryParams.append('status', params.status);

  const response = await fetch(`${API_BASE_URL}/orders?${queryParams}`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function getOrder(orderId: string) {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function createOrder(data: {
  items: Array<{
    product_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
  total_amount: number;
  shipping_address: string;
}) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateOrderStatus(orderId: string, data: {
  status?: string;
  tracking_number?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function cancelOrder(orderId: string) {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Cancel failed' }));
    throw new Error(error.detail);
  }
}
