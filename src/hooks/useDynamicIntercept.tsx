"use client";

import { useEffect, ReactNode, useContext, createContext } from "react";

const DynamicInterceptContext = createContext<null>(null);

export function DynamicInterceptProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_EXPORT != "true") return;

    const { fetch: originalFetch } = window;
    window.fetch = async (...args) => {
      const [resource] = args;
      if ((resource as URL)?.pathname?.startsWith("/")) {
        return await originalFetch("/default.txt");
      }
      const response = await originalFetch(...args);
      return response;
    };
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <DynamicInterceptContext.Provider value={null}>
      {children}
    </DynamicInterceptContext.Provider>
  );
}

export function useDynamicIntercept() {
  const context = useContext(DynamicInterceptContext);
  if (!context)
    throw new Error(
      "useDynamicIntercept must be used within an DynamicInterceptProvider",
    );
  return context;
}
