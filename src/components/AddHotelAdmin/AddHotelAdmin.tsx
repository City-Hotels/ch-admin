import Button from "@/components/Button/Button";
import { H4 } from "@/components/Headings/Headings";
import Input from "@/components/Inputs/Input/Input";
import { rest } from "lodash";
import React, { useState } from "react";
import styles from "./AddHotelAdmin.module.scss";

const AddHotelAdmin: React.FC<{ onCancel: Function }> = ({ onCancel }) => {
  const [inputTextValue] = useState();
  const [inputNumberValue] = useState();
  return (
    <div className={styles.header}>
      <form className={styles.form}>
        <H4 className="font-semibold">Add A New User</H4>

        <Input
          type="text"
          id="usersName"
          name="name"
          label="First and Last Name"
          placeholder="e.g john doe"
          value={inputTextValue}
          className="rounded-lg"
          {...rest}
        />
        <Input
          type="email"
          id="userEmail"
          name="email"
          label="Email Address"
          placeholder="e.g johndoe123@gmail.com"
          value={inputTextValue}
          className="rounded-lg"
          {...rest}
        />

        <Input
          label="Telephone"
          type="tel"
          id="telephoneNumber"
          name="telephone number"
          placeholder="+2348728973968"
          value={inputNumberValue}
          className="rounded-lg"
          {...rest}
        />
        <Input
          type="text"
          id="role"
          name="role"
          label="Role"
          placeholder="Receptionist"
          value={inputTextValue}
          className="rounded-lg"
          {...rest}
        />

        <div className={styles.button}>
          <Button color="text" size="lg" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button
            color="primary"
            size="sm"
            className="h-[42px] w-[210px] rounded-lg"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddHotelAdmin;
