import Link from "next/link";

const Home = () => {
  return (
    <main>
      <div className="absolute inset-0 flex h-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/landscape.svg"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-30" />
        </div>
        <div className="relative max-w-lg">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="mb-2 text-6xl font-bold text-white">Poem Maker</h1>
              <p className="text-gray-100">
                A simple web-app to make interactive poems
              </p>
            </div>
            <div className="flex justify-center gap-6 *:flex-1">
              <Link
                href="/explore"
                className="rounded-lg bg-green-500 px-2 py-4 text-xl text-white hover:opacity-90"
              >
                Explore
              </Link>
              <Link
                href="/poem/create/edit"
                className="rounded-lg bg-blue-500 px-2 py-4 text-xl text-white hover:opacity-90"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;
