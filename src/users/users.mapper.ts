import { User } from "./user.entity";

export function toUserResponse(u: User) {
  return {
    id: u.id,
    email: u.email,
    full_name: u.fullName,
    is_active: u.isActive,
    last_login_at: u.lastLoginAt,
    created_at: u.createdAt,
    updated_at: u.updatedAt,
    roles: (u.userRoles ?? []).map((r) => ({
      id: r.role.id,
      code: r.role.code,
      name: r.role.name,
      description: r.role.description,
    })),
  };
}
