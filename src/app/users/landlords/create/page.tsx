"use client";

import React from "react";
import { LanlordInput } from "@/models/CreateLanlordModel";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createLanloard } from "@/services/landlord.services";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useRouter } from "next/navigation";

type Props = {};
export default function CreateLanLoard({}: Props) {
  const {
    isError,
    isSuccess,
    isPending,
    isPaused,
    error,
    mutateAsync,
    data: usersData,
  } = useMutation({
    mutationFn: createLanloard<any>,
    mutationKey: ["createLanloard"],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LanlordInput>();
  const router = useRouter();
  const onSubmit = (data: LanlordInput) => {
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
              Créer un Proprietaire
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
              <div className="mb-4.5 flex w-full flex-col gap-6 ">
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-[.7rem]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-600 text-[.7rem]">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Nom
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("nom", { required: "Nom is required" })}
                      placeholder="Enter your name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.nom && (
                    <p className="text-red-600 text-[.7rem]">
                      {errors.nom.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Telephone
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("telephone", {
                        required: "Telephone is required",
                      })}
                      placeholder="Enter your telephone number"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.telephone && (
                    <p className="text-red-600 text-[.7rem]">
                      {errors.telephone.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("addresse", {
                        required: "Address is required",
                      })}
                      placeholder="Enter your address"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.addresse && (
                    <p className="text-red-600 text-[.7rem]">
                      {errors.addresse.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Sexe
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("sexe", {
                        required: "Address is required",
                      })}
                      placeholder="Enter your address"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.sexe && (
                    <p className="text-red-600 text-[.7rem]">
                      {errors.sexe.message}
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
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}
