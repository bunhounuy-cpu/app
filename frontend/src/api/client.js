const API_URL = 'http://localhost:3000/api';

async function request(endpoint, options = {}) {
  const { method = 'GET', body, auth = false } = options;

  const config = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (auth) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_URL}${endpoint}`, config);
  const data = await res.json();

  if (!data.success) {
    const err = new Error(data.msg || 'Something went wrong');
    err.status = res.status;
    throw err;
  }

  return data;
}

export const api = {
  get: (endpoint, opts) => request(endpoint, { ...opts, method: 'GET' }),
  post: (endpoint, body, opts) => request(endpoint, { ...opts, method: 'POST', body }),
  put: (endpoint, body, opts) => request(endpoint, { ...opts, method: 'PUT', body }),
  patch: (endpoint, body, opts) => request(endpoint, { ...opts, method: 'PATCH', body }),
  delete: (endpoint, opts) => request(endpoint, { ...opts, method: 'DELETE' }),
};
