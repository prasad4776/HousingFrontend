"use client";

import React from "react";

import DisplayRecords from "@/components/ListRecords";

import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const routeToCreate = () => {
    router.push("/predict");
  };
  return (
    <div>
      <h1 className="font-serif text-4xl text-center mt-4">
        Welcome to Housing Calculator
      </h1>
      <div className="flex flex-row-reverse mr-16">
        <button
          onClick={routeToCreate}
          className="bg-yellow-600 text-white  hover:bg-yellow-800 hover:text-amber-300 rounded-lg p-2 active:bg-black active:text-yellow-100"
        >
          Calculate House Prices
        </button>
      </div>

      <DisplayRecords />
    </div>
  );
};

export default Home;
