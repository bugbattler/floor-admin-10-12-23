import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rowsPerPage = 10;

const InstallationOrder = () => {
  const [data, setData] = useState([]);
  const [prodName, setprodName] = useState();
  const [prodid, setprodid] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      name: "Sr. No.",
      selector: (row, index) => index + 1,
      width: "80px",
    },

    {
      name: "User Id",
      selector: (row) => row.identifier,
      width: "160px",
    },
    {
      name: "First Name",
      selector: (row) => row.firstName,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
    },
    {
      name: "City",
      selector: (row) => row.city,
      width: "90px",
    },
    {
      name: "Postal Code",
      selector: (row) => row.postalCode,
    },
    {
      name: "Mobile No.",
      selector: (row) => row.mNo,
      width: "110px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width: "170px",
    },
    {
      name: "Total Price",
      selector: (row) => row.totalPrice,
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          {/* <button className='border-0 bg-transparent' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => { setprodName(row.identifier); }}><MdDelete className="fs-4" style={{ color: "#dc3545" }} />  </button> */}
          <Link to={`/admin/CostEstiOrderView/${row._id}`}>
            <button className="border-0 bg-transparent ">
              <FaEye className="fs-4" style={{ color: "#198754" }} />
            </button>
          </Link>
        </>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "40px",
        backgroundColor: "white",
        marginTop: "7px",
        boxShadow: " 0px 2px 2px #ced4da",
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "#f0f0f0",
          cursor: "pointer",
        },
      },
    },

    headCells: {
      style: {
        backgroundColor: "rgb(230, 121, 41)",
        fontSize: "15px",
        color: "white",
        fontWeight: "600",
        boxShadow: "0 2px 2px 0 #ced4da, 0 2px 4px 0 rgba(0, 0, 0, 0.19)",
      },
    },

    cells: {
      style: {
        // width:"60%",
        // paddingLeft: '8px',
        // paddingRight: '8px',
        // backgroundColor: '#f7f6ed'
      },
    },
  };

  useEffect(() => {
    axios
      .get(
        "https://backend-floor-10-12-23.vercel.app/api/InstallationOrder/get"
      )
      .then((res) => {
        console.log(111, res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  return (
    <div>
      <DataTable columns={columns} data={data} customStyles={customStyles} />

      <nav aria-label="Page navigation example .d-sm-none .d-md-block">
        <ul className="pagination justify-content-end mt-4">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link "
              style={{
                backgroundColor: "transparent",
                color: "black",
                border: "0",
              }}
              href="#"
              aria-label="Previous"
              onClick={() => handlePageClick(currentPage - 1)}
            >
              <span
                className=""
                style={{ fontSize: "25px" }}
                aria-hidden="true"
              >
                &laquo;
              </span>
            </button>
          </li>

          {Array.from({ length: 5 }).map((_, index) => {
            const pageNumber = currentPage + index;
            return (
              <li
                key={index}
                className={`page-item ${
                  currentPage === pageNumber ? "active" : ""
                }`}
              >
                <button
                  className="page-link num-click ms-1 mt-2"
                  style={{
                    borderRadius: 60,
                    backgroundColor:
                      currentPage === pageNumber ? "#e67929" : "#f7f6ed",
                    color: currentPage === pageNumber ? "white" : "black",
                    border: "0",
                  }}
                  onClick={() => handlePageClick(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}

          <li
            className={`page-item ${
              currentPage === data.length ? "disabled" : ""
            }`}
          >
            <button
              className="page-link "
              style={{
                backgroundColor: "transparent",
                color: "black",
                border: 0,
                fontSize: "25px",
              }}
              onClick={() => handlePageClick(currentPage + 1)}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default InstallationOrder;
