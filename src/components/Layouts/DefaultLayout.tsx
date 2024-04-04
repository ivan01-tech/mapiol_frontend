"use client";
import { UserType } from "@/types/users";
import { useEffect, useLayoutEffect } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo, clearUser, selectUser } from "@/redux/userSlice";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { getUserStatus } from "@/services/users.services";
import { UserRoles } from "@/lib/utils";
import Loader from "../common/Loader";
import { useQuery } from "@tanstack/react-query";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const pathname = usePathname();
  const router = useRouter();

  const {
    isError,
    isSuccess,
    isLoadingError,
    isPending,
    isFetching,
    isPaused,
    error,
    isLoading,
    data: dataSingUp,
  } = useQuery({
    queryFn: getUserStatus<UserType>,
    queryKey: ["userStatus"],
  });

  // console.log("path : ", pathname);
  const areNotrotected = pathname.split("/").includes("auth");
  // // TODO create a route for sign up and login
  // console.log("is protected : ", areNotrotected);

  // TODO create a route for sign up and login
  useEffect(
    function () {
      if (isSuccess) {
        console.log("Main layout data : ", isSuccess, dataSingUp);

        if (dataSingUp.roles == UserRoles.is_admin) {
          dispatch(addUserInfo(dataSingUp));
        } else {
          toast.error("this page requires the user to be an administrator");
          return router.push("/auth/signin");
        }
      }
    },
    [isSuccess, dataSingUp, router, dispatch],
  );

  useEffect(
    function () {
      if (isError) {
        // toast.error(
        //   error?.message || "You nedd to be logged in to access this route",
        //   );
        //   router.push("/auth/signin");

        if (!areNotrotected) {
          dispatch(clearUser());
          console.log("error : ", error);
          toast.error(
            (error as Error).message ||
              "You need to be connected to access this route",
          );
          router.push("/auth/signin");
        }
      }
    },
    [dispatch, isError, error?.message, error, router, areNotrotected],
  );
  // const pathname = usePathname();

  // useLayoutEffect(() => {
  //   (async () => {
  //     setLoading(true);
  //     try {
  //       const res = await getUserStatus<UserType>();
  //       if (res.roles == UserRoles.is_admin) {
  //         dispatch(addUserInfo(res));
  //       } else {
  //         toast.error("this page requires the user to be an administrator");
  //         return router.push("/auth/signin");
  //       }
  //     } catch (error) {
  //       if (!areNotrotected) {
  //         console.log("error : ", error);
  //         toast.error(
  //           (error as Error).message ||
  //             "You need to be connected to access this route",
  //         );
  //         return router.push("/auth/signin");
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, [areNotrotected, dispatch, router]);

  if (isPending || isLoading || isFetching || isLoadingError || isPaused) {
    return <Loader />;
  }

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
