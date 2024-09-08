"use client";

import React, { useState } from "react";
import "./HousingForm.css";

import { BACKEND_API } from "@/constants";

interface FormData {
  longitude: number;
  latitude: number;
  housing_median_age: number;
  total_rooms: number;
  total_bedrooms: number;
  population: number;
  households: number;
  median_income: number;
  median_house_value: number;
  ocean_proximity: string;
  creation_date: string;
}

const getCurrentDate = (): string => {
  const today = new Date();

  // Get the date in YYYY-MM-DD format
  const date = today.toISOString().split("T")[0];

  // Get the time in HH:MM:SS format
  const time = today.toTimeString().split(" ")[0];

  return `${date} ${time}`;
};

const initialFormData: FormData = {
  longitude: 0,
  latitude: 0,
  housing_median_age: 0,
  total_rooms: 0,
  total_bedrooms: 0,
  population: 0,
  households: 0,
  median_income: 0,
  median_house_value: 0,
  ocean_proximity: "",
  creation_date: getCurrentDate(),
};

const url = BACKEND_API;

const HousingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "ocean_proximity" || name === "creation_date"
          ? value
          : value === ""
          ? 0 // Handle empty string by setting it to 0 or another appropriate default value
          : parseFloat(value),
    }));
  };

  const handleReset = () => {
    setFormData({
      longitude: 0,
      latitude: 0,
      housing_median_age: 0,
      total_rooms: 0,
      total_bedrooms: 0,
      population: 0,
      households: 0,
      median_income: 0,
      median_house_value: 0,
      ocean_proximity: "",
      creation_date: getCurrentDate(),
    });
    setSubmittedId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network Error");
      }
      const result = await response.json();
      setSubmittedId(result.predicted_value);

      console.log("Form submitted successfully. ID:", result.predicted_value);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <form className="housing-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Longitude:</label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            step="any"
            required
          />
        </div>
        <div className="form-group">
          <label>Latitude:</label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            step="any"
            required
          />
        </div>
        <div className="form-group">
          <label>Housing Median Age:</label>
          <input
            type="number"
            name="housing_median_age"
            value={formData.housing_median_age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Total Rooms:</label>
          <input
            type="number"
            name="total_rooms"
            value={formData.total_rooms}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Total Bedrooms:</label>
          <input
            type="number"
            name="total_bedrooms"
            value={formData.total_bedrooms}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Population:</label>
          <input
            type="number"
            name="population"
            value={formData.population}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Households:</label>
          <input
            type="number"
            name="households"
            value={formData.households}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Median Income:</label>
          <input
            type="number"
            name="median_income"
            value={formData.median_income}
            onChange={handleChange}
            step="any"
            required
          />
        </div>

        <div className="form-group">
          <label>Ocean Proximity:</label>
          <select
            name="ocean_proximity"
            value={formData.ocean_proximity}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="NEAR BAY">NEAR BAY</option>
            <option value="INLAND">INLAND</option>
            <option value="NEAR OCEAN">NEAR OCEAN</option>
            <option value="<1H OCEAN">Less than 1H OCEAN</option>
          </select>
        </div>

        <div className="flex w-full">
          <button
            type="submit"
            className="bg-green-700 w-1/2 text-white rounded-lg p-1 hover:bg-green-500 active:bg-green-950"
          >
            Predict
          </button>

          <button
            type="button"
            className="bg-red-700 w-1/2 text-white rounded-lg p-1 hover:bg-red-500 active:bg-red-950"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
      <br />

      {submittedId && (
        <h2 className=" text-2xl font-extralight text-center text-red-600 ">
          Predicted Price : {submittedId}
        </h2>
      )}
    </div>
  );
};

export default HousingForm;
