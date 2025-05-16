import React from "react";
import img from "../assets/not-found.svg";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div>
        <div className="">
          <img src={img} className="h-[30vh]" alt="not found" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center">Page Not Found</h1>
          <p className="text-gray-500 text-center">
            The page you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-600 text-center"
          >
            Go back to the home page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
