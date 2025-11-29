import api from "./axios";

export async function apiGet<T>(url: string, config = {}) {
  const res = await api.get<T>(url, config);
  return res.data;
}

export async function apiPost<T>(url: string, body?: any, config = {}) {
  const res = await api.post<T>(url, body, config);
  return res.data;
}

export async function apiPut<T>(url: string, body?: any, config = {}) {
  const res = await api.put<T>(url, body, config);
  return res.data;
}

export async function apiDelete<T>(url: string, config = {}) {
  const res = await api.delete<T>(url, config);
  return res.data;
}
