import { SetMetadata } from "@nestjs/common";
import { Role } from "src/enums/role.enum";

export const ROLE_KEY = "roles"
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles); 