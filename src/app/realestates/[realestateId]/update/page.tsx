/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createRealestate } from "@/services/landlord.services";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { usePathname, useRouter } from "next/navigation";
import {
  RealEstateType,
  booleanKeys,
  schemaRealEstate,
} from "@/models/RealEstateModel";
import { Checkbox, Divider } from "@chakra-ui/react";
import { getAllTowns, getAllstatetType } from "@/services/generale.services";
import { EstateType, Lanloard, RealEstate, Town } from "@/types/Utilisateur";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/userSlice";
import { getAllLanloard } from "@/services/users.services";
import UploadImages from "@/components/UploadImages";
import { getRealEstateByID } from "@/services/products.services";

type Props = {};
export default function CreateRealEstate({}: Props) {
  const {
    mutateAsync: mutateAsyncFoo,
    isSuccess: isSuccessFOO,
    isPending: isPendFoo,
    error: errFoo,
    data: product,
  } = useMutation({
    mutationFn: getRealEstateByID<RealEstate>,
    mutationKey: ["getRealEstateByID"],
  });

  const { data: landlords } = useQuery({
    queryFn: getAllLanloard<Lanloard[]>,
    queryKey: ["getAllLanloard"],
  });

  const { user } = useSelector(selectUser);
  const { data: towns } = useQuery({
    queryFn: getAllTowns<Town[]>,
    queryKey: ["getAllTowns"],
  });

  const { data: typeEstate } = useQuery({
    queryFn: getAllstatetType<EstateType[]>,
    queryKey: ["getAllstatetType"],
  });
  const {
    isError,
    isSuccess,
    isPending,
    isPaused,
    error,
    mutateAsync,
    data: respData,
  } = useMutation({
    mutationFn: createRealestate<any>,
    mutationKey: ["createRealestate"],
  });
  const [formData, setFormData] = useState({
    nom: "",
    surface: 0,
    uniteSurface: "m2", // Unité de mesure par défaut
  });

  const pathname = usePathname()?.split("/");
  const router = useRouter();
  const path = pathname ? pathname[pathname?.length - 2] : null;
  console.log("path : ", path, pathname);

  const {
    register,
    setValue,
    control,
    reset,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<RealEstateType>({});
  const [imagesUrl, setImageUrl] = useState<string[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const setImageUrlFoo = (images: string[]) => {
    setImageUrl((prev) => [...prev, ...images]);
  };

  const putImageUrlFoo = (images: string[]) => {
    setImageUrl(images);
  };
  const onSubmit = (data: RealEstateType) => {
    console.log(data);
    try {
      mutateAsync({
        ...data,
        // ville_id: !data.ville_id && towns && Number(towns[0].id),
        // typeBien_id:
        //   !data.typeBien_id && typeEstate && Number(typeEstate[1].id),
        exist_salle_manger: false,
        // proprietaire_id: user?.id,
        surface: formData.surface,
        img: imagesUrl,
      })
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
  const setValueFormCheckBox = ({
    key,
    value,
  }: {
    key: keyof RealEstateType;
    value: boolean;
  }) => {
    setValue(key, value);
  };

  const booleanKeysArry = Object.entries(schemaRealEstate.shape).filter(
    ([prev]) => booleanKeys.includes(prev),
  );
  // set default values on somes properties
  useEffect(
    function () {
      if (landlords && landlords.length > 0) {
        setValue("proprietaire_id", landlords[0].id);
      }
    },
    [landlords, setValue],
  );
  useEffect(
    function () {
      if (towns && towns.length > 0) {
        setValue("ville_id", towns[0].id);
      }
    },
    [landlords, setValue, towns],
  );
  useEffect(
    function () {
      if (typeEstate && typeEstate.length > 0) {
        setValue("typeBien_id", typeEstate[0].id);
      }
    },
    [typeEstate, setValue],
  );

  // fetch user data
  useEffect(() => {
    if (!path) return;

    mutateAsyncFoo(Number(path))
      .then((res) => {
        if (res) {
          // delete res?.slug;
          // delete res?.statut;
          // delete res?.img;
          // delete res?.created_at;
          // delete res?.updated_at;
          // delete res?.id;
          reset(res);
        }
      })
      .catch((err) => {
        err &&
          toast.error(err?.name + err?.message || "Something went wrong!   ");
      });
  }, [mutateAsyncFoo, path, reset]);

  console.log("default : ", product);
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
                <p className="text-red-600-700">{error?.message}</p>
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
                  Propriétaire :
                </label>
                {landlords && (
                  <div className="relative flex-1">
                    <select
                      name="proprietaire_id"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setValue("proprietaire_id", Number(e.target.value));
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
                {errors.proprietaire_id && (
                  <p className="text-[.7rem] text-red-600">
                    {errors.proprietaire_id.message}
                  </p>
                )}
              </div>
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
                        })}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                      />
                    </div>
                    {errors.nom && (
                      <p className="text-[.7rem] text-red-600">
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
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                      />
                    </div>
                    {errors.addresse && (
                      <p className="text-[.7rem] text-red-600">
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
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                      />
                    </div>
                    {errors.nbrchambre && (
                      <p className="text-[.7rem] text-red-600">
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
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                      />
                    </div>
                    {errors.nbrescalier && (
                      <p className="text-[.7rem] text-red-600">
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
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                      />
                    </div>
                    {errors.nbrbatiment && (
                      <p className="text-[.7rem] text-red-600">
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
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                      />
                    </div>
                    {errors.numeroporte && (
                      <p className="text-[.7rem] text-red-600">
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
                    {towns && (
                      <div className="relative flex-1">
                        <select
                          // name="uniteSurface"
                          onChange={(e) => {
                            console.log(e.target.value);
                            setValue("ville_id", Number(e.target.value));
                          }}
                          className="w-full  border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                        >
                          {towns?.map((prev) => (
                            <option key={prev.id} value={prev.id}>
                              {prev.nom}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    {errors.ville_id && (
                      <p className="text-[.7rem] text-red-600">
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
                        type="number"
                        {...register("code_postal", {
                          required: "code_postal is required",
                        })}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                      />
                    </div>
                    {errors.code_postal && (
                      <p className="text-[.7rem] text-red-600">
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
                        className=" rounded-lg rounded-br-none rounded-tr-none border border-r-0 border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                      />
                      <select
                        className="w-1/2 rounded-lg rounded-bl-none rounded-tl-none border border-l-0 border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                        value={formData.uniteSurface}
                        name="uniteSurface"
                        onChange={handleChange}
                      >
                        <option value="m2">m²</option>
                        <option value="ft2">ft²</option>
                      </select>
                    </div>
                    {errors.surface && (
                      <p className="text-[.7rem] text-red-600">
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
                        })}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                      />
                    </div>
                    {errors.zoneStationnement && (
                      <p className="text-[.7rem] text-red-600">
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
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                      />
                    </div>
                    {errors.typemouvement && (
                      <p className="text-[.7rem] text-red-600">
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
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                      />
                    </div>
                    {errors.nbr_salle_bain && (
                      <p className="text-[.7rem] text-red-600">
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
                      {typeEstate && (
                        <div className="relative flex-1">
                          <select
                            name="uniteSurface"
                            onChange={(e) => {
                              setValue("typeBien_id", Number(e.target.value));
                            }}
                            className="w-full  border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                          >
                            {typeEstate?.map((prev) => (
                              <option key={prev.id} value={prev.id}>
                                {prev.libelle}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                    {errors.typeBien_id && (
                      <p className="text-[.7rem] text-red-600">
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
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                      />
                    </div>
                    {errors.anneeconstruction && (
                      <p className="text-[.7rem] text-red-600">
                        {errors.anneeconstruction.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* images */}
                <UploadImages
                  putImageUrlFoo={putImageUrlFoo}
                  setImageUrlFoo={setImageUrlFoo}
                  images={imagesUrl}
                />
                {/* end images */}
                {/* the map section */}
                {/* <div className="m-8 flex h-[300px] w-full items-center justify-center overflow-hidden">
                  <MapContainer
                    center={[51.505, -0.09]}
                    zoom={13}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                      <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div> */}
                {/* end map section */}
                <div className="flex flex-col gap-4 rounded border border-stroke p-3">
                  <h2 className="text-center text-title-md font-bold uppercase">
                    CHAmps optionnel
                  </h2>
                  <Divider></Divider>
                  <div className="flex flex-wrap gap-3  rounded  ">
                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Garage ?
                      </label>

                      <Checkbox
                        colorScheme="green"
                        {...register("ungarage")}
                        id="ungarage"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Cave ?
                      </label>

                      <Checkbox
                        colorScheme="green"
                        {...register("unecave")}
                        id="unecave"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Internet ?
                      </label>

                      <Checkbox
                        colorScheme="green"
                        {...register("internet")}
                        id="internet"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Proximité restaurant ?
                      </label>
                      <Checkbox
                        colorScheme="green"
                        {...register("exist_proxi_restaurant")}
                        id="exist_proxi_restaurant"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Poubelle collective ?
                      </label>
                      <Checkbox
                        colorScheme="green"
                        {...register("pc_vide_ordure")}
                        id="pc_vide_ordure"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Espace vert ?
                      </label>
                      <Checkbox
                        colorScheme="green"
                        {...register("pc_espace_vert")}
                        id="pc_espace_vert"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Eau chaude collective ?
                      </label>
                      <Checkbox
                        colorScheme="green"
                        {...register("pc_eau_chaude_collective")}
                        id="pc_eau_chaude_collective"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Chauffage collective ?
                      </label>
                      <Checkbox
                        colorScheme="green"
                        {...register("pc_chauffage_collective")}
                        id="pc_chauffage_collective"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Interphone ?
                      </label>

                      <Checkbox
                        colorScheme="green"
                        {...register("pc_interphone")}
                        id="pc_interphone"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Sous-sol ?
                      </label>
                      <Checkbox
                        colorScheme="green"
                        {...register("exist_sous_sol")}
                        id="exist_sous_sol"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Linge de maison ?
                      </label>
                      <Checkbox
                        colorScheme="green"
                        {...register("dep_lingemaison")}
                        id="dep_lingemaison"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Proximité éducation ?
                      </label>
                      <Checkbox
                        colorScheme="green"
                        {...register("exist_proxi_education")}
                        id="exist_proxi_education"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Cheminée ?
                      </label>
                      <Checkbox
                        colorScheme="green"
                        {...register("exist_cheminee")}
                        id="exist_cheminee"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Gardiennage ?
                      </label>
                      <Checkbox
                        colorScheme="green"
                        {...register("pc_gardiennage")}
                        id="pc_gardiennage"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Antenne TV collective ?
                      </label>
                      <Checkbox
                        colorScheme="green"
                        {...register("pc_antennetv_collective")}
                        id="pc_antennetv_collective"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Balcon ?
                      </label>

                      <Checkbox
                        colorScheme="green"
                        {...register("exist_balcon")}
                        id="exist_balcon"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Proximité centre de santé ?
                      </label>
                      <Checkbox
                        colorScheme="green"
                        {...register("exist_proxi_centre_sante")}
                        id="exist_proxi_centre_sante"
                      />
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <Checkbox
                        colorScheme="green"
                        {...register("pc_ascenseur")}
                        onChange={(e) =>
                          setValueFormCheckBox({
                            value: e.target.checked,
                            key: "pc_ascenseur",
                          })
                        }
                        id="pc_ascenseur"
                      >
                        Ascenseur ?
                      </Checkbox>
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <Checkbox
                        colorScheme="green"
                        {...register("dep_tvecranplat")}
                        onChange={(e) =>
                          setValueFormCheckBox({
                            value: e.target.checked,
                            key: "dep_tvecranplat",
                          })
                        }
                        id="dep_tvecranplat"
                      >
                        Type ecran plat ?
                      </Checkbox>
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <Checkbox
                        colorScheme="green"
                        {...register("exist_salle_manger")}
                        onChange={(e) =>
                          setValueFormCheckBox({
                            value: e.target.checked,
                            key: "exist_salle_manger",
                          })
                        }
                        id="exist_salle_manger"
                      >
                        Une salle a manger ?
                      </Checkbox>
                    </div>

                    <div className="mb-6 flex w-1/3 min-w-[150px] max-w-[250px] flex-row-reverse items-center gap-2 ">
                      <label className="block font-medium text-black dark:text-white">
                        Lave-vaisselle ?
                      </label>
                      <Checkbox
                        colorScheme="green"
                        {...register("dep_lavevaiselle")}
                        id="dep_lavevaiselle"
                      />
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
