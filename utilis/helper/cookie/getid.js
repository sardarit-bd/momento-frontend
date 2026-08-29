function getId() {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${"id"}=`);

  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
}

export default getId;
