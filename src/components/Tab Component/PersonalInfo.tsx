import React from "react";
import Input from "@/components/Inputs/Input/input-3";
import SelectGroupOne from "../SelectGroup/SelectGroupOne";
const maxNoParticipant = [0, 2, 5, 8];

const PersonalInfo = () => {
  return (
    <div>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-1/2">
          <Input label="Name" title="Name" typeof="text" required />
        </div>
        <div className="w-full xl:w-1/2">
          <Input label="Title" title="Title" typeof="text" required />
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Short Description
        </label>
        <textarea
          rows={2}
          placeholder="Type your message"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          typeof="text"
          title="Short Description"
        ></textarea>
      </div>
      <div className="mb-6">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Description
        </label>
        <textarea
          rows={6}
          placeholder="Type your message"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          typeof="text"
          title="Description"
        ></textarea>
      </div>

      <SelectGroupOne
        disabled="Select Max number of Participant"
        className="mb-9"
        label="Max Participant"
        options={maxNoParticipant}
      />
    </div>
  );
};

export default PersonalInfo;
