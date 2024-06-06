"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createLanloard } from "@/services/landlord.services";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useRouter } from "next/navigation";
import { ContractSchema, ContractSchemaType } from "@/models/contractModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllTenanat } from "@/services/users.services";
import { Lanloard } from "@/types/Utilisateur";

type Props = {};
export default function CreateContract({}: Props) {
  const { data: landlords } = useQuery({
    queryFn: getAllTenanat<Lanloard[]>,
    queryKey: ["getAllLanloard"],
  });

  const { isError, isSuccess, isPending, error, mutateAsync } = useMutation({
    mutationFn: createLanloard<any>,
    mutationKey: ["createLanloard"],
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ContractSchemaType>({
    resolver: zodResolver(ContractSchema),
  });

  const router = useRouter();
  const onSubmit = (data: ContractSchemaType) => {
    console.log(data);
    try {
      mutateAsync(data)
        .then((resp) => {
          console.log("response: ", resp.slug);
          toast.success("Success!");
          router.back();
        })
        .catch((err) => {
          toast.error(err.message || error?.message);
          console.log("response: ", err);
        });
    } catch (e) {}
  };

  return (
    <DefaultLayout>
      <div className="flex justify-between">
        <Breadcrumb pageName="Create" />
      </div>
      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Créer un Contrat
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {isError && (
              <div className="m-3 flex w-full p-4 text-center">
                <p className="text-red-700">{error?.message}</p>
              </div>
            )}

            {isSuccess && (
              <div className="m-3 flex w-full p-4 text-center">
                <p className="text-green-700">{"Successfully created !"}</p>
              </div>
            )}
            <div className="w-full p-6.5">
              <div className="mb-6 min-w-[150px]">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Locataire ou visiteur :
                </label>
                {landlords && (
                  <div className="relative flex-1">
                    <select
                      name="utilisateur_id"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setValue("utilisateur_id", e.target.value);
                      }}
                      className="w-full  border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                    >
                      {landlords?.map((prev) => (
                        <option key={prev.id} value={prev.id}>
                          {prev.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {errors.utilisateur_id && (
                  <p className="text-[.7rem] text-red-600">
                    {errors.utilisateur_id.message}
                  </p>
                )}
              </div>
              <div className="mb-4.5 flex w-full flex-col gap-6 ">
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    charge
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("charge", {
                        required: "charge is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid charge close_revision_loyer",
                        },
                      })}
                      placeholder="Enter your charge"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                    />
                  </div>
                  {errors.charge && (
                    <p className="text-[.7rem] text-red-600">
                      {errors.charge.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    aut_paiement
                  </label>
                  <div className="relative">
                    <input
                      type="aut_paiement"
                      {...register("aut_paiement", {
                        required: "aut_paiement is required",
                      })}
                      placeholder="Enter your aut_paiement"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                    />
                  </div>
                  {errors.aut_paiement && (
                    <p className="text-[.7rem] text-red-600">
                      {errors.aut_paiement.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    aut_avis_echeance
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("aut_avis_echeance", {
                        required: "aut_avis_echeance is required",
                      })}
                      placeholder="Enter your name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                    />
                  </div>
                  {errors.aut_avis_echeance && (
                    <p className="text-[.7rem] text-red-600">
                      {errors.aut_avis_echeance.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    aut_quittance
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("aut_quittance", {
                        required: "aut_quittance is required",
                      })}
                      placeholder="Enter your aut_quittance number"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                    />
                  </div>
                  {errors.aut_quittance && (
                    <p className="text-[.7rem] text-red-600">
                      {errors.aut_quittance.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    close_revision_loyer
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("close_revision_loyer", {
                        required: "close_revision_loyer is required",
                      })}
                      placeholder="Enter your close_revision_loyer"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                    />
                  </div>
                  {errors.close_revision_loyer && (
                    <p className="text-[.7rem] text-red-600">
                      {errors.close_revision_loyer.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    indice_reference
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("indice_reference", {
                        required: "close_revision_loyer is required",
                      })}
                      placeholder="Enter your close_revision_loyer"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                    />
                  </div>
                  {errors.indice_reference && (
                    <p className="text-[.7rem] text-red-600">
                      {errors.indice_reference.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  montantLoyer
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("montantLoyer", {
                      required: "close_revision_loyer is required",
                    })}
                    placeholder="Enter your close_revision_loyer"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                  />
                </div>
                {errors.montantLoyer && (
                  <p className="text-[.7rem] text-red-600">
                    {errors.montantLoyer.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  description_bail
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("description_bail", {
                      required: "close_revision_loyer is required",
                    })}
                    placeholder="Enter your close_revision_loyer"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                  />
                </div>
                {errors.description_bail && (
                  <p className="text-[.7rem] text-red-600">
                    {errors.description_bail.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  indice_reference
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("indice_reference", {
                      required: "close_revision_loyer is required",
                    })}
                    placeholder="Enter your close_revision_loyer"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                  />
                </div>
                {errors.indice_reference && (
                  <p className="text-[.7rem] text-red-600">
                    {errors.indice_reference.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  type_echange_id
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("type_echange_id", {
                      required: "close_revision_loyer is required",
                    })}
                    placeholder="Enter your close_revision_loyer"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                  />
                </div>
                {errors.type_echange_id && (
                  <p className="text-[.7rem] text-red-600">
                    {errors.type_echange_id.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  type_contrat_id
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("type_contrat_id", {
                      required: "close_revision_loyer is required",
                    })}
                    placeholder="Enter your close_revision_loyer"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                  />
                </div>
                {errors.type_contrat_id && (
                  <p className="text-[.7rem] text-red-600">
                    {errors.type_contrat_id.message}
                  </p>
                )}
              </div>
            </div>

            <button
              disabled={isPending}
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Patientez...
                </>
              ) : (
                "Créer"
              )}
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}
