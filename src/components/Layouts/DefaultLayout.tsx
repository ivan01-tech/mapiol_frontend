"use client";
import { UserType } from "@/types/users";
import { useLayoutEffect } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addUserInfo } from "@/redux/userSlice";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { getUserStatus } from "@/services/users.services";
import { UserRoles } from "@/lib/utils";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const pathname = usePathname();
  const router = useRouter();

  // const {
  //   isError,
  //   isSuccess,
  //   isPending,
  //   error,
  //   data: dataSingUp,
  // } = useQuery({
  //   queryFn: getUserStatus<UserType>,
  //   queryKey: ["userStatus"],
  // });

  // console.log("path : ", pathname);
  const areNotrotected = pathname.split("/").includes("auth");
  // // TODO create a route for sign up and login
  // console.log("is protected : ", areNotrotected);

  // TODO create a route for sign up and login
  // useEffect(
  //   function () {
  //     if (isSuccess) {
  //       console.log("Main layout data : ", isSuccess, dataSingUp);
  //       dispatch(addUserInfo(dataSingUp));
  //       toast.success("success!");
  //     }
  //   },
  //   [isSuccess, dataSingUp, router, dispatch],
  // );

  // useEffect(
  //   function () {
  //     if (isError && !areNotrotected) {
  //       console.log("error : ", error);
  //       dispatch(clearUser());
  //       toast.error(
  //         error?.message || "You nedd to be logged in to access this route",
  //       );
  //       router.push("/auth/signin");
  //       return;
  //     }
  //   },
  //   [dispatch, isError, error?.message, error, router, areNotrotected],
  // );

  useLayoutEffect(() => {
    (async () => {
      try {
        const res = await getUserStatus<UserType>();
        if (res.roles == UserRoles.is_admin) {
          dispatch(addUserInfo(res));
        } else {
          toast.error("this page requires the user to be an administrator");
          return router.push("/auth/signin");
        }
      } catch (error) {
        if (!areNotrotected) {
          console.log("error : ", error);
          toast.error(
            (error as Error).message ||
              "You need to be connected to access this route",
          );
          return router.push("/auth/signin");
        }
      }
    })();
  }, [areNotrotected, dispatch, router]);

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
