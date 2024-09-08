"use client";
import React from "react";
import HousingForm from "@/components/HousingForm";

import { IoMdArrowRoundBack } from "react-icons/io";

import { useRouter } from "next/navigation";

const CalculateRate = () => {
  const router = useRouter();
  const previousPage = () => {
    router.back();
  };

  return (
    <div>
      <div className="flex">
        <div
          className="flex hover:cursor-pointer ml-28 mt-7"
          onClick={previousPage}
        >
          <IoMdArrowRoundBack size={30} />
          <p>Previous Page</p>
        </div>

        <h1 className="text-4xl text-center font-serif mt-4 font-bold ml-72">
          Calculate House Price
        </h1>
      </div>

      <br />
      <HousingForm />
    </div>
  );
};

export default CalculateRate;
