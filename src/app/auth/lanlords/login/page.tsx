"use client";
import { Button } from "@/components/ui/button";
import "react-international-phone/style.css";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginLanLord, loginUser } from "@/services/users.services";
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
import toast from "react-hot-toast";
import { LanloardCreate } from "@/types/Utilisateur";
import { useDispatch } from "react-redux";
import { addUserInfo } from "@/redux/userSlice";

export default function SignInAccount() {
  // state
  const router = useRouter();

  // Mutations
  const { mutateAsync, isError, isPending, data, error, isSuccess } =
    useMutation({
      mutationFn: loginLanLord<LanloardCreate>,
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginModelType>({
    resolver: zodResolver(LoginModel),
  });
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<LoginModelType> = (user, e) => {
    console.log("first form  : ", user);

    mutateAsync(user)
      .then((resp) => {
        console.log("response: ", resp.slug);
        dispatch(
          addUserInfo({
            // TODO
            email: resp.email,
            id: resp.id,
            nom: resp.nom,
            password: resp.password,
            slug: resp.slug,
            statut: resp.statut,
            type_user: { libelle: resp.type_user },
          }),
        );
        toast.success("Success!");
        return router.replace("/lanlords/" + resp.slug);
      })
      .catch((err) => {
        toast.error(err.message || error?.message);
        console.log("response: ", err);
      });
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
                  width={500}
                  height={500}
                  src="/images/logo/mapiol_logo.png"
                  className="w-28  object-contain"
                  alt="Logo mapiol"
                />
              </CardTitle>
              <div className="my-3 text-2xl font-bold">Ravi de vous revoir</div>
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
                  className="w-full rounded-lg border  border-secondary bg-transparent py-4 pl-6 pr-10 text-black outline-none focus-visible:shadow-none dark:border-form-strokedark dark:border-secondary dark:bg-form-input dark:text-white"
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
                  type="password"
                  {...register("password", {
                    required: "Address is required",
                  })}
                  placeholder="Enter your address"
                  className="w-full rounded-lg border  border-secondary bg-transparent py-4 pl-6 pr-10 text-black outline-none focus-visible:shadow-none dark:border-form-strokedark dark:border-secondary dark:bg-form-input dark:text-white"
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
