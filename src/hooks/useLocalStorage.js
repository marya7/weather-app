import { useCallback, useState } from "react";

const useLocalStorage = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  const updateValue = useCallback(
    (newValue) => {
      localStorage.setItem(key, newValue);
      setValue(newValue);
    },
    [initialState, key]
  );

  return [value, updateValue];
};

export default useLocalStorage;
