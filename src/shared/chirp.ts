export type UserId = string;

// A chirp
export interface Chirp {
  user?: UserId;
  time?: number;
  message: string;
  avatar: string;
}