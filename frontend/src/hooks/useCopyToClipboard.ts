import React, { useEffect } from "react";
import copy from "copy-to-clipboard";

type useCopyToClipboardResult = [isCopied: boolean, handleCopy: (text: number | string) => void];
export default function useCopyToClipboard(resetInterval: number): useCopyToClipboardResult {
  const [isCopied, setCopied] = React.useState(false);
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isCopied && resetInterval) {
      timeout = setTimeout(() => setCopied(false), resetInterval);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied, resetInterval]);

  const handleCopy = React.useCallback((text: number | string) => {
    if (typeof text == "string" || typeof text == "number") {
      copy(text.toString());
      setCopied(true);
    } else {
      setCopied(false);
      console.error(`Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`);
    }
  }, []);

  return [isCopied, handleCopy];
}
