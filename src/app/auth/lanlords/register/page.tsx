"use client";
import CreateLanLoard from "@/components/Form/CreateLanLoard";
import { LanlordInput } from "@/models/CreateLanlordModel";
import { addUserInfo, selectUser } from "@/redux/userSlice";
import {
  createLanloard,
  createLanloardAnLOgin,
} from "@/services/landlord.services";
import { LanloardCreate } from "@/types/Utilisateur";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type Props = {};

function Page({}: Props) {
  const dispatch = useDispatch();
  const {
    isError,
    isSuccess,
    isPending,
    error,
    mutateAsync,
    data: usersData,
  } = useMutation({
    mutationFn: createLanloardAnLOgin<LanloardCreate>,
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
          dispatch(
            // TODO: handle
            addUserInfo({
              ...data,
              id: resp.id,
              statut: resp.statut,
              type_user: resp.type_user,
            }),
          );
          toast.success("Success!");
          return router.replace("/lanlords/" + resp.slug);
        })
        .catch((err) => {
          toast.error(err.message || error?.message);
          console.log("response: ", err);
        });
    } catch (e) {}
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mx-auto my-10 flex max-w-[800px] flex-col items-center justify-center rounded border border-slate-300 py-4">
        <div className="w-1/2 flex-col justify-between">
          <Image
            src={"/images/logo/mapiol_logo.png"}
            width={100}
            height={100}
            className=" mx-auto   border border-slate-500 object-cover"
            alt="image"
          />
        </div>
        <form
          className="mx-auto w-full max-w-[700px] flex-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="my-8 space-y-1">
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
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
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
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
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
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                  />
                </div>
                {errors.nom && (
                  <p className="text-red-600 text-[.7rem]">{errors.nom.message}</p>
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
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
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
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                  />
                </div>
                {errors.addresse && (
                  <p className="text-red-600 text-[.7rem]">
                    {errors.addresse.message}
                  </p>
                )}
              </div>

              {/* <div className="mb-6">
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
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                  />
                </div>
                {errors.login && (
                  <p className="text-red-600 text-[.7rem]">
                    {errors.login.message}
                  </p>
                )}
              </div> */}

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
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                  />
                </div>
                {errors.sexe && (
                  <p className="text-red-600 text-[.7rem]">{errors.sexe.message}</p>
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

            <p className="text-gray-700 mt-2 text-center text-xs">
              {"  Vous avez déjà encore un compte ? "}
              <Link href={"/sign-up"} className=" text-primary hover:underline">
                Connecter vous.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
