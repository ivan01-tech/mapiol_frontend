import { useForm } from "react-hook-form";
import { UtilisateurCreate, UtilisateurSchema } from "@/models/Utilisateurs";

const YourComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UtilisateurCreate>();

  const onSubmit = handleSubmit((data) => {
    // Faire quelque chose avec les données soumises
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Email
        </label>
        <div className="relative">
          <input
            type="text"
            {...register("email")}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
          />
        </div>
        {errors.email && (
          <p className="text-[.7rem] text-red">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
          />
        </div>
        {errors.password && (
          <p className="text-[.7rem] text-red">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Nom
        </label>
        <div className="relative">
          <input
            type="text"
            {...register("nom")}
            placeholder="Enter your name"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
          />
        </div>
        {errors.nom && (
          <p className="text-[.7rem] text-red">{errors.nom.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Sexe
        </label>
        <div className="relative">
          <input
            type="text"
            {...register("sexe")}
            placeholder="Enter your gender"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
          />
        </div>
        {errors.sexe && (
          <p className="text-[.7rem] text-red">{errors.sexe.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Login
        </label>
        <div className="relative">
          <input
            type="text"
            {...register("login")}
            placeholder="Enter your login"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
          />
        </div>
        {errors.login && (
          <p className="text-[.7rem] text-red">{errors.login.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Slug
        </label>
        <div className="relative">
          <input
            type="text"
            {...register("slug")}
            placeholder="Enter your slug"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
          />
        </div>
        {errors.slug && (
          <p className="text-[.7rem] text-red">{errors.slug.message}</p>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default YourComponent;
