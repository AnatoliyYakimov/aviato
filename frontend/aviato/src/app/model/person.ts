
export enum Role {
  GUEST = "GUEST",
  USER = "USER",
  ADMIN = "ADMIN"
}

export interface Person {
  id: number,
  username: string,
  role: Role,
  first_name: string,
  middle_name: string,
  last_name: string
}
