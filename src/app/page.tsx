"use client";

import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useQuery } from "@tanstack/react-query";
import { getUserStatus } from "./services/users.service";
import { UserType } from "@/types/users";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo, clearUser, selectUser } from "@/redux/userSlice";

export default function Home() {
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

  useEffect(
    function () {
      if (!isSuccess && !areProtected) {
        dispatch(clearUser());
        toast.error("you meet to login to access this route");
        router.push("/auth/signin");
        return;
      }

      console.log("Main layout data : ", isSuccess, dataSingUp);
      dispatch(addUserInfo(dataSingUp));
      toast.success("success!");
    },
    [isSuccess, dataSingUp, router, pathname, dispatch, areProtected],
  );
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
