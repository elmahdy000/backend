const DEFAULT_TIMEOUT = 8000;
let cachedBaseUrl = null;

function normalizeBaseUrl(baseUrl) {
  if (!baseUrl) {
    return '';
  }
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

export function resolveApiBaseUrl() {
  if (cachedBaseUrl) {
    return cachedBaseUrl;
  }

  if (typeof window !== 'undefined' && window.desktop?.getApiBaseUrl) {
    cachedBaseUrl = normalizeBaseUrl(window.desktop.getApiBaseUrl());
    if (cachedBaseUrl) {
      return cachedBaseUrl;
    }
  }

  if (typeof window !== 'undefined' && window.location?.protocol?.startsWith('http')) {
    cachedBaseUrl = '/api';
    return cachedBaseUrl;
  }

  cachedBaseUrl = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api');
  return cachedBaseUrl;
}

export async function apiRequest(endpoint, options = {}) {
  const { method = 'GET', body, headers = {}, timeout = DEFAULT_TIMEOUT, signal } = options;
  const baseUrl = resolveApiBaseUrl();
  const url = `${baseUrl}/${endpoint.replace(/^\//, '')}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  const abortHandler = () => controller.abort();

  if (signal) {
    if (signal.aborted) {
      controller.abort();
    } else {
      signal.addEventListener('abort', abortHandler, { once: true });
    }
  }

  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    signal: controller.signal
  };

  if (body !== undefined) {
    requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `فشل الطلب مع الرمز ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return response.json();
    }

    return response.text();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('انتهت مهلة الاتصال بخدمة الذكاء المحاسبي.');
    }
    throw error;
  } finally {
    clearTimeout(timer);
    if (signal && typeof signal.removeEventListener === 'function') {
      signal.removeEventListener('abort', abortHandler);
    }
  }
}
