import axios from "axios";
import { Loader2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import toast, { Toaster } from "react-hot-toast";
import { BiImageAdd } from "react-icons/bi";
import compressImage from "../../utils/compressImage";

function Addprod() {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedPreviews, setSelectedPreviews] = useState([null, null, null]);

  const [data, setdata] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    mainimage: "",
    colors: [],
    sizes: [],
    brand: "",
    stock: "",
    features: "",
    styleTips: "",
    additionalImages1: "",
    additionalImages2: "",
    additionalImages3: "",
  });
  const [loading, setloading] = useState(false);
  const [compressingMain, setCompressingMain] = useState(false);
  const [compressing, setCompressing] = useState([false, false, false]);
  const nav = useNavigate();
  const [hovercolor, sethovercolor] = useState(null);

  const catogories = [
    // Tops
    "T-Shirts",
    "Shirts",
    "Tops",
    "Tunics",

    // Outerwear
    "Jackets",
    "Sweaters",
    "Hoodies",

    // Bottoms
    "Jeans",
    "Pants",
    "Trousers",
    "Shorts",
    "Skirts",

    // Full Body
    "Dresses",
    "Jumpsuits",

    // Style Categories
    "Casual Wear",
    "Formal Wear",
    "Party Wear",
    "Sports Wear",

    // Other
    "Others",
  ];

  const colors = [
    // Basic Colors
    "Red",
    "Blue",
    "Black",
    "White",
    "Green",
    "Yellow",
    "Orange",
    "Pink",
    "Purple",
    "Aqua",
    "Cyan",
    "Fuchsia",
    "Indigo",
    "Khaki",
    "Lavender",
    "Lime",
    "Magenta",
    "Maroon",
    "Olive",
    "Orchid",
    "Periwinkle",
    "Plum",
    "Salmon",
    "Teal",
    "Turquoise",
    "Violet",

    // Light Colors
    "AliceBlue",
    "AntiqueWhite",
    "Azure",
    "Bisque",
    "BlanchedAlmond",
    "Cornsilk",
    "FloralWhite",
    "GhostWhite",
    "Honeydew",
    "Ivory",
    "LavenderBlush",
    "LemonChiffon",
    "Linen",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "OldLace",
    "PapayaWhip",
    "PeachPuff",
    "Seashell",
    "Snow",
    "Thistle",
    "Wheat",
    "WhiteSmoke",

    // Dark Colors
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DodgerBlue",
    "FireBrick",
    "ForestGreen",
    "Gainsboro",
    "GoldenRod",
    "IndianRed",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSpringGreen",
    "MediumVioletRed",
    "MidnightBlue",
    "OliveDrab",
    "OrangeRed",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "Peru",
    "PowderBlue",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "SandyBrown",
    "SeaGreen",
    "Sienna",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "YellowGreen",

    // Additional Colors
    "Beige",
    "Brown",
    "Coral",
    "Gold",
    "Gray",
    "LightBlue",
    "LightCoral",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSteelBlue",
    "LightYellow",
    "Navy",
    "Silver",
  ];

  const handleAdditionalImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Set compressing true for this index
    setCompressing((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });

    // Compress image
    const compressedFile = await compressImage(file);

    // Set compressing false for this index
    setCompressing((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });

    // Set image key dynamically
    const imageKey = `additionalImages${index + 1}`;

    // Update state with the correct key
    setdata((prev) => ({
      ...prev,
      [imageKey]: compressedFile,
    }));

    // Update preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedPreviews((prev) => {
        const updated = [...prev];
        updated[index] = reader.result;
        return updated;
      });
    };
    reader.readAsDataURL(compressedFile);
  };

  const handleRemoveAdditionalImage = (index) => {
    const imageKey = `additionalImages${index + 1}`;

    // Clear the image and preview for that slot
    setdata((prev) => ({
      ...prev,
      [imageKey]: "",
    }));

    setSelectedPreviews((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompressingMain(true);
      const compressedFile = await compressImage(file);
      setCompressingMain(false);
      setdata((prev) => ({
        ...prev,
        mainimage: compressedFile,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(compressedFile);
    }
  };

  const handleInputChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setdata((prev) => ({
      ...prev,
      sizes: checked
        ? [...prev.sizes, value] // add value if checked
        : prev.sizes.filter((size) => size !== value), // remove if unchecked
    }));
  };

  const handleColorCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setdata((prev) => ({
      ...prev,
      colors: checked
        ? [...prev.colors, value] // add value if checked
        : prev.colors.filter((color) => color !== value), // remove if unchecked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting");
    setloading(true);

    if (!data.mainimage) {
      toast.error("Please upload a main image");
      setloading(false);
      return;
    }

    const formData = new FormData();
    formData.append("productname", data.name);
    formData.append("category", data.category);
    formData.append("brand", data.brand);
    formData.append("colors", data.colors);
    formData.append("sizes", data.sizes);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("styleTips", data.styleTips);
    formData.append("features", data.features);
    formData.append("description", data.description);
    formData.append("mainimage", data.mainimage);
    formData.append("additionalImage1", data.additionalImages1);
    formData.append("additionalImage2", data.additionalImages2);
    formData.append("additionalImage3", data.additionalImages3);

    try {
      const res = api.post(`api/seller/submitproduct`, formData);

      toast.promise(res, {
        loading: "Submitting Product...",
        success: (res) => {
          return res.data.message || "Product uploaded successfully!";
        },
        error: (err) => {
          return err?.response?.data?.message || "Upload failed.";
        },
      });

      const postPromise = await res;

      if (postPromise.status === 200) {
        setTimeout(() => {
          nav("/sellerhome/products");
        }, 2000);
      }
    } catch (err) {
    } finally {
      setloading(false);
    }
  };

  return (
    <section className="w-full h-full px-4">
      <form
        action=""
        className="w-full h-full grid grid-cols-2 gap-2"
        onSubmit={handleSubmit}
      >
        {/* product information */}
        <section className="bg-white px-4 py-2 h-fit outline-1 outline-gray-300 rounded-xl">
          {/* product information heading  */}
          <div className="py-2">
            <h1 className="font-bold text-2xl">Product Information:</h1>
            <p className="text-xs tracking-widest text-gray-600">
              Enter the product information below
            </p>
          </div>

          {/* name */}
          <div className="flex flex-col gap-2 mb-2">
            <label className="font-medium" htmlFor="name">
              Product Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleInputChange}
              className="p-2 outline rounded-lg"
              placeholder="Enter the Product Name"
              autoComplete="true"
              required
            />
          </div>

          {/* description */}
          <div className="flex flex-col gap-2 mb-2 w-full">
            <label className="font-medium" htmlFor="description">
              Product Description:
            </label>
            <textarea
              type="text"
              name="description"
              value={data.description}
              onChange={handleInputChange}
              id="description"
              className="p-2 outline rounded-lg h-24"
              placeholder="Enter the Product Description"
              required
            />
          </div>

          {/* styletips and features */}
          <div className="flex gap-2">
            {/* product features  */}
            <div className="flex flex-col gap-2 mb-2  w-full">
              <label className="font-medium" htmlFor="features">
                Product Features:
              </label>
              <textarea
                type="text"
                name="features"
                value={data.features}
                onChange={handleInputChange}
                id="features"
                className="p-2 outline rounded-lg h-24"
                placeholder="Enter the Product Features , separated by |"
                required
              />
            </div>

            {/* style tips */}
            <div className="flex flex-col gap-2 mb-2 w-full">
              <label className="font-medium" htmlFor="styleTips">
                Style Tips:
              </label>
              <textarea
                type="text"
                name="styleTips"
                value={data.styleTips}
                onChange={handleInputChange}
                id="styleTips"
                className="p-2 outline rounded-lg h-24"
                placeholder="Enter the Product Style Tips separated by |"
                required
              />
            </div>
          </div>

          {/* price and category */}
          <div className="flex gap-2">
            {/* price */}
            <div className="flex flex-col gap-2 mb-2 w-full">
              <label className="font-medium" htmlFor="price">
                Product Price:
              </label>
              <input
                type="text"
                name="price"
                id="price"
                value={data.price}
                onChange={handleInputChange}
                className="p-2 outline rounded-lg "
                placeholder="Enter the Product Price"
                required
              />
            </div>

            {/* category */}
            <div className="flex flex-col gap-2 mb-2 w-full">
              <label className="font-medium" htmlFor="category">
                Select Product Category:
              </label>
              <select
                name="category"
                id="category"
                className="p-2 outline rounded-lg "
                value={data.category}
                onChange={handleInputChange}
              >
                <option disabled value={""}>
                  Select Category
                </option>
                {catogories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* sizes */}
          <div className="flex flex-col gap-2 mb-2">
            <label className="font-medium" htmlFor="sizes">
              Available Product Sizes:
            </label>

            <div className="flex gap-4">
              <div className="flex gap-2 round-checkbox">
                <input
                  type="checkbox"
                  checked={data.sizes.includes("S")}
                  onChange={handleCheckboxChange}
                  id="S"
                  name="S"
                  value="S"
                />
                <label htmlFor="S">S</label>
              </div>

              <div className="flex gap-2 round-checkbox">
                <input
                  type="checkbox"
                  checked={data.sizes.includes("M")}
                  onChange={handleCheckboxChange}
                  id="M"
                  name="M"
                  value="M"
                />
                <label htmlFor="M">M</label>
              </div>

              <div className="flex gap-2 round-checkbox">
                <input
                  type="checkbox"
                  checked={data.sizes.includes("L")}
                  onChange={handleCheckboxChange}
                  id="L"
                  name="L"
                  value="L"
                />
                <label htmlFor="L">L</label>
              </div>

              <div className="flex gap-2 round-checkbox">
                <input
                  type="checkbox"
                  checked={data.sizes.includes("XL")}
                  onChange={handleCheckboxChange}
                  id="XL"
                  name="XL"
                  value="XL"
                />
                <label htmlFor="XL">XL</label>
              </div>
            </div>
          </div>

          {/* colors */}
          <div className="flex flex-col gap-2 mb-2 ">
            <label className="font-medium" htmlFor="colors">
              Available Product Colors:
            </label>

            <div className="flex gap-3 overflow-x-scroll px-1">
              {colors.map((color) => (
                <label key={color}>
                  <input
                    type="checkbox"
                    name={color}
                    value={color}
                    checked={data.colors.includes(color)}
                    onChange={handleColorCheckboxChange}
                    className="hidden peer"
                  />
                  <span
                    className={`w-6 h-6 rounded-full hover:scale-110 duration-200 border-2 border-gray-400 inline-block peer-checked:ring-2 peer-checked:ring-red-500`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onMouseEnter={() => sethovercolor(color)}
                    onMouseLeave={() => sethovercolor(null)}
                    title={color}
                  />
                  <div className="h-4 w-6">
                    {hovercolor === color && (
                      <p className="text-sm text-gray-500">{color}</p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* brand and stock */}
          <div className="flex w-full gap-2 ">
            <div className="flex w-full flex-col gap-2 mb-4">
              <label className="font-medium" htmlFor="brand">
                Product Brand:
              </label>

              <input
                type="text"
                name="brand"
                id="brand"
                value={data.brand}
                onChange={handleInputChange}
                className="p-2 outline rounded-lg "
                placeholder="Enter the Product Brand"
                required
              />
            </div>

            <div className="flex w-full flex-col gap-2 mb-4">
              <label className="font-medium" htmlFor="stock">
                Product Stock:
              </label>

              <input
                type="text"
                name="stock"
                id="stock"
                value={data.stock}
                onChange={handleInputChange}
                className="p-2 outline w-full rounded-lg "
                placeholder="Enter the Available Product Stock"
                required
              />
            </div>
          </div>
        </section>

        {/* images */}
        <section>
          <section className="bg-white p-4 h-fit outline-1 outline-gray-300 rounded-xl">
            {/* product images heading  */}
            <div className="py-4">
              <h1 className="font-bold text-2xl">Product Images:</h1>
              <p className="text-xs tracking-widest text-gray-600">
                <span className="font-bold text-blue-800">Note: </span> You can
                upload upto 4 images (jpg/png) of product. (each 4MB max)
              </p>
            </div>

            {/* main image */}
            <div className="flex flex-col gap-2 mb-4">
              <label className="font-medium " htmlFor="dropzone-file">
                Main Image:
              </label>
              <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center w-24 justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${
                  compressingMain && "bg-gray-200"
                }`}
              >
                <div className=" w-24 h-24 relative flex items-center justify-center">
                  {!compressingMain && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <p className="text-sm font-medium mb-2">
                        <BiImageAdd size={24} />
                      </p>
                    </div>
                  )}

                  {compressingMain && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <Loader2 className="animate-spin" size={24} />
                    </div>
                  )}

                  {imagePreview && (
                    <div className=" absolute top-0 left-0 w-full h-full">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full rounded-md object-contain"
                      />

                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview("");
                          setdata({ ...data, mainimage: "" });
                        }}
                        className="absolute top-1 right-1 hover:bg-gray-200 rounded-full p-1 cursor-pointer z-10"
                      >
                        <X size={18} />
                      </div>
                    </div>
                  )}
                </div>

                <input
                  id="dropzone-file"
                  type="file"
                  name="mainimage"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  disabled={compressingMain}
                  onChange={handleMainImageChange}
                />
              </label>
            </div>

            {/* additional images */}
            <div className="flex flex-col gap-2 mb-4">
              <label
                htmlFor="additional-images"
                className="block text-sm font-medium"
              >
                Additional Images (optional):
              </label>
              <div className="flex gap-4">
                {[0, 1, 2].map((index) => (
                  <label
                    key={index}
                    htmlFor={`additional-image-${index}`}
                    className={`flex flex-col items-center w-24 justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${
                      compressing[index] && "bg-gray-200"
                    }`}
                  >
                    <div className="w-24 h-24 relative flex items-center justify-center">
                      {!compressing[index] && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                          <p className="text-sm font-medium mb-2">
                            <BiImageAdd size={24} />
                          </p>
                        </div>
                      )}

                      {compressing[index] && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                          <Loader2 className="animate-spin" size={24} />
                        </div>
                      )}

                      {selectedPreviews[index] && (
                        <div className="absolute top-0 left-0 w-full h-full">
                          <img
                            src={selectedPreviews[index]}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full rounded-md object-contain"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveAdditionalImage(index);
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>

                    <input
                      id={`additional-image-${index}`}
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      disabled={compressing[index]}
                      onChange={(e) => handleAdditionalImageChange(e, index)}
                    />
                  </label>
                ))}
              </div>
            </div>
          </section>
          <button
            disabled={loading}
            className={`bg-black text-white w-full mt-2 px-14 py-3 rounded-xl   hover:transform hover:bg-black/90  duration-200 cursor-pointer ${
              loading && " hover:bg-black hover:cursor-not-allowed"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 className="animate-spin" size={24} />
                Submitting...
              </span>
            ) : (
              "Submit Product"
            )}
          </button>
        </section>
      </form>
    </section>
  );
}

export default Addprod;
