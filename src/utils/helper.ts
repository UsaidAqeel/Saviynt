export const clsx = (
  ...classes: ReadonlyArray<string | undefined | boolean>
) => {
  return classes.filter(Boolean).join(" ");
};

export const toAbsoluteUrl = (url: string): string => {
  return process.env.PUBLIC_URL + url;
};

export const setItemInLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error storing item in local storage:", error);
  }
};
