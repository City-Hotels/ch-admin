import React from "react";
import Image from "next/image";


const PromotionsModal = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#2A2A2B] bg-opacity-70 z-50 text-[#181A20] font-matter">
      <div className="bg-[#FCFCFC] p-8 rounded-lg w-full max-w-md">

        <div className="mt-3">
          <button className="bg-orange-200 rounded-full px-4 py-2 font-bold">Basic</button>
          <p className="mt-3 text-[#5D5D5D]">
            Elevate your presence
          </p>
        </div>


        <div className="mt-10">
          <h3 className="text-xl font-bold mb-6">Free</h3>
          <div className="flex items-center text-gray-700 mt-2">
            <img src="./images/icon/checkIcon.svg" alt="Image 1" className="mr-2 mb-11" />
            <p>Default Inclusion: Your listing will be showcased to our vast audience, ensuring visibility among potential clients.</p>
          </div>
          <div className="flex items-center text-gray-700">
            <img src="./images/icon/checkIcon.svg" alt="Image 1" className="mr-2 mb-11" />
            <p>Essential Features: Access essential tools to enhance your listing, like high-quality images and detailed descriptions.</p>
          </div>
          <div className="flex items-center text-gray-700">
            <img src="./images/icon/checkIcon.svg" alt="Image 1" className="mr-2 mb-11" />
            <p>24/7 Support: Our dedicated support team is ready to assist you round the clock.</p>
          </div>
        </div>


        <div className="mt-10">
          <h6 className="text-sm font-bold">Perfect for</h6>
          <div className="flex items-center text-gray-700 mt-2">
            <img src="./images/icon/checkIcon.svg" alt="Image 1" className="mr-2 mb-5" />
            <p>New listers looking to establish a strong online presence.</p>
          </div>
          <div className="flex items-center text-gray-700">
            <img src="./images/icon/checkIcon.svg" alt="Image 1" className="mr-2 mb-5" />
            <p>Individuals who want a cost-effective way to get started.</p>
          </div>
        </div>


        <div className="flex justify-center mt-10">
          <button className="border py-2 px-3 rounded-full w-[198px] font-[inter]">
            Subscribed
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionsModal;