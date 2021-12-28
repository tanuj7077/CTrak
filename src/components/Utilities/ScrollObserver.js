import React, { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../../context";
function ScrollObserver() {
  const { setSearchModalVisibility, searchModalVisibility } =
    useGlobalContext();
  const prevScrollY = useRef(0);
  const [goingUp, setGoingUp] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
        setSearchModalVisibility(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
        setSearchModalVisibility(false);
      }
      prevScrollY.current = currentScrollY;
      console.log(goingUp, currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp, searchModalVisibility]);
  return <div></div>;
}

export default ScrollObserver;
