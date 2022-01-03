import { useState, useEffect } from "react";
export default function useScreenSize({ size }) {
  const [mobileVersion, setMobileVersion] = useState();

  useEffect(() => {
    const screen = {
      width: window.matchMedia(`(max-width: ${size} )`),
    };

    function handleResize() {
      if (screen.width.matches) {
        setMobileVersion(true);
      } else {
        setMobileVersion(false);
      }
      window.addEventListener("resize", handleResize);
    }
    handleResize();
    // eslint-disable-next-line
  }, []);
  return mobileVersion;
}
