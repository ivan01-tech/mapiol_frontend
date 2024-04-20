"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createLanloard } from "@/services/landlord.services";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useRouter } from "next/navigation";
import { RealEstateType } from "@/models/RealEstateModel";
import { Checkbox } from "@/components/ui/checkbox";
import { Divider } from "@chakra-ui/react";

type Props = {};
export default function CreateRealEstate({}: Props) {
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
  } = useForm<RealEstateType>();
  const router = useRouter();

  const [formData, setFormData] = useState({
    nom: "",
    surface: "",
    uniteSurface: "m2", // Unité de mesure par défaut
    // Autres propriétés...
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   onSubmit(formData);
  // };

  const onSubmit = (data: RealEstateType) => {
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
              Créer un immobilier
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
                <div className="flex flex-wrap justify-stretch gap-2">
                  <div className="mb-6 min-w-[250px] flex-1">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Nom
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register("nom", {
                          required: "nom is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid nom address",
                          },
                        })}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    {errors.nom && (
                      <p className="text-red text-[.7rem]">
                        {errors.nom.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-6 min-w-[250px] flex-1">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Addresse
                    </label>
                    <div className="relative">
                      <input
                        type="addresse"
                        {...register("addresse", {
                          required: "addresse is required",
                        })}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    {errors.addresse && (
                      <p className="text-red text-[.7rem]">
                        {errors.addresse.message}
                      </p>
                    )}
                  </div>
                </div>

                {/*  */}
                <div className="flex flex-wrap justify-stretch gap-2">
                  <div className="mb-6 min-w-[150px] flex-1">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Nbre chambres
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        {...register("nbrchambre", {
                          required: "nbrchambre is required",
                        })}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    {errors.nbrchambre && (
                      <p className="text-red text-[.7rem]">
                        {errors.nbrchambre.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-6 min-w-[150px] flex-1">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Nbre escalier :
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        {...register("nbrescalier", {
                          required: "nbrescalier is required",
                        })}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    {errors.nbrescalier && (
                      <p className="text-red text-[.7rem]">
                        {errors.nbrescalier.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-6 min-w-[150px] flex-1">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Nbre batiments :
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        {...register("nbrbatiment", {
                          required: "nbrbatiment is required",
                        })}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    {errors.nbrbatiment && (
                      <p className="text-red text-[.7rem]">
                        {errors.nbrbatiment.message}
                      </p>
                    )}
                  </div>
                  {/*  */}
                  <div className="mb-6 min-w-[150px] flex-1">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Nbre portes :
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        {...register("numeroporte", {
                          required: "numeroporte is required",
                        })}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    {errors.numeroporte && (
                      <p className="text-red text-[.7rem]">
                        {errors.numeroporte.message}
                      </p>
                    )}
                  </div>

                  {/*  */}
                </div>
                <div className="overflow- flex flex-wrap justify-stretch gap-2">
                  <div className="mb-6 min-w-[150px]">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Ville
                    </label>
                    <div className="relative flex-1">
                      <select
                        name="uniteSurface"
                        className="w-full  border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        <option value="m2">Caemroun</option>
                        <option value="ft2">ft²</option>
                      </select>
                    </div>
                    {errors.ville_id && (
                      <p className="text-red text-[.7rem]">
                        {errors.ville_id.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-6 min-w-[150px] flex-1">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Code postale
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register("code_postal", {
                          required: "code_postal is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid nom address",
                          },
                        })}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    {errors.code_postal && (
                      <p className="text-red text-[.7rem]">
                        {errors.code_postal.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-6 min-w-[150px] flex-1">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Surface
                    </label>
                    <div className="flex">
                      <input
                        id="surface"
                        name="surface"
                        type="number"
                        value={formData.surface}
                        onChange={handleChange}
                        className=" rounded-lg rounded-br-none rounded-tr-none border border-r-0 border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <select
                        name="uniteSurface"
                        className="w-1/2 rounded-lg rounded-bl-none rounded-tl-none border border-l-0 border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={formData.uniteSurface}
                        onChange={handleChange}
                      >
                        <option value="m2">m²</option>
                        <option value="ft2">ft²</option>
                      </select>
                    </div>
                    {errors.surface && (
                      <p className="text-red text-[.7rem]">
                        {errors.surface.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap justify-stretch gap-2">
                  <div className="mb-6 min-w-[250px] flex-1">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Zone de Stationnement
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register("zoneStationnement", {
                          required: "zoneStationnement is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid zoneStationnement address",
                          },
                        })}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    {errors.zoneStationnement && (
                      <p className="text-red text-[.7rem]">
                        {errors.zoneStationnement.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-6 min-w-[250px] flex-1">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Type de mouvement
                    </label>
                    <div className="relative">
                      <input
                        type="typemouvement"
                        {...register("typemouvement", {
                          required: "typemouvement is required",
                        })}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    {errors.typemouvement && (
                      <p className="text-red text-[.7rem]">
                        {errors.typemouvement.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-6 min-w-[250px] flex-1">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Nbre de salles de bain
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        {...register("nbr_salle_bain", {
                          required: "nbr_salle_bain is required",
                        })}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    {errors.nbr_salle_bain && (
                      <p className="text-red text-[.7rem]">
                        {errors.nbr_salle_bain.message}
                      </p>
                    )}
                  </div>
                </div>

                {/*  */}

                <div className="flex flex-wrap justify-stretch gap-2">
                  <div className="mb-6 min-w-[150px] flex-1">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Type de bien
                    </label>
                    <div className="flex">
                      <input
                        id="typeBien_id"
                        name="typeBien_id"
                        type="number"
                        className=" rounded-lg rounded-br-none rounded-tr-none border border-r-0 border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <select
                        name="typeBien_id"
                        className="w-1/2 rounded-lg rounded-bl-none rounded-tl-none border border-l-0 border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={formData.uniteSurface}
                        onChange={handleChange}
                      >
                        <option value="m2">m²</option>
                        <option value="ft2">ft²</option>
                      </select>
                    </div>
                    {errors.typeBien_id && (
                      <p className="text-red text-[.7rem]">
                        {errors.typeBien_id.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-6 min-w-[250px] flex-1">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Annee de construction
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        {...register("anneeconstruction", {
                          required: "anneeconstruction is required",
                        })}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    {errors.anneeconstruction && (
                      <p className="text-red text-[.7rem]">
                        {errors.anneeconstruction.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-4 rounded border border-stroke p-3">
                  <h2 className="text-center text-title-md font-bold uppercase">
                    CHAmps optionnel
                  </h2>
                  <Divider></Divider>
                  <div className="flex flex-wrap gap-3  rounded  ">
                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Salle à manger ?
                      </label>
                      <Checkbox {...register("exist_salle_manger")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Garage ?
                      </label>

                      <Checkbox {...register("ungarage")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Cave ?
                      </label>

                      <Checkbox {...register("unecave")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Internet ?
                      </label>

                      <Checkbox {...register("internet")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Téléviseur écran plat ?
                      </label>
                      <Checkbox {...register("dep_tvecranplat")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Téléviseur écran plat ?
                      </label>
                      <Checkbox {...register("dep_tvecranplat")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Proximité restaurant ?
                      </label>
                      <Checkbox {...register("exist_proxi_restaurant")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Poubelle collective ?
                      </label>
                      <Checkbox {...register("pc_vide_ordure")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Espace vert ?
                      </label>
                      <Checkbox {...register("pc_espace_vert")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Eau chaude collective ?
                      </label>
                      <Checkbox {...register("pc_eau_chaude_collective")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Chauffage collective ?
                      </label>
                      <Checkbox {...register("pc_chauffage_collective")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Interphone ?
                      </label>

                      <Checkbox {...register("pc_interphone")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Sous-sol ?
                      </label>
                      <Checkbox {...register("exist_sous_sol")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Linge de maison ?
                      </label>
                      <Checkbox {...register("dep_lingemaison")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Proximité éducation ?
                      </label>
                      <Checkbox {...register("exist_proxi_education")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Salle à manger ?
                      </label>
                      <Checkbox {...register("exist_salle_manger")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Cheminée ?
                      </label>
                      <Checkbox {...register("exist_cheminee")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Gardiennage ?
                      </label>
                      <Checkbox {...register("pc_gardiennage")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Antenne TV collective ?
                      </label>
                      <Checkbox {...register("pc_antennetv_collective")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Balcon ?
                      </label>

                      <Checkbox {...register("exist_balcon")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Proximité centre de santé ?
                      </label>
                      <Checkbox {...register("exist_proxi_centre_sante")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Ascenseur ?
                      </label>

                      <Checkbox {...register("pc_ascenseur")} />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Lave-vaisselle ?
                      </label>
                      <Checkbox {...register("dep_lavevaiselle")} />
                    </div>
                  </div>
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
