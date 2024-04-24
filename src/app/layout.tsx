"use client";
import "react-phone-number-input/style.css";

import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SecureLS from "secure-ls";
import { ChakraProvider } from "@chakra-ui/react";

export const queryClient = new QueryClient();

const SECURE_LS_KEY = process.env.SECURE_LS_KEY;

export let ls: SecureLS;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    ls = new SecureLS({
      encodingType: "aes",
      encryptionSecret: SECURE_LS_KEY,
    });
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ChakraProvider>
          <Provider store={store}>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />

                {children}
                <Toaster />
              </QueryClientProvider>
            </div>
          </Provider>
        </ChakraProvider>
      </body>
    </html>
  );
}
