export function getToken(): string | null {
  return localStorage.getItem("googleToken");
}

export function clearToken() {
  localStorage.removeItem("googleToken");
}
