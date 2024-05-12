"use client";

import DashBordLandLord from "@/components/Dashboard/DashBordLandLord";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import isAuth from "@/lib/isAuth";

function Home() {
  return (
    <>
      <DefaultLayout>
        <DashBordLandLord />
      </DefaultLayout>
    </>
  );
}

export default isAuth(Home);
