import Buttons from "@/app/ui/buttons/page";

export function ButtonLoading() {
  return (
    <button
      disabled
      className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
    >
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-secondary border-t-transparent"></div>
      Please wait
    </button>
  );
}
