function isPasswordValid(password) {
  return typeof password === "string" && password.length > 6;
}
export default isPasswordValid;
