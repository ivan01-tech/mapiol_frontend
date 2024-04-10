"use client";
import { Button } from "@/components/ui/button";
import "react-international-phone/style.css";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
} from "@/services/users.services";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ButtonLoading } from "@/components/ui/BuutonLoading";
import { LoginModel, LoginModelType } from "@/models/LoginModel";

export default function SignInAccount() {
  // state
  const router = useRouter();

  // Mutations
  const { mutate, isError, isPending, data, error, isSuccess } = useMutation({
    mutationFn: loginUser<any>,
  });

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<LoginModelType>({
    resolver: zodResolver(LoginModel),
  });

  const onSubmit: SubmitHandler<LoginModelType> = (user, e) => {
    console.log("first form  : ", user);

    mutate(user);
  };
  return (
    <>
      <div className="flex min-h-screen justify-center">
        <form
          className="m-auto mx-4 w-full bg-white lg:max-w-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card
            style={{
              backgroundColor: "#E0E9E8",
            }}
          >
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl ">
                <Image
                  width={150}
                  height={150}
                  src="/images/logo/mapiol_logo.jpeg"
                  className="w-28 rounded-full lg:w-32"
                  alt="Logo mapiol"
                />
              </CardTitle>
              <div className="my-3 text-2xl font-bold">
                Ravi de vous revoir
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="email">
                  Email <span className="text-[.7rem] text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("email", {
                    required: "Address is required",
                  })}
                  placeholder="Enter your address"
                  className="w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 text-black outline-none border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:border-primary"
                />
                {errors.email && (
                  <p className="text-[.7rem] text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <label htmlFor="password">
                  Mot de passe{" "}
                  <span className="text-[.7rem] text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("password", {
                    required: "Address is required",
                  })}
                  placeholder="Enter your address"
                  className="w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 text-black outline-none border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:border-primary"
                />
                {errors.password && (
                  <p className="text-[.7rem] text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              {isPending ? (
                <ButtonLoading />
              ) : (
                <Button type="submit" className="w-full text-white">
                  Se connecter
                </Button>
              )}
              <p className="text-gray-700 mt-2 text-center text-xs">
                {"  Vous n'avez pas encore de compte ? "}
                <Link
                  href={"/sign-up"}
                  className=" text-primary hover:underline"
                >
                  Créez-en un ici.
                </Link>
              </p>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}
