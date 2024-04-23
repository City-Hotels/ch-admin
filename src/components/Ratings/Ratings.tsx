import React from "react";
import ReactStars from "react-rating-stars-component";

const Ratings: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <ReactStars
      count={5}
      value={rating}
      size={14}
      activeColor="#FE8501"
      classNames="flex gap-2"
    />
  );
};

export default Ratings;
