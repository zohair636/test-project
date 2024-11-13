import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center gap-4">
      <h1 className="lg:text-5xl md:text-4xl text-3xl">
        This is the test project
      </h1>
      <Link href={"/register"}>
        <button className="bg-neutral-900 hover:bg-neutral-950 text-lg p-1 px-4 rounded-full duration-200">
          Let's Start
        </button>
      </Link>
    </div>
  );
};

export default page;
