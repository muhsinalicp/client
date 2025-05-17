import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="w-screen min-h-screen  flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center py-4 justify-center gap-3 text-sm">
        {/* about cart-hive  */}
        <div className="w-[90%] md:w-3/4 text-center p-3 space-y-2 outline outline-gray-300 rounded-xl">
          <h1 className="text-3xl tracking-wider font-bold">Cart-Hive</h1>

          <div className="text-center">
            Welcome to Cart-Hive — a hobby project crafted with passion and
            curiosity to explore the world of full-stack web development. This
            platform is a mock e-commerce website where users can explore
            fashion products for men and women.
          </div>

          <div className="text-center">
            While it’s not a real store, Cart-Hive serves as a fully functional
            demo of what a modern e-commerce experience can look like.
          </div>
        </div>

        {/* technologies used */}
        <div className="w-[90%] md:w-3/4 text-center flex flex-col items-center p-3 space-y-2 outline outline-gray-300 rounded-xl">
          <h1 className="text-3xl tracking-wider font-bold">
            Technologies Used
          </h1>

          <ul className="text-left list-disc list-inside md:w-1/2 w-full  space-y-2 py-2">
            <li>
              <span className="font-bold">Frontend:</span> React.js with
              Tailwind CSS for a clean and responsive UI
            </li>
            <li>
              <span className="font-bold">Backend:</span> Node.js & Express for
              RESTful APIs
            </li>
            <li>
              <span className="font-bold">Database:</span> MongoDB for storing
              product and user data
            </li>
            <li>
              <span className="font-bold">State Management:</span> Context API
              for managing global state
            </li>
            <li>
              <span className="font-bold">Authentication:</span> JSON Web Token
              (JWT) for secure user authentication
            </li>
            <li>
              <span className="font-bold">Image Uploads:</span> Handled via AWS
              S3
            </li>
            <li>
              <span className="font-bold">Deployment:</span> Netlify (Frontend)
              & Render (Backend)
            </li>
          </ul>
        </div>

        {/* features */}
        {/* <div className="w-[90%] md:w-3/4 text-center flex flex-col items-center p-3 space-y-2 outline outline-gray-300 rounded-xl">
          <h1 className="text-3xl tracking-wider font-bold">Features</h1>
        </div> */}

        {/* disclaimer */}
        <div className="w-[90%] md:w-3/4 text-center flex flex-col items-center p-3 space-y-2 outline outline-gray-300 rounded-xl">
          <h1 className="text-3xl tracking-wider font-bold">Disclaimer</h1>
          <p className="p-2">
            This project is a mock e-commerce website and is not intended to be
            used as a real store, ans it is not intended for commercial use. It
            does not handle real payments, shipping, or customer service.. All
            products and images are for demonstration purposes only.images are
            from{" "}
            <Link to="https://unsplash.com/" className="text-blue-500">
              unsplash{" "}
            </Link>
            and{" "}
            <Link to="https://www.pexels.com/" className="text-blue-500">
              pexels{" "}
            </Link>
            and{" "}
            <Link to="https://www.shutterstock.com/" className="text-blue-500">
              shutterstock{" "}
            </Link>
            and{" "}
            <Link to="https://www.pixabay.com/" className="text-blue-500">
              pixabay{" "}
            </Link>
            and{" "}
            <Link to="https://www.flickr.com/" className="text-blue-500">
              flickr{" "}
            </Link>
            and{" "}
            <Link to="https://www.unsplash.com/" className="text-blue-500">
              unsplash{" "}
            </Link>
            and desrcription are made from ChatGPT , DeepSeek and Cursor.
          </p>
        </div>

        {/* Why I Built This Project  */}
        <div className="w-[90%] md:w-3/4 text-center flex flex-col items-center p-3 space-y-2 outline outline-gray-300 rounded-xl">
          <h1 className="text-3xl tracking-wider font-bold">
            Why I Built This Project
          </h1>
          <p className="px-2 text-center">
            As an aspiring full-stack developer, I wanted to bring together all
            the skills I’ve learned into a real-world, full-featured project.
            Cart-Hive became the perfect opportunity to not only test those
            skills but to also grow beyond the basics. Through this project, I
            gained hands-on experience in architecting both the frontend and
            backend of a scalable web application. I learned how to structure
            REST APIs, manage complex state in React using Redux Toolkit, secure
            user authentication with JWT and cookies, and handle image uploads
            efficiently. I also explored role-based access control for admin
            features and implemented clean, responsive UI components with
            Tailwind CSS.
          </p>
        </div>

        {/* Future Plans */}
        {/* <div className="w-[90%] md:w-3/4 text-center flex flex-col items-center p-3 space-y-2 outline outline-gray-300 rounded-xl">
          <h1 className="text-3xl tracking-wider font-bold">Future Plans</h1>
        </div> */}
      </div>

      <footer className="w-full bg-black font-mono text-center text-xs md:text-sm text-white py-4">
        Designed and Developed by{" "}
        <Link to="https://muhsinali.vercel.app/" className="text-blue-500">
          Muhsinali
        </Link>
      </footer>
    </div>
  );
}

export default AboutPage;
