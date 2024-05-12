/* eslint-disable jsx-a11y/alt-text */
"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomImage from "@/components/ui/CustomImage";
import { getRealEstateByID } from "@/services/products.services";
import { RealEstate } from "@/types/Utilisateur";
import { Divider } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

type Props = {};

function RealEstateDetails({}: Props) {
  const pathname = usePathname()?.split("/");
  const router = useRouter();
  const path = pathname ? pathname[pathname?.length - 1] : null;
  console.log("path : ", path, pathname);
  const {
    mutateAsync,
    isSuccess,
    isPending,
    error,
    data: product,
  } = useMutation({
    mutationFn: getRealEstateByID<RealEstate>,
    mutationKey: ["getRealEstateByID"],
  });

  // fetch user data
  useEffect(() => {
    if (!path) return;

    mutateAsync(Number(path))
      .then((res) => {
        //toast.success("Successfully loaded group members");
      })
      .catch((err) => {
        err &&
          toast.error(err?.name + err?.message || "Something went wrong!   ");
      });
  }, [mutateAsync, path]);

  if (isPending) {
    return (
      <div
        id="loading-basic-example"
        className="flex h-screen w-full items-center justify-center gap-4"
      >
        <div
          data-te-loading-management-init
          className="flex flex-col items-center gap-4"
          data-te-parent-selector="#loading-basic-example"
        >
          <div
            data-te-loading-icon-ref
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
          <span data-te-loading-text-ref>Veuillez patienter...</span>
        </div>
      </div>
    );
  }
  if (!product) {
    return (
      <div
        id="loading-basic-example"
        className="flex h-screen w-full items-center justify-center gap-4"
      >
        <div
          data-te-loading-management-init
          className="flex flex-col items-center gap-4"
          data-te-parent-selector="#loading-basic-example"
        >
          <h2 data-te-loading-text-ref>Quelque chose s'est mal passée</h2>
        </div>
      </div>
    );
  }

  const images = (JSON.parse(product.img) as unknown as { url: string }[]).map(
    (image) => image.url,
  );
  console.log("data  ", product);
  return (
    <DefaultLayout>
      <div className="flex justify-between">
        <Breadcrumb pageName="Immobiliers" />
      </div>
      <div className="flex items-center justify-center">
        {/* <div className="text-gray-700 relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border shadow-lg">
          

          <div className="p-6 pt-3">
            <button
              className="bg-gray-900 font-sans shadow-gray-900/10 hover:shadow-gray-900/20 block w-full select-none rounded-lg px-7 py-3.5 text-center align-middle text-sm font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Reserve
            </button>
          </div>
        </div> */}

        <div className="grid grid-cols-1 items-start gap-12 p-6  lg:grid-cols-5">
          <div className="top-0 w-full text-center lg:sticky lg:col-span-3">
            <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <div className="bg-blue-gray-500 shadow-blue-gray-500/40 relative mx-4 mt-4 overflow-hidden rounded-xl bg-clip-border text-white shadow-lg">
                  <CustomImage
                    path={images[0]}
                    className="w-4/5 rounded object-cover"
                  />
                  <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                  <button
                    className="font-sans  !absolute right-4 top-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-6 flex flex-wrap justify-center gap-6">
              {images.map((image, key) => {
                if (key === 0) return null;
                return (
                  <div
                    className="border-gray-800 rounded-xl  border-2 p-4"
                    key={image}
                  >
                    <img
                      className="hover:border-gray-800 w-24 cursor-pointer border-2"
                      src={image}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-[#333]">
              {product.nom}
            </h2>
            <div className="mt-6 flex flex-wrap gap-4">
              <p className="text-4xl font-bold text-[#333]">XAF {"123 000"}</p>
            </div>
            <div className="my-4 flex flex-wrap items-center gap-3">
              <div
                className={`my-3 max-w-fit truncate rounded-full p-1  px-3  text-white ${
                  [
                    "bg-primary",
                    "bg-yellow-700",
                    "bg-red-700",
                    "bg-indigo-800",
                  ][Math.floor(Math.random() * 4)]
                }`}
              >
                <p> {product.typeBien_id.libelle}</p>
              </div>
            </div>

            <div className="mt-1 flex flex-wrap justify-center gap-4">
              {/* {!group?.members.find((u) => u._id === user?._id) ? (
                    <button
                      type="button"
                      onClick={joinGroupHnadler}
                      className="min-w-[200px] px-4 py-3 bg-primary hover:bg-primary/80 text-white text-sm font-bold rounded w-full max-w-[350px] m-auto mt-1"
                    >
                      Integrer le groupe
                    </button>
                  ) : (
                    <p
                      onClick={joinGroupHnadler}
                      className="min-w-[200px] px-4 py-3 bg-primary hover:bg-primary/80 text-white text-sm font-bold rounded w-full max-w-[350px] m-auto mt-1"
                    >
                      Vous etes deja members de ce groupe
                    </p>
                  )} */}
            </div>

            {/* <div className="mt-14 h-full w-full rounded-lg border bg-white p-6 shadow-md">
              <div className="my-3 flex justify-between">
                <p className="text-gray-700">Quantité</p>
                <div className="border-gray-100 flex items-center">
                  <button className="bg-gray-100 cursor-pointer rounded-l px-3.5 py-1 duration-100 hover:bg-primary hover:text-white">
                    {" "}
                    -{" "}
                  </button>
                  <input
                    className="h-8 w-8 border bg-white text-center text-xs outline-none"
                    type="number"
                  />
                  <button className="bg-gray-100 cursor-pointer rounded-r px-3 py-1 duration-100 hover:bg-primary hover:text-white">
                    {" "}
                    +{" "}
                  </button>
                </div>
              </div>
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Prix</p>
                <p className="text-gray-700">XAF 10000</p>
              </div>

              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">XAF 123</p>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  className="m-auto mt-1 w-full min-w-[200px] max-w-[350px] rounded bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary/80"
                >
                  Veuillez patienter
                </button>
                <div className="flex flex-col flex-wrap items-start justify-center gap-4">
                  <button className="m-auto mt-1 w-full min-w-[200px] max-w-[350px] rounded bg-primary px-2 py-2 text-center text-sm font-bold text-white hover:bg-primary/80">
                    Mettre à jour la quantité
                  </button>
                  <button className="m-auto mt-1 w-full min-w-[200px] max-w-[350px] rounded bg-red-600 px-2 py-2 text-center text-sm font-bold text-white hover:bg-red-500">
                    {"Veuillez patienter..."}
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="my-4">
        <h2 className=" text-title-md font-bold uppercase">Description</h2>

        <p className="font-sans text-gray-700 block text-base font-light leading-relaxed antialiased">
          Enter a freshly updated and thoughtfully furnished peaceful home
          surrounded by ancient trees, stone walls, and open meadows.
        </p>
      </div>
      {/* <div>
        <div className="text-gray-700 relative mt-6 flex w-96 flex-col rounded-xl bg-white bg-clip-border shadow-md">
          <div className="bg-blue-gray-500 shadow-blue-gray-500/40 relative mx-4 -mt-6 h-56 overflow-hidden rounded-xl bg-clip-border text-white shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
              alt="card-image"
            />
          </div>
          <div className="p-6">
            <h5 className="font-sans text-blue-gray-900 mb-2 block text-xl font-semibold leading-snug tracking-normal antialiased">
              UI/UX Review Check
            </h5>
            <p className="font-sans block text-base font-light leading-relaxed text-inherit antialiased">
              The place is close to Barceloneta Beach and bus stop just 2 min by
              walk and near to "Naviglio" where you can enjoy the main night
              life in Barcelona.
            </p>
          </div>
          <div className="p-6 pt-0">
            <button
              className="font-sans bg-gray-900 shadow-gray-900/10 hover:shadow-gray-900/20 select-none rounded-lg px-6 py-3 text-center align-middle text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Read More
            </button>
          </div>
        </div>
      </div> */}
      {/* TODO build the object and render properties */}
      <div className="flex flex-col gap-4 rounded border border-stroke p-3">
        <h2 className="text-center text-title-md font-bold uppercase">
          Carcteristiques
        </h2>
        <Divider></Divider>
        <div className="flex flex-wrap gap-3  rounded  ">
          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Garage ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Cave ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Internet ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Proximité restaurant ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Poubelle collective ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Espace vert ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Eau chaude collective ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Chauffage collective ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Interphone ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Sous-sol ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Linge de maison ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Proximité éducation ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Cheminée ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Gardiennage ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Antenne TV collective ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Balcon ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Proximité centre de santé ?
            </label>
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            Ascenseur ?
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 "></div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            Une salle a manger ?
          </div>

          <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
            <label className="block font-medium text-black dark:text-white">
              Lave-vaisselle ?
            </label>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default RealEstateDetails;

{
  /* <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
            <span className="border-gray-900/5 bg-gray-900/5 text-gray-900 hover:border-gray-900/10 hover:bg-gray-900/10 cursor-pointer rounded-full border p-3 transition-colors hover:!opacity-100 group-hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                <path
                  fill-rule="evenodd"
                  d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                  clip-rule="evenodd"
                ></path>
                <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
              </svg>
            </span>
            <span className="border-gray-900/5 bg-gray-900/5 text-gray-900 hover:border-gray-900/10 hover:bg-gray-900/10 cursor-pointer rounded-full border p-3 transition-colors hover:!opacity-100 group-hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span className="border-gray-900/5 bg-gray-900/5 text-gray-900 hover:border-gray-900/10 hover:bg-gray-900/10 cursor-pointer rounded-full border p-3 transition-colors hover:!opacity-100 group-hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
              </svg>
            </span>
            <span className="border-gray-900/5 bg-gray-900/5 text-gray-900 hover:border-gray-900/10 hover:bg-gray-900/10 cursor-pointer rounded-full border p-3 transition-colors hover:!opacity-100 group-hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M19.5 6h-15v9h15V6z"></path>
                <path
                  fill-rule="evenodd"
                  d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 006 21h12a.75.75 0 000-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375zm0 13.5h17.25a.375.375 0 00.375-.375V4.875a.375.375 0 00-.375-.375H3.375A.375.375 0 003 4.875v11.25c0 .207.168.375.375.375z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span className="border-gray-900/5 bg-gray-900/5 text-gray-900 hover:border-gray-900/10 hover:bg-gray-900/10 cursor-pointer rounded-full border p-3 transition-colors hover:!opacity-100 group-hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span className="border-gray-900/5 bg-gray-900/5 text-gray-900 hover:border-gray-900/10 hover:bg-gray-900/10 cursor-pointer rounded-full border p-3 transition-colors hover:!opacity-100 group-hover:opacity-70">
              +20
            </span>
          </div> */
}
