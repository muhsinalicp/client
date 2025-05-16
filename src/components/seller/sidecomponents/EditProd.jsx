import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
import toast from "react-hot-toast";
import { BiImageAdd } from "react-icons/bi";

import compressImage from "../../../utils/compressImage";
import { Loader2, X } from "lucide-react";
function EditProd() {
  const { id } = useParams();

  const catogories = [
    "Tshirts",
    "Shirts",
    "Jackets",
    "Sweaters",
    "Hoodies",
    "Pants",
    "Casuals",
    "Formals",
    "Party Wears",
    "Sports Wear",
    "Daily Wear",
    "Jeans",
    "Trousers",
    "Shorts",
    "Jumpsuits",
    "Dresses",
    "Skirts",
    "Tops",
    "Tunics",
    "Others",
  ];

  const colors = [
    "Red",
    "Blue",
    "Black",
    "White",
    "Green",
    "Yellow",
    "Orange",
    "Pink",
    "Purple",
    "Brown",
    "Gray",
    "Beige",
    "Gold",
  ];

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedPreviews, setSelectedPreviews] = useState([null, null, null]);
  const [compressingMain, setCompressingMain] = useState(false);
  const [compressing, setCompressing] = useState([false, false, false]);
  const [loading, setLoading] = useState(false);
  const [hovercolor, sethovercolor] = useState(null);
  const [prodData, setProdData] = useState({
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
    additionalImages: [],
  });

  // fetch product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/seller/getproduct/${id}`);
        setProdData(res.data.product);
        setImagePreview(res.data.product.images[0]);
        setSelectedPreviews(res.data.product.images.slice(1, 4));
      } catch (error) {
        toast.error("Something went Wrong");
      }
    };
    fetchData();
  }, []);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", prodData.name);
    formData.append("description", prodData.description);
    formData.append("features", prodData.features);
    formData.append("styleTips", prodData.styleTips);
    formData.append("price", prodData.price);
    formData.append("category", prodData.category);
    formData.append("brand", prodData.brand);
    formData.append("stock", prodData.stock);
    formData.append("sizes", prodData.sizes);
    formData.append("colors", prodData.colors);
    formData.append("mainimage", prodData.mainimage);
    formData.append("additionalImages", prodData.additionalImages);

    const res = await api.patch(`/seller/editproduct/${id}`, formData);
    console.log(res);
  };

  // handle main image change
  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompressingMain(true);
      const compressedFile = await compressImage(file);
      setCompressingMain(false);
      setProdData((prev) => ({
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

  // handle additional image change
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

    // Update additionalImages safely
    setProdData((prev) => {
      console.log(prev);

      const updatedImages = [...prev.additionalImages];
      updatedImages[index] = compressedFile;
      return { ...prev, additionalImages: updatedImages };
    });

    // Update preview safely
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedPreviews((prev) => {
        const updatedPreviews = [...prev];
        updatedPreviews[index] = reader.result;
        return updatedPreviews;
      });
    };
    reader.readAsDataURL(compressedFile);
  };

  // handle remove additional image
  const handleRemoveAdditionalImage = (index) => {
    const updatedImages = [...data.additionalImages];
    const updatedPreviews = [...selectedPreviews];

    updatedImages[index] = null; // or undefined
    updatedPreviews[index] = null;

    setProdData({ ...prodData, additionalImages: updatedImages });
    setSelectedPreviews(updatedPreviews);
  };

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProdData((prev) => ({ ...prev, [name]: value }));
  };

  // handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProdData((prev) => ({
      ...prev,
      sizes: checked
        ? [...prev.sizes, name]
        : prev.sizes.filter((size) => size !== name),
    }));
  };
  const handleColorCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProdData((prev) => ({
      ...prev,
      colors: checked
        ? [...prev.colors, name]
        : prev.colors.filter((color) => color !== name),
    }));
  };
  return (
    <section className="w-full h-full px-4">
      <form
        className="w-full h-full grid grid-cols-2 gap-2"
        onSubmit={handleSubmit}
      >
        <section className="bg-white px-4 py-2  outline-1 outline-gray-300 rounded-xl">
          <div className="py-2">
            <h1 className="font-bold text-2xl">Product Information:</h1>
            <p className="text-xs tracking-widest text-gray-600">
              Edit the product information below
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
              value={prodData.name}
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
              value={prodData.description}
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
                value={prodData.features}
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
                value={prodData.styleTips}
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
                value={prodData.price}
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
                value={prodData.category}
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
                  checked={prodData.sizes.includes("S")}
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
                  checked={prodData.sizes.includes("M")}
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
                  checked={prodData.sizes.includes("L")}
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
                  checked={prodData.sizes.includes("XL")}
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
          <div className="flex flex-col gap-2 mb-2">
            <label className="font-medium" htmlFor="colors">
              Available Product Colors:
            </label>

            <div className="flex gap-4 flex-wrap">
              {colors.map((color) => (
                <label key={color}>
                  <input
                    type="checkbox"
                    name={color}
                    value={color}
                    checked={prodData.colors.includes(color)}
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
                value={prodData.brand}
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
                value={prodData.stock}
                onChange={handleInputChange}
                className="p-2 outline w-full rounded-lg "
                placeholder="Enter the Available Product Stock"
                required
              />
            </div>
          </div>
        </section>

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
                          setProdData({ ...prodData, mainimage: "" });
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

export default EditProd;
