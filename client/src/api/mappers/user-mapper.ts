import UserInfo from "../models/UserInfo";

export default function mapUserInfo(data: any): UserInfo {
  const mappedData: UserInfo = {
    address: data.address,
    expiresIn: data.expiresIn,
    isAdmin: data.isAdmin,
    jwt: data.jwt,
    name: data.name,
    refreshToken: data.refreshToken,
    surname: data.surname, 
    userId: data.userId  
}
  return mappedData;
}
