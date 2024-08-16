import Button from "@/components/Button/Button";
import Input from "@/components/formik/input/Input";
import ToastWrapper from "@/components/toast/Toast";
import { changePassword } from "@/services/auth";
import type { ChangePasswordPayload } from "@/services/auth/payload";
import type { AppDispatch } from "@/store";
import { setCredentials } from "@/store/slice/auth/auth.slice";
import type { ApiResponse } from "@/utils/api/calls";
import { toastIcons } from "@/utils/constants";
import { changePasswordSchema } from "@/utils/formSchema";
import type { FormikHelpers } from "formik";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import styles from "./EditPassword.module.scss";

const EditPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mutate, isLoading } = useMutation(changePassword);
  const initialValues: ChangePasswordPayload = {
    OldPassword: "",
    ConfirmPassword: "",
    NewPassword: ""
  };

  const updateProfileCallback = async (resp: ApiResponse<any>) => {
    if (resp.success) {
      dispatch(setCredentials(resp.data));
      toast.success((t) => <ToastWrapper message={resp?.message} t={t} />, {
        icon: toastIcons.success
      });
      // router.push("/user");
    }
  };

  const onSubmitChangePassword = (
    values: ChangePasswordPayload,
    formikHelpers: FormikHelpers<ChangePasswordPayload>
  ) => {
    mutate(values, {
      onSuccess(data) {
        formikHelpers.resetForm();
        updateProfileCallback(data);
      }
    });
  };
  return (
    <div className={styles.header}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitChangePassword}
        validationSchema={changePasswordSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="mb-4 w-full">
              <Input
                type="password"
                label="Current Password"
                name="OldPassword"
              />
            </div>

            <div className=" w-full ">
              <Input type="password" label="New Password" name="NewPassword" />
            </div>

            <div className="w-full ">
              <Input
                type="password"
                label="Confirm Password"
                name="ConfirmPassword"
              />
            </div>
            <div className="mt-10 w-full text-end">
              <Button
                className=""
                type="submit"
                color="primary"
                size="md"
                isLoading={isLoading}
              >
                Update
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditPassword;
