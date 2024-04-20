"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const dispatch = useDispatch();

  const pathname = usePathname();
  // const router = useRouter();

  // const {
  //   isError,
  //   isSuccess,
  //   isLoadingError,
  //   isPending,
  //   isFetching,
  //   isPaused,
  //   error,
  //   isLoading,
  //   data: dataSingUp,
  // } = useQuery({
  //   queryFn: getUserStatus<UserType>,
  //   queryKey: ["userStatus"],
  // });

  // console.log("path : ", pathname);
  const areNotrotected = pathname.split("/").includes("auth");

  // useEffect(
  //   function () {
  //     if (isError) {
  //       // toast.error(
  //       //   error?.message || "You nedd to be logged in to access this route",
  //       //   );
  //       //   router.push("/auth/signin");

  //       if (!areNotrotected) {
  //         dispatch(clearUser());
  //         console.log("error : ", error);
  //         toast.error(
  //           (error as Error).message ||
  //             "You need to be connected to access this route",
  //         );
  //         router.push("/auth/signin");
  //       }
  //     }
  //   },
  //   [dispatch, isError, error?.message, error, router, areNotrotected],
  // );

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

  // if (isPending || isLoading || isFetching || isLoadingError || isPaused) {
  //   return <Loader />;
  // }

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
