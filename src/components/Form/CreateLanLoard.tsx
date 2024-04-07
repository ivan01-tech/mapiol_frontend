import React from "react";
import SelectGroupOne from "../SelectGroup/SelectGroupOne";
import { LanlordInput } from "@/models/CreateLanlordModel";
import { useForm } from "react-hook-form";

type Props = {};

function CreateLanLoard({}: Props) {
  
   const { register, handleSubmit, formState: { errors } } = useForm<LanlordInput>();

  const onSubmit = (data: LanlordInput) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col gap-9">
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Créer un Proprietaire
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  <p className="text-[.7rem] text-red">
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
                  <p className="text-[.7rem] text-red">
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
                  <p className="text-[.7rem] text-red">{errors.nom.message}</p>
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
                  <p className="text-[.7rem] text-red">
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
                  <p className="text-[.7rem] text-red">
                    {errors.addresse.message}
                  </p>
                )}
              </div>
            </div>

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateLanLoard;
