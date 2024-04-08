"use client";
import CreateLanLoard from "@/components/Form/CreateLanLoard";
import { LanlordInput } from "@/models/CreateLanlordModel";
import { createLanloard } from "@/services/landlord.services";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

function Page({}: Props) {
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

  const onSubmit = (data: LanlordInput) => {
    console.log(data);
    try {
      mutateAsync(data)
        .then((resp) => {
          console.log("response: ", resp);
        })
        .catch((err) => {
          console.log("response: ", err);
        });
    } catch (e) {}
  };

  return (
    <div
      style={{
        // backgroundColor: "#E1EAEA",
      }}
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <div className="my-10 justify-center max-w-[800px] rounded mx-auto py-4 flex flex-col items-center border border-slate-300">
          <div className="w-1/2 flex-col justify-between">
            <Image
              src={"/images/logo/mapiol_logo.jpeg"}
              width={100}
              height={100}
              className=" rounded-full  border border-slate-500 mx-auto object-cover"
              alt="image"
            />
          </div>
        <form
          className="mx-auto w-full max-w-[700px] flex-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-1 my-8">
            <div className="text-center text-2xl font-bold">
              Créer votre compte Propriétaire
            </div>
            <div className="text-center">
              Entrez vos informations personelles et commencez des maintenants a
              gérer vos locataires
            </div>
          </div>
          <div className="w-full p-6.5">
            <div className="mb-4.5 flex w-full flex-col gap-2">
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
                  <p className="text-red text-[.7rem]">
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
                  <p className="text-red text-[.7rem]">
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
                  <p className="text-red text-[.7rem]">{errors.nom.message}</p>
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
                  <p className="text-red text-[.7rem]">
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
                  <p className="text-red text-[.7rem]">
                    {errors.addresse.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Login
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("login", {
                      required: "Address is required",
                    })}
                    placeholder="Enter your address"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {errors.login && (
                  <p className="text-red text-[.7rem]">
                    {errors.login.message}
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
                  <p className="text-red text-[.7rem]">{errors.sexe.message}</p>
                )}
              </div>
            </div>

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
