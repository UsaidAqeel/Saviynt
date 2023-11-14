export const clsx = (
  ...classes: ReadonlyArray<string | undefined | boolean>
) => {
  return classes.filter(Boolean).join(" ");
};

export const toAbsoluteUrl = (url: string): string => {
  return process.env.PUBLIC_URL + url;
};
