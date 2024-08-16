"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import { QueryClient, QueryClientProvider } from "react-query";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.scss";
import React, { useEffect, useRef, useState } from "react";
import Loader from "@/components/common/Loader";
import { throwError } from "@/utils/response/error";
import { AppStore, makeStore, wrapper } from "../store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      onError: (error) => {
        throwError(error);
      }
    },
    mutations: {
      onError: (error) => {
        throwError(error);
      }
    }
  }
});

export default function RootLayout({
  children, ...rest
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_AUTH_KEY || "";
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }



  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      <Provider store={storeRef.current}>
        <GoogleOAuthProvider clientId={clientId}>
          <QueryClientProvider client={queryClient}>
            <html lang="en">
              <body suppressHydrationWarning={true}>
                <div className="dark:bg-boxdark-2 dark:text-bodydark">
                  {loading ? <Loader /> : children}
                </div>
              </body>
            </html>
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </Provider>
    </>
  );
};
