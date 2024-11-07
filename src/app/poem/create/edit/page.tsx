import { editPoemData } from "../actions";

const EditPoem = () => {
  return (
    <main className="h-full p-2">
      <form action={editPoemData} className="flex h-full flex-row gap-4 *:flex-1">
        <div className="flex h-full flex-col gap-2">
          <input
            placeholder="Title"
            maxLength={60}
            name="title"
            required
            className="rounded-lg border-2 border-solid border-slate-700 p-2 text-3xl"
          />
          <textarea
            placeholder="Write your poem here"
            name="text"
            required
            className="h-full resize-none rounded-lg border-2 border-solid border-slate-700 p-1 text-lg outline-none"
          />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <input id="image" type="file" name="image" className="hidden" />
          <label
            htmlFor="image"
            className="grid h-full w-full place-items-center rounded-lg border-2 border-dashed border-gray-600 font-bold text-gray-600"
          >
            No Image
          </label>
          <button
            type="submit"
            className="rounded-lg bg-blue-500 py-2 font-bold text-white hover:opacity-80"
          >
            Next
          </button>
        </div>
      </form>
    </main>
  );
};
export default EditPoem;
