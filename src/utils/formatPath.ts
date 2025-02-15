export const formatPath = (path: string) => {
  return path
    .replace("/list/", "")
    .split(/[-]/)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
