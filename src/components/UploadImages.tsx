import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-hot-toast";
import { Input } from "./ui/input";
import app from "../../firebase";
import { FIREBASE_IMAGES_FOLDER } from "@/lib/utils";

type Props = {
  setImageUrlFoo: (images: string[]) => void;
  putImageUrlFoo: (images: string[]) => void;
  images: string[];
};

const UploadImages = ({ images:uploadedImage, setImageUrlFoo, putImageUrlFoo }: Props) => {
  // State for handling errors and loading state
  const [error, setError] = useState<string | null>(null);
  const [Loading, setLoading] = useState<boolean>(false);

  // State for managing image files and URLs
  const [images, setImage] = useState<File[]>([]);
//   const [imagesUrl, setImageUrl] = useState<string[]>([]);

  // Event handler for adding an image
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files && e.target.files[0];
    if (image) {
      setImage((prev) => [...prev, image]);
    }
  };

  // Event handler for uploading images to Firestore
  const handleUplaodeImage = async () => {
    // Check if images are selected
    if (images.length === 0) {
      setError("Veuillez choisir au moins un fichier");
      return;
    }

    setLoading(true);

    // Upload each image
    const uploadPromises = images.map(async (file) => {
      const storage = getStorage(app);
      const storageRef = ref(storage, FIREBASE_IMAGES_FOLDER + file.name);
      return uploadBytesResumable(storageRef, file);
    });

    try {
      // Wait for all uploads to complete
      const uploadSnapshots = await Promise.all(uploadPromises);

      // Get download URLs for the uploaded images
      const urlsArr = uploadSnapshots.map(async (file) => {
        return getDownloadURL(file.ref);
      });

      // Wait for all URLs to be retrieved
      const downloadURLs = await Promise.all(urlsArr);

      // Reset error, clear image selection, and update image URLs
      setError(null);
      setImage([]);
      toast.success("Les images ont bien été uploader");
      setImageUrlFoo(downloadURLs);
    } catch (error) {
      setError(`Erreur lors de l'upload `);
      toast.error("Une erreur s'est produite lors de l'ajout des images");
      console.log("error uploading: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if the upload button should be disabled
  const uploadBtnMustBeDisabled = images.length <= 0;

  // Render the form
  return (
    <article
      aria-label="File Upload Modal"
      className="relative flex h-full flex-col rounded-md bg-white shadow-xl"
    >
      {/* <!-- scroll area --> */}
      <section className="flex h-full w-full flex-col overflow-auto p-8">
        <label
          htmlFor="hidden-input"
          className="border-gray-400 flex flex-col items-center justify-center border-2 border-dashed py-12"
        >
          <Input
            id="hidden-input"
            type="file"
            onChange={handleAddImage}
            accept="image/*"
            className="hidden"
          />
          <p
            id="button"
            className="bg-gray-200 hover:bg-gray-300 focus:shadow-outline mt-2 rounded-sm px-3 py-1 focus:outline-none"
          >
            Choisir une image
          </p>
        </label>
        <h1 className="text-gray-900 pb-3 pt-8 font-semibold sm:text-lg">
          Images à uploader
        </h1>
        {error && <p className="my-2 text-[.8rem] text-red-500">{error}</p>}

        <ul id="gallery" className="-m-1 flex flex-1 flex-wrap">
          {images.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {images.map((image, ind) => (
                <div key={image.name} className="relative">
                  <Image
                    width={100}
                    height={100}
                    src={URL.createObjectURL(image)}
                    alt=""
                  />
                  <button
                    onClick={() => {
                      setImage((prev) => prev.filter((img, k) => k != ind));
                    }}
                    className="absolute left-0 top-0 m-2 rounded bg-red-600 p-1 text-white"
                  >
                    <MdDelete></MdDelete>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <li
              id="empty"
              className="flex h-full w-full flex-col items-center justify-center text-center "
            >
              <img
                className="mx-auto w-32"
                src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                alt="no data"
              />
              <span className="text-small text-gray-500">
                Aucun fichier choisi
              </span>
            </li>
          )}
        </ul>
        <h1 className="text-gray-900 pb-3 pt-8 font-semibold sm:text-lg">
          Images déjà disponible
        </h1>
        <ul id="gallery" className="-m-1 flex flex-1 flex-wrap">
          {uploadedImage.map((image, ind) => (
            <div key={image} className="relative">
              <img width={100} height={100} src={image} alt="" />
              <button
                onClick={() => {
                  // TODO comme here
                }}
                className="absolute left-0 top-0 m-2 rounded bg-red-600 p-1 text-white"
              >
                <MdDelete></MdDelete>
              </button>
            </div>
          ))}
        </ul>
      </section>
      {/* <!-- using two similar templates for simplicity in js code --> */}
      <template id="file-template">
        <li className="xl:w-1/8 block h-24 w-1/2 p-1 sm:w-1/3 md:w-1/4 lg:w-1/6">
          <article className="focus:shadow-outline elative bg-gray-100 group relative h-full w-full cursor-pointer rounded-md shadow-sm focus:outline-none">
            <img
              alt="upload preview"
              className="img-preview sticky hidden h-full w-full rounded-md bg-fixed object-cover"
            />

            <section className="absolute top-0 z-20 flex h-full w-full flex-col break-words rounded-md px-3 py-2 text-xs">
              <h1 className="flex-1 group-hover:text-blue-800"></h1>
              <div className="flex">
                <span className="p-1 text-blue-800">
                  <i>
                    <svg
                      className="ml-auto h-4 w-4 fill-current pt-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                    </svg>
                  </i>
                </span>
                <p className="size text-gray-700 p-1 text-xs"></p>
                <button className="delete hover:bg-gray-300 text-gray-800 ml-auto rounded-md p-1 focus:outline-none">
                  <svg
                    className="pointer-events-none ml-auto h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="pointer-events-none"
                      d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.511c.9 0 1.631-1.099 1.631-2h5.316c0 .901.53 2 1.631 2h5.511z"
                    />
                  </svg>
                </button>
              </div>
            </section>
          </article>
        </li>
      </template>

      <template id="image-template">
        <li className="xl:w-1/8 block h-24 w-1/2 p-1 sm:w-1/3 md:w-1/4 lg:w-1/6">
          <article className="hasImage focus:shadow-outline bg-gray-100 group relative h-full w-full cursor-pointer rounded-md text-transparent shadow-sm hover:text-white focus:outline-none">
            <img
              alt="upload preview"
              className="img-preview sticky h-full w-full rounded-md bg-fixed object-cover"
            />

            <section className="absolute top-0 z-20 flex h-full w-full flex-col break-words rounded-md px-3 py-2 text-xs">
              <h1 className="flex-1"></h1>
              <div className="flex">
                <span className="p-1">
                  <i>
                    <svg
                      className="pt- ml-auto h-4 w-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                    </svg>
                  </i>
                </span>

                <p className="size p-1 text-xs"></p>
                <button className="delete hover:bg-gray-300 ml-auto rounded-md p-1 focus:outline-none">
                  <svg
                    className="pointer-events-none ml-auto h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="pointer-events-none"
                      d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.511c.9 0 1.631-1.099 1.631-2h5.316c0 .901.53 2 1.631 2h5.511z"
                    />
                  </svg>
                </button>
              </div>
            </section>
          </article>
        </li>
      </template>
      {/* <!-- sticky footer --> */}
      <footer className="flex justify-end px-8 pb-8 pt-4">
        <button
          type="button"
          disabled={uploadBtnMustBeDisabled || Loading}
          onClick={handleUplaodeImage}
          className={`focus:shadow-outline rounded-sm bg-blue-700 px-3  py-1 text-white hover:bg-blue-500 focus:outline-none ${
            uploadBtnMustBeDisabled ? "!bg-gray-400" : ""
          }`}
        >
          {Loading ? "Operation en cours..." : "Uploader Maintenant"}
        </button>
        <button
          id="cancel"
          type="button"
          onClick={() => {
            setImage([]);
          }}
          className="hover:bg-gray-300 focus:shadow-outline ml-3 rounded-sm px-3 py-1 focus:outline-none"
        >
          Annuler
        </button>
      </footer>
    </article>
  );
};
export default UploadImages;
