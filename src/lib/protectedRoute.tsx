import { Roles } from "./types";

export const authenticateDriver = (current_role: Roles): boolean => {
  return current_role === Roles.DRIVER
};

export const authenticateRider = (current_role: Roles): boolean => {
  return current_role === Roles.RIDER
};

export const authenticateAdmin = (current_role: Roles): boolean => {
    return current_role === Roles.GUEST
}
