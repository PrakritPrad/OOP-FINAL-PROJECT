import { BaseEntity } from '../../../common/interfaces/base-entity';

export enum UserRole {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    STAFF = 'STAFF',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SUSPENDED = 'SUSPENDED',
}

export class User extends BaseEntity {
    username!: string;
    password!: string;
    fullName!: string;
    email!: string;
    phone!: string;
    role!: UserRole;
    status!: UserStatus;
    organizationId!: string;
    department!: string;
    position!: string;
    bio?: string;
    avatarUrl?: string;
    isEmailVerified!: boolean;
    timezone!: string;
    lastLoginAt?: string;
}

export type SafeUser = Omit<User, 'password'>;