"use client";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "@/types/users";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo, clearUser, selectUser } from "@/redux/userSlice";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { getUserStatus } from "@/services/users.services";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const pathname = usePathname();
  const router = useRouter();

  const {
    isError,
    isSuccess,
    isPending,
    error,
    data: dataSingUp,
  } = useQuery({
    queryFn: getUserStatus<UserType>,
    queryKey: ["userStatus"],
  });

  console.log("path : ", pathname);
  const areProtected = pathname.split("/").includes("auth");
  // TODO create a route for sign up and login
  console.log("is protected : ", areProtected);

  // TODO create a route for sign up and login
  useEffect(
    function () {
      if (isSuccess) {
        console.log("Main layout data : ", isSuccess, dataSingUp);
        dispatch(addUserInfo(dataSingUp));
        toast.success("success!");
        router.push("/");
      }
    },
    [isSuccess, dataSingUp, router, dispatch],
  );

  useEffect(
    function () {
      if (isError) {
        console.log("error : ", error);
        dispatch(clearUser());
        toast.error(error?.message || "");
        return;
      }
    },
    [dispatch, isError, error?.message, error],
  );

  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
