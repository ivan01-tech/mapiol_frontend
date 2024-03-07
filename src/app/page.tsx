"use client";

import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { isAuthenticated } from "@/lib/Auth";
import isAuth from "@/lib/isAuth";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}

export default isAuth(Home);
