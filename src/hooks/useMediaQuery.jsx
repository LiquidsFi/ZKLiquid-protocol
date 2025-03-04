import { useLayoutEffect, useMemo, useState } from "react";

function useMediaQuery(query, whenTrue = true, whenFalse = false) {
  const mediaQuery = useMemo(() => window.matchMedia(query), [query]);
  const [match, setMatch] = useState(!!mediaQuery.matches);

  useLayoutEffect(() => {
    const handler = (e) => setMatch(!!e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [mediaQuery]);

  return match ? whenTrue : whenFalse;
}

export default useMediaQuery;
