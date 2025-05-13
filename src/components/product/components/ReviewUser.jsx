import React, { useContext, useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaSpinner } from "react-icons/fa";
import { AuthContext } from "../../../context/context";
import toast, { Toaster } from "react-hot-toast";
import { FaRegStar } from "react-icons/fa6";
import { Star } from "lucide-react";
import api from "../../../api";
import { useParams } from "react-router-dom";
import ReviewCont from "./ReviewCont";
const ReviewUser = () => {
  const auth = useContext(AuthContext);

  const { id } = useParams();

  const [ascending, setAscending] = useState(true);
  const [openReview, setOpenReview] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRatingClick = (e) => {
    if (loading) return;
    setRating(e);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!rating || review.trim() === "") {
      toast.error("Please provide a rating and a review");
      setLoading(false);
      return;
    }

    const data = {
      rating,
      review,
      productId: id,
    };

    try {
      const res = api.post("/reviews", data);

      toast.promise(res, {
        loading: "Submitting Review.....",
        success: (res) => {
          return res?.data?.message || "Review submitted successfully";
        },
        error: (err) => {
          const er = err?.response?.data?.message || "Something went wrong";
          return er;
        },
      });

      const postPromise = await res;

      if (postPromise.data.message === "Review posted successfully") {
        setReview("");
        setRating(0);
        setTimeout(() => {
          setOpenReview(false);
        }, 2000);
        setSubmitted(!submitted);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 text-sm ">
      <div className="w-full h-full flex justify-between items-center">
        <h1 className="text-xl font-bold">All Reviews({reviewCount})</h1>

        <div className="flex gap-2">
          <button
            className="px-6 py-2 bg-zinc-100 rounded-xl w-26 flex justify-center "
            onClick={() => setAscending(!ascending)}
          >
            {ascending ? (
              <span className="flex items-center gap-2">
                Newest <FaChevronUp />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Oldest <FaChevronUp />
              </span>
            )}
          </button>
          {auth.isAuth && !openReview && (
            <button
              onClick={() => setOpenReview(true)}
              className="px-6 py-2 bg-black text-white rounded-xl  flex justify-center "
            >
              Write a Review
            </button>
          )}
        </div>
      </div>

      {openReview && (
        <div className="w-full">
          <form onSubmit={handleReviewSubmit}>
            <div className="flex gap-2 py-4">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  onClick={() => {
                    handleRatingClick(index + 1);
                  }}
                  className="cursor-pointer"
                >
                  <Star
                    fill={index + 1 <= rating ? "gold" : "none"}
                    color={index + 1 <= rating ? "gold" : "gray"}
                    size={26}
                  />
                </span>
              ))}
            </div>

            <div className="w-full">
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                name="review"
                id="review"
                placeholder="Write your review here"
                className="w-full outline-none border h-24 border-gray-300 rounded-xl p-2"
              />
            </div>

            <div className="w-full flex gap-2  py-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-black text-white rounded-xl  flex justify-center "
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <FaSpinner className="animate-spin" />
                    Submitting
                  </span>
                ) : (
                  "Submit"
                )}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => setOpenReview(false)}
                className="px-6 py-2 bg-zinc-100 text-black rounded-xl  flex justify-center "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="w-full">
        <ReviewCont
          submitted={submitted}
          setReviewCount={setReviewCount}
          ascending={ascending}
        />
      </div>

      <div className="w-full flex justify-center items-center">
        <button className="px-6 py-2 outline hover:bg-gray-100 cursor-pointer duration-200 outline-gray-300 rounded-xl  flex justify-center ">
          <span className="flex items-center gap-2">
            Load More
            <FaChevronDown />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ReviewUser;
