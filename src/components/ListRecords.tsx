"use client";

import React, { useState, useEffect } from "react";
import "./ListRecords.css";
import { BACKEND_API } from "@/constants";

interface Record {
  id: number;
  longitude: number;
  latitude: number;
  housing_median_age: number;
  total_rooms: number;
  total_bedrooms: number;
  population: number;
  households: number;
  median_income: number;
  ocean_proximity: string;
  predicted_value: number;
  creation_date: string;
}

// Define the type for the Pagination component's props
interface PaginationProps {
  recordsPerPage: number;
  totalRecords: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const DisplayRecords: React.FC = () => {
  const [data, setData] = useState<Record[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 4;
  const url = BACKEND_API;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result: Record[] = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [url]);

  // Get current records
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="paginated-list">
      <table className="record-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Housing Median Age</th>
            <th>Total Rooms</th>
            <th>Total Bedrooms</th>
            <th>Population</th>
            <th>Households</th>
            <th>Median Income</th>
            <th>Ocean Proximity</th>
            <th>Predicted Price</th>
            <th>Date of Creation</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record, index = 1) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{record.longitude}</td>
              <td>{record.latitude}</td>
              <td>{record.housing_median_age}</td>
              <td>{record.total_rooms}</td>
              <td>{record.total_bedrooms}</td>
              <td>{record.population}</td>
              <td>{record.households}</td>
              <td>{record.median_income}</td>
              <td>{record.ocean_proximity}</td>
              <td>{record.predicted_value}</td>

              <td>{record.creation_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        recordsPerPage={recordsPerPage}
        totalRecords={data.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const Pagination: React.FC<PaginationProps> = ({
  recordsPerPage,
  totalRecords,
  paginate,
  currentPage,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul className="pagination-list">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`pagination-item ${
              number === currentPage ? "active" : ""
            }`}
          >
            <button
              onClick={() => paginate(number)}
              className="pagination-link"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DisplayRecords;
