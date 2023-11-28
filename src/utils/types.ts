//!------------ FORM TYPES -------------
export type FormDataType = {
  name: string;
  lastname: string;
  birth: string;
  password: string;
  email: string;
  phone: string;
  genre?: string;
  dni: string;
  image?: string;
};
export type EditProfileType = {
  name?: string;
  lastname?: string;
  birth?: string;
  phone?: string;
  dni?: string;
};
export type ChangePasswordType = {
  newPassword: string;
  actualPassword: string;
  email: string;
};
//!------------- OBJECT TYPES -------------
export interface UserType extends InstructorType {
  remaining_classes: number;
}
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
export type CreateClassType = {
  name: string;
  date: string;
  limit: number;
  instructor?: InstructorType;
};
export type GymClassType = {
  id: string;
  instructor: InstructorType;
  date: Date;
  limit: number;
  name: string;
  students: UserType[];
};

export type CreatePaymentType = {
  id: string;
  description: string;
  title: string;
  quantity: number;
  unit_price: number;
  image: string;
  currency_id: string;
  payer: {
    name: string;
    email: string;
    identification: {
      type: string;
      number: string;
    };
  };
};

export type PlanType = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  credits: number;
};
//! ---------------- STATES TYPES ---------------

//! ----------------- ENUMS ----------------
export enum RoleEnum {
  USER = 'user',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin',
}
export enum EnableOrDisableEnum {
  ENABLE = 'enable',
  DISABLE = 'disable',
}

export enum PlanEnum {
  initial = 'initial',
  inter = 'inter',
  advanced = 'advanced',
}
