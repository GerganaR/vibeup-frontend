export interface HttpErrorShape {
  status: number;
  message: string;
  raw?: any;
}

export function normalizeHttpError(error: any): HttpErrorShape {
  if (!error.response) {
    return {
      status: 0,
      message: "Network error. Please check your connection.",
      raw: error,
    };
  }

  return {
    status: error.response.status,
    message: error.response.data?.message || "Unexpected error occurred",
    raw: error,
  };
}
