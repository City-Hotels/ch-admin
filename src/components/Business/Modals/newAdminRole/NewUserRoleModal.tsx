import Button from "@/components/Button/Button";
import Input from "@/components/formik/input/Input";
import { H5, Label } from "@/components/Headings/Headings";
import ToastWrapper from "@/components/toast/Toast";
import { createHotelUserRole } from "@/services/hotel-users";
import type { IHotelUserRole } from "@/services/hotel-users/payload";
import { HOTELPERMISSONS, toastIcons } from "@/utils/constants";
import { hotelRoleSchema } from "@/utils/formSchema";
import type { FormikHelpers } from "formik";
import { Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import Checkbox from "@/components/Inputs/checkbox/Checkbox";
import NewUserRoleProps from "./NewUserRoleProps";

const NewUserRoleModel: React.FC<NewUserRoleProps> = ({
  closeModal,
  hotelAdminRole
}) => {
  const initialValues: IHotelUserRole = {
    Title: hotelAdminRole?.Title || "",
    Permissions: hotelAdminRole?.Permissions || [],
    Id: hotelAdminRole?.Id || ""
  };
  const { mutate, isLoading } = useMutation(createHotelUserRole);

  const onSubmit = (
    values: IHotelUserRole,
    formikHelpers: FormikHelpers<IHotelUserRole>
  ) => {
    mutate(values, {
      onSuccess(data) {
        toast.success((t) => <ToastWrapper message={data?.message} t={t} />, {
          icon: toastIcons.success
        });
        formikHelpers.resetForm();
        closeModal();
      }
    });
  };

  const toggleItem = (values: string[], item: string) => {
    const index = values.findIndex((val) => val === item);
    if (index > -1) {
      values.splice(index, 1);
    } else values.push(item);
    return values;
  };

  return (
    <div className=" min-w-full py-10">
      <H5 className="mb-6 text-left font-semibold capitalize text-black md:text-center">
        Custom User Role
      </H5>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={hotelRoleSchema}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="mt-20 flex flex-col gap-10">
              <Input name="Title" label="Title" placeholder="" />
              <div>
                <Label weight="bold" className="">
                  Permissions
                </Label>
                <div className="mt-5 grid grid-cols-2 gap-y-4">
                  {HOTELPERMISSONS.map((permission) => {
                    const selected =
                      values.Permissions.findIndex(
                        (item) => item === permission.Id
                      ) > -1;

                    return (
                      <Checkbox
                        key={permission.Id}
                        label={permission.Name}
                        onChange={() =>
                          setFieldValue(
                            "Permissions",
                            toggleItem(values.Permissions, permission.Id)
                          )
                        }
                        name="close"
                        value={selected}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mt-24 text-end">
                <Button
                  color="muted"
                  size="md"
                  className="mr-5"
                  isLoading={isLoading}
                  onClick={() => closeModal()}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  size="md"
                  type="submit"
                  isLoading={isLoading}
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default NewUserRoleModel;
