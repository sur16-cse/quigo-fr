import { Roles } from "../types";

export const authenticateRider = (current_role: Roles): boolean => {
  return current_role === Roles.RIDER
};

export const authenticateDriver = (current_role: Roles): boolean => {
  return current_role === Roles.DRIVER
};

export const authenticateGuest = (current_role: Roles): boolean => {
    return current_role === Roles.GUEST
}