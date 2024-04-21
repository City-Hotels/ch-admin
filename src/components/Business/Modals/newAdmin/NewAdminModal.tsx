import Cancel from "@/assets/icons/close.svg";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/formik/input/dropdown/Dropdowns";
import Input from "@/components/formik/input/Input";
import { H5, Label } from "@/components/Headings/Headings";
import ToastWrapper from "@/components/toast/Toast";
import { createHotelUser, getHotelRoles } from "@/services/hotel-users";
import type { IHotelUser } from "@/services/hotel-users/payload";
import queryKeys from "@/utils/api/queryKeys";
import { HOTELPERMISSONS, HOTELROLES, toastIcons } from "@/utils/constants";
import { hotelUserInformationSchema } from "@/utils/formSchema";
import type { FormikHelpers } from "formik";
import { Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import PermissionsListModal from "../permissionsList/PermissionsListModal";
import type NewAdminProps from "./NewAdminProps";

const NewAdminModal: React.FC<NewAdminProps> = ({
  closeModal,
  hotelAdmin,
  onClickCreateCustomRole
}) => {
  const { data: savedRoleRes } = useQuery(
    [queryKeys.getHotelRoles],
    getHotelRoles
  );

  const savedRoles = savedRoleRes?.data.ServiceRoles || [];
  const roles = [...HOTELROLES, ...savedRoles];

  const [selectPermissionModal, setSelectPermissionModal] =
    React.useState(false);
  const initialValues: IHotelUser = {
    Firstname: hotelAdmin?.Firstname || "",
    Lastname: hotelAdmin?.Lastname || "",
    Email: hotelAdmin?.Email || "",
    Telephone: hotelAdmin?.Telephone || "",
    Role: hotelAdmin?.Role || HOTELROLES[0]?.Id || "",
    ExtraPermissions: hotelAdmin?.ExtraPermissions || [],
    Id: hotelAdmin?.Id || "",
    Status: hotelAdmin?.Id || ""
  };
  const { mutate, isLoading } = useMutation(createHotelUser);

  const onSubmit = (
    values: IHotelUser,
    formikHelpers: FormikHelpers<IHotelUser>
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
    <section className="mx-2 my-4 md:mx-10 ">
      <H5 className="mb-6 text-left font-semibold capitalize text-black md:text-center">
        Create Hotel Admin
      </H5>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={hotelUserInformationSchema}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-0">
              <Input name="Firstname" label="First Name" placeholder="" />
              <Input name="Lastname" label="Last Name" placeholder="" />
              <Input name="Email" label="Email" placeholder="" />
              <Input name="Telephone" label="Telephone" placeholder="" />
              <div>
                <Dropdown
                  name="Role"
                  options={roles.map((role) => ({
                    label: role.Title,
                    value: role.Id
                  }))}
                />
                <div>
                  <Button
                    variant="text"
                    type="button"
                    color="text-dark"
                    className="mb-4 px-0"
                    onClick={() => onClickCreateCustomRole()}
                  >
                    <span className="font-matter"> Create custom role</span>
                  </Button>
                </div>
              </div>
              <Label weight="bold" className="mb-2">
                Extra Permissions
              </Label>
              <div
                className="z-10 mb-5  grid max-h-20 min-h-[80px] w-full cursor-pointer grid-cols-2 overflow-y-scroll rounded-sm border p-1 text-sm hover:border-primary400"
                onClick={() => setSelectPermissionModal(true)}
              >
                {values.ExtraPermissions.map((permission) => (
                  <div
                    key={permission}
                    className="static z-20 flex items-center gap-2 py-1"
                  >
                    <Button
                      color="text"
                      onClick={() => {
                        setFieldValue(
                          "ExtraPermissions",
                          toggleItem(values.ExtraPermissions, permission)
                        );
                      }}
                    >
                      <Cancel />
                    </Button>
                    {
                      HOTELPERMISSONS.find((item) => item.Name === permission)
                        ?.Name
                    }
                  </div>
                ))}
              </div>

              {selectPermissionModal && (
                <div className="fixed left-0 top-0 z-[1000000] flex h-screen w-screen items-center justify-center bg-transparent shadow-lg">
                  <div className="h-[98vh] w-full max-w-[600px] bg-white px-10">
                    <PermissionsListModal
                      values={values.ExtraPermissions}
                      onChange={(value: string[]) =>
                        setFieldValue("ExtraPermissions", value)
                      }
                      closeModal={() => setSelectPermissionModal(false)}
                    />
                  </div>
                </div>
              )}

              <div className="text-end">
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
                  onClick={() => closeModal}
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
};

export default NewAdminModal;
