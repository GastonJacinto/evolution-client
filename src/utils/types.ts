//!------------ FORM TYPES -------------
export type FormDataType = {
  name: string;
  lastname: string;
  birth: string;
  password: string;
  email: string;
  phone: string;
  genre: string;
  dni: string;
  image?: string;
};

//!------------- OBJECT TYPES -------------
export interface UserType extends InstructorType {}
export enum ActiveAccount {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned',
}

export interface InstructorType {
  active: ActiveAccount;
  birth: string;
  createdAt: string;
  deletedAt: null;
  dni: string;
  email: string;
  genre: string;
  id: string;
  image: string;
  lastname: string;
  name: string;
  classes: GymClassType[];
  phone: string;
  role: string;
}
export type GymClassType = {
  id: string;
  instructor: InstructorType;
  date: Date;
  limit: number;
  name: string;
  students: UserType[];
};
//!---------------- STATES TYPES ---------------
export enum RoleEnum {
  USER = 'user',
  INSTRUCTOR = 'instructor',
}
