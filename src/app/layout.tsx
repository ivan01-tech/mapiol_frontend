"use client";
import "react-phone-number-input/style.css";

import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />

              {children}
              <Toaster />
            </QueryClientProvider>
          </div>
        </Provider>
      </body>
    </html>
  );
}
