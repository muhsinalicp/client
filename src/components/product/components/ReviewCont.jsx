import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
import { FaSpinner } from "react-icons/fa6";
import { Star } from "lucide-react";

function ReviewCont({ submitted, setReviewCount, ascending }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/reviews/${id}`);
        setReviews(res.data.data);
        if (!ascending) {
          setReviews(res.data.data.reverse());
        }
        setReviewCount(res.data.data.length);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [submitted, ascending]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center py-10">
        <FaSpinner size={36} className="animate-spin" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return <div>No reviews found</div>;
  }

  return (
    <div className="w-full py-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="w-full h-full outline-2 outline-gray-100 rounded-2xl p-4 flex flex-col gap-2"
        >
          <div className="flex gap-1">
            {Array.from({ length: review.rating }).map((_, i) => (
              <div key={i}>
                <Star size={20} fill="gold" color="gold" />
              </div>
            ))}
          </div>

          <div className="font-semibold capitalize text-base">
            {review.username}
          </div>

          <div className="text-sm text-gray-500">{review.review}</div>

          <div className="text-xs text-gray-800 pt-2">
            Posted on {new Date(review.postedAt).toLocaleDateString()} at{" "}
            {new Date(review.postedAt).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewCont;
