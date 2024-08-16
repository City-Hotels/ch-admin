import React from "react";
import Img from "../Image/Image";

const Avatar: React.FC<{
  Firstname: string;
  Lastname: string;
  Imageurl: string;
  className: string;
}> = ({ Firstname, Lastname, Imageurl, className }) => {
  return (
    <div>
      {Imageurl ? (
        <Img
          className={` rounded-full border ${className}`}
          path={Imageurl || ""}
          name={"user avatar"}
        />
      ) : (
        <span
          className={`flex items-center justify-center rounded-full border bg-black font-matter-bold text-white ${className}`}
        >
          {Firstname[0]} {Lastname[0]}
        </span>
      )}
    </div>
  );
};

export default Avatar;
