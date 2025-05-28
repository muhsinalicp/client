import React from "react";

const ProductDetails = ({ data }) => {
  const lightColors = [
    "white",
    "yellow",
    "lightgray",
    "beige",
    "ivory",
    "mintcream",
    "whitesmoke",
  ];

  const getTextColor = (colorName) =>
    lightColors.includes(colorName.toLowerCase()) ? "text-black" : "text-white";

  return (
    <div className="w-full h-full space-y-4">
      {/* about product */}
      <div className="flex flex-col gap-2 md:px-4">
        <h1 className="text-xl font-bold">About Product :</h1>
        <p className="text-sm leading-6 text-gray-500 md:w-3/4">
          {data?.description}
        </p>
      </div>

      {/* why you'll love them */}
      <div className="flex flex-col gap-2 md:px-4">
        <h1 className="text-xl font-bold">Why You’ll Love Them:</h1>

        <ol className="list-disc list-inside space-y-1">
          {data?.features.split("|").map((feature) => (
            <li key={feature} className="text-sm text-gray-500 md:w-3/4">
              {feature}
            </li>
          ))}
        </ol>
      </div>

      {/* style it with */}
      <div className="flex flex-col gap-2 md:px-4">
        <h1 className="text-xl font-bold">Style it with:</h1>

        <ol className="list-disc list-inside space-y-1">
          {data?.styleTips.split("|").map((feature) => (
            <li key={feature} className="text-sm text-gray-500 md:w-3/4">
              {feature}
            </li>
          ))}
        </ol>
      </div>

      {/* available in*/}
      <div className="flex flex-col gap-2 md:px-4">
        <h1 className="text-xl font-bold">Available in:</h1>
        <div className="flex flex-wrap gap-2">
          {data?.colors.map((color) => (
            <div
              key={color}
              className={`w-fill px-2 rounded-md text-center py-1  ${getTextColor(
                color
              )} font-medium text-sm outline  outline-gray-200`}
              style={{ backgroundColor: color }}
            >
              {color.toLowerCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
