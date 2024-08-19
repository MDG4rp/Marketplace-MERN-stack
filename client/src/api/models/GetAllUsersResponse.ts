import UserInfo from "./UserInfo";

export interface GetAllUsersResponse {
  message: string;
  users: UserInfo[];
}
