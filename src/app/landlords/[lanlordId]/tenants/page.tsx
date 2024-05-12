"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loading from "@/components/Loading";
import { TenantsLandLordTable } from "@/components/Tables/TenantsLandLordTable";
import NoDataComp from "@/components/ui/Nodata";
import { selectUser } from "@/redux/userSlice";
import { getAllTenantByUserID } from "@/services/users.services";
import { Lanloard } from "@/types/Utilisateur";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {};

export default function Page({}: Props) {
  const { user } = useSelector(selectUser);

  const {
    data: tenants,
    mutateAsync,
    error,
    isPending,
    isError,
  } = useMutation({
    mutationFn: getAllTenantByUserID<Lanloard[]>,
    mutationKey: ["getAllTenantByUserID"],
  });

  const dataTable = tenants
    ? tenants?.map((prev) => ({
        ...prev,
        type_user: prev.type_user.libelle,
      }))
    : [];

  useEffect(() => {
    if (user?.id) {
      mutateAsync({ id: user.id })
        .then((res) => {})
        .catch((err) => {
          toast.error(err.message || "Something went wrong !");
        });
    }
  }, [mutateAsync, user]);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />

        <div className="my-4">
          {isPending ? (
            <Loading />
          ) : isError ? (
            <p>{error.message}</p>
          ) : tenants?.length == 0 ? (
            <NoDataComp objectType="Tenants" />
          ) : (
            <TenantsLandLordTable data={dataTable} />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
