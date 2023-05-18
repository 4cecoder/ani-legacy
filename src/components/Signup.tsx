import React from "react";

const SignUp: React.FC = () => {
  return (
    <div className="m-2 rounded-2xl bg-white dark:bg-gray-900 ">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 ">
        <section className=" relative flex h-32 items-end rounded-2xl bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6 ">
          <img
            alt="Night"
            src="https://images4.alphacoders.com/100/thumb-1920-1009861.jpg"
            className="absolute inset-0 h-full w-full rounded-2xl object-cover opacity-80"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="/">
              <span className="sr-only">Home</span>
              {/* PLACE SVG HERE */}
              <p>Please place an svg here</p>
            </a>
          </div>
        </section>
        <section className="relative p-12 lg:col-span-7 lg:p-24 xl:col-span-6">
          <h2 className="mb-4 text-3xl font-medium text-gray-200">Sign Up</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="mb-2 block font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded-lg border border-gray-400 p-2"
                placeholder="John Doe"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-2 block font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-lg border border-gray-400 p-2"
                placeholder="example@example.com"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="mb-2 block font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="w-full rounded-lg border border-gray-400 p-2"
                placeholder="********"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password-confirm"
                className="mb-2 block font-medium text-gray-700"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="password-confirm"
                className="w-full rounded-lg border border-gray-400 p-2"
                placeholder="********"
              />
            </div>
            <button className="rounded-full bg-gray-800 py-2 px-4 text-white hover:bg-gray-900">
              Sign Up
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
