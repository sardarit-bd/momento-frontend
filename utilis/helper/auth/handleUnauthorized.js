const handleUnauthorized = () => {
  if (typeof window === "undefined") return;
  if (window.location.pathname.startsWith("/signin")) return;
  ["id", "role", "token", "name"].forEach((name) => {
    document.cookie = `${name}=; path=/; max-age=0`;
  });
  window.location.href = "/signin";
};

export default handleUnauthorized;
