// copied from https://github.com/jollyjerr/react-autosave
import { useRef, useEffect } from "react";
import { useDebounce } from "ahooks";

export interface Options<TData, TReturn> {
  /** The controlled form value to be auto saved   */
  data: TData;
  /** Callback function to save your data */
  onSave: (data: TData) => Promise<TReturn> | TReturn | void;
  /** The number of milliseconds between save attempts. Defaults to 2000 */
  interval?: number;
  /** Set to false if you do not want the save function to fire on unmount */
  saveOnUnmount?: boolean;
}

export function useAutoSave<TData, TReturn>({
  data,
  onSave,
  interval = 2000,
  saveOnUnmount = true,
}: Options<TData, TReturn>) {
  const valueOnCleanup = useRef(data);
  const initialRender = useRef(true);
  const handleSave = useRef(onSave);

  const debouncedValueToSave = useDebounce(data, {
    wait: interval,
  });

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      handleSave.current(debouncedValueToSave);
    }
  }, [debouncedValueToSave]);

  useEffect(() => {
    valueOnCleanup.current = data;
  }, [data]);

  useEffect(() => {
    handleSave.current = onSave;
  }, [onSave]);

  useEffect(
    () => () => {
      if (saveOnUnmount) {
        handleSave.current(valueOnCleanup.current);
      }
    },
    [saveOnUnmount],
  );
}
