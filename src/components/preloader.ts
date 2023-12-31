export const preloader = (
  imageCollection: Record<string, string> | string[]
) => {
  const imageURLs = Array.isArray(imageCollection)
    ? imageCollection
    : Object.values(imageCollection);
  imageURLs.forEach((src) => {
    const image = new Image();
    image.src = src;
  });
};
