/**
 * Authentication types - Keep it simple!
 */

/**
 * User data returned from the backend
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: "google";
}
