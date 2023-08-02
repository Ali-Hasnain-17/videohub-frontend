import { LoginInputs, RegisterInputs } from "../types";
import { makeRequest } from "./makeRequest";

export async function register({
  firstName,
  lastName,
  email,
  password,
}: Partial<RegisterInputs>) {
  return makeRequest("/api/user/register", {
    method: "POST",
    data: { firstName, lastName, email, password, role: "USER" },
  });
}

export async function login({ email, password }: LoginInputs) {
  return makeRequest("/api/user/authenticate", {
    method: "POST",
    data: { email, password },
  });
}
