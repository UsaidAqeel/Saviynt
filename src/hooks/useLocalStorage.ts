import { useState } from "react";

type StoredValue<T> = T | null;

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [StoredValue<T>, (newValue: T) => void] => {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? (JSON.parse(storedValue) as T) : initialValue;

  const [value, setValue] = useState<StoredValue<T>>(initial);

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
};

export default useLocalStorage;
