"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardDataStats from "@/components/CardDataStats";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loading from "@/components/Loading";
import TableTwo from "@/components/Tables/TableTwo";
import Loader from "@/components/common/Loader";
import NoDataComp from "@/components/ui/Nodata";
import { UserType } from "@/types/users";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const UserPagePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
    </DefaultLayout>
  );
};

export default UserPagePage;
