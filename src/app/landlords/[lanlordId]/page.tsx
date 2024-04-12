"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loading from "@/components/Loading";
import { TenantsLandLordTable } from "@/components/Tables/TenantsLandLordTable";
import NoDataComp from "@/components/ui/Nodata";
import { getAllLanloard } from "@/services/users.services";
import { Lanloard } from "@/types/Utilisateur";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  const {
    isError,
    isSuccess,
    isLoadingError,
    isPending,
    isFetching,
    isPaused,
    error,
    isLoading,
    data: usersData,
  } = useQuery({
    queryFn: getAllLanloard<Lanloard[]>,
    queryKey: ["getAllUser"],
  });
  const dataTable = usersData
    ? usersData?.map((prev) => ({
        ...prev,
        type_user: prev.type_user.libelle,
      }))
    : [];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />
        {/*  */}
        <div>
          <h1>Les meubles ici</h1>
        </div>

        {/*  */}
        <div className="my-4">
          {isLoading || isPending ? (
            <Loading />
          ) : isError ? (
            <p>{error.message}</p>
          ) : usersData.length == 0 ? (
            <NoDataComp objectType="Users" />
          ) : (
            <TenantsLandLordTable data={dataTable} />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
