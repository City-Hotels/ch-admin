import type { MutableRefObject } from "react";
import { useEffect, useRef, useState } from "react";

interface IntersectionObserverArgs extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

const useIntersectionObserver = (
  options: IntersectionObserverArgs
): [MutableRefObject<HTMLDivElement | null>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(!!entry?.isIntersecting);
      console.log("is it okay", entry.isIntersecting);
      if (!!entry?.isIntersecting && options.freezeOnceVisible) {
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isIntersecting];
};

export default useIntersectionObserver;
