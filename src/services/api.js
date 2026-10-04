const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let refreshPromise = null;

export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

function saveTokens(accessToken, refreshToken) {
  if (accessToken) {
    localStorage.setItem("access_token", accessToken);
  }

  if (refreshToken) {
    localStorage.setItem("refresh_token", refreshToken);
  }
}

export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

function notifySessionExpired() {
  window.dispatchEvent(new Event("auth-expired"));
}

export async function login(username, password) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Login failed");
  }

  saveTokens(data.tokens.access_token, data.tokens.refresh_token);

  return data;
}

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearTokens();
    notifySessionExpired();

    throw new Error("Your session has expired. Please sign in again.");
  }

  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Unable to refresh session",
        );
      }

      const newAccessToken = data.tokens?.access_token;

      const newRefreshToken = data.tokens?.refresh_token || refreshToken;

      if (!newAccessToken) {
        throw new Error("No access token returned by refresh endpoint");
      }

      saveTokens(newAccessToken, newRefreshToken);

      return newAccessToken;
    } catch (error) {
      clearTokens();
      notifySessionExpired();

      throw new Error("Your session has expired. Please sign in again.");
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function apiFetch(endpoint, options = {}) {
  const accessToken = getAccessToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 || response.status === 403) {
    const newAccessToken = await refreshAccessToken();

    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  }

  return response;
}

export async function getProducts() {
  const response = await apiFetch("/products", {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to load products");
  }

  return data;
}

export async function createProduct(product) {
  const response = await apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to add product");
  }

  return data;
}

export async function updateProduct(id, product) {
  const response = await apiFetch(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to update product");
  }

  return data;
}

export async function deleteProduct(id) {
  const response = await apiFetch(`/products/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to delete product");
  }

  return data;
}

export async function logout() {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  clearTokens();

  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Logout failed");
  }

  return data;
}
