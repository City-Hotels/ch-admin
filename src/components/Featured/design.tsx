import React from "react";
import Image from "next/image";


const Card = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center border-[#DDDDDD] text-[#181A20] font-Cal Sans">
      <div>
        <div style={{ backgroundImage: "url('/images/icon/background.png')", width: '400px', height: '250px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="flex items-center">
            <button className="bg-[#FE8501] rounded-lg ml-4 mt-2 w-35 h-9 text-[#FFFFFF] flex items-center ml-6">
              <div>
                <Image src="/images/icon/electricity.png" width={20} height={20} alt="electricity" className="ml-3" />
              </div>
              <h1 className="text-[#FFFFFF] ml-3">FEATURED</h1>
            </button>

            <div className="bg-[#FFFFFF] w-10 h-10 rounded-full ml-44 mt-6">
            <Image src="/images/icon/like.png" width={20} height={20} alt="like" className="ml-2.5 mt-2" />
            </div>
          </div>

        </div>

        <div className="flex items-center">

          <div className="w-300px ml-2 mt-5">
            <h1 className="text-18px">Equestrian Family Home</h1>
            <div className="flex items-center mt-2">
              <Image src="/images/icon/location.png" width={20} height={20} alt="location" />
              <h2 className=" ml-2 text-[#5D5D5D]">California City, CA, USA</h2>
            </div>
          </div>

          <div className="flex items-center ml-33">
            <Image src="/images/icon/star.png" width={20} height={20} alt="star" />
            <h1 className=" ml-3">5.0 </h1>
          </div>
        </div>
        <div>
          <hr className="my-4 text-[#DDDDDD]-100 w-95 ml-3 mt-10" />
          <h1 className="font-matter w-16px ml-4 ">₦14,000 / night</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;






