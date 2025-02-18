export const formatPathToTitle = (path: string) => {
  return path
    .replace("/list/", "")
    .split(/[-]/)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatTitleToPath = (title: string) => {
  return title.toLowerCase().replace(/ /g, "-");
};

export const convertToUrl = (url: string) =>
  url.startsWith("http") ? url : `https://${url}`;
