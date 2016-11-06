export type UserId = string;

// A chirp
export interface Chirp {
  // TODO
  user?: UserId;
  time?: number;
  message: string;
  avatar: string;
}