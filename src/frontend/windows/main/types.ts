export const windowMain = window as typeof window & {
  electron: {
    log: (str?: string) => void;
    registerImageTransferCallback: (
      callback: (imageBase64Data: string) => void
    ) => void;
  };
};
