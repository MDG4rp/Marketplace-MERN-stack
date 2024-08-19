export default interface LoginResponse {
  jwt: string;
  refreshToken: string;
  id: string;
  name: string;
  role: string;
  username: string;
}