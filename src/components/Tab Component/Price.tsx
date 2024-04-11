import React from "react";
import Input from "../Inputs/Input/input-3";

const Price = () => {
  return (
    <div>
      <h2 className="font-medium text-black dark:text-white">Pricing</h2>

      <div className="mb-4.5">
        <Input
          label="Booking Discount"
          title="Booking Discount"
          typeof="number"
          required
        />
      </div>
      <div></div>
      <div className="mb-4.5">
        <Input label="Rate" title="Rate" typeof="number" required />
      </div>
      <div className="mb-4.5">
        <Input label="Unit" title="Unit" typeof="text" required />
      </div>

      <div className="my-6">
        <h3 className="font-medium text-black dark:text-white">Pricing Type</h3>
        <div className="mb-4.5 flex items-center gap-3">
          {/* <Radio
        label={"Standard"}
        value={undefined}
        name={"Standard"}
      />
      <Radio
        label={"Premium"}
        value={undefined}
        name={"Premium"}
      /> */}

          <div className="flex items-center gap-3">
            <label>Standard</label>
            <input
              type="radio"
              title="promotion type"
              name="radio"
              value={"Standard"}
            />
          </div>

          <div className="flex items-center gap-3">
            <label>Premimum</label>
            <input
              type="radio"
              name="radio"
              title="promotion type"
              value={"Standard"}
            />
          </div>
        </div>
      </div>

      <button className="flex w-full justify-center rounded bg-primary400 p-3 font-medium text-gray hover:bg-opacity-90">
        Send Message
      </button>
    </div>
  );
};

export default Price;
