"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import { QueryClient, QueryClientProvider } from "react-query";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { throwError } from "@/utils/response/error";

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
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? <Loader /> : children}
          </div>
        </body>
      </html>
    </QueryClientProvider>
  );
}
