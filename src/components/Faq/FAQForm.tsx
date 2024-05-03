import React from "react";
import TextArea from "@/components/formik/textarea/TextArea";
import { faqFormSchema } from "@/utils/formSchema";
import Input from "@/components/formik/input/Input";
import { Formik } from "formik";
import type { IFAQ } from "@/services/faq/payload";
import Button from "../Button/Button";

const FAQForm: React.FC<{
  type: "add" | "update";
  onSubmit: (faq: IFAQ) => void;
  onCancel: Function;
  initialValues: IFAQ;
  onDelete?: Function;
  isSubmitting?: boolean;
  isDeleting?: boolean;
}> = ({
  onSubmit,
  initialValues,
  type,
  onCancel,
  onDelete,
  isSubmitting,
  isDeleting
}) => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          onSubmit({ ...values });
        }}
        validationSchema={faqFormSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="">
            <Input
              name="Question"
              label=""
              placeholder="Add a question e.g “ Will you be living with the guests?”"
              type="text"
              className="bg-white100 text-white700"
            />
            <TextArea
              name="Answer"
              label=""
              placeholder="Add an answer e.g “ Yes, I live on the property too. I will be glad to show you around when you arrive?”"
              type="text"
              className="bg-white100 text-white700"
            />
            <div className="my-6 flex items-center justify-between">
              <div>
                {type === "update" && (
                  <Button
                    color="text-danger"
                    variant="text"
                    isLoading={isDeleting}
                    onClick={() => onDelete && onDelete()}
                  >
                    Delete
                  </Button>
                )}
              </div>
              <div className="flex  gap-3">
                <Button
                  size="sm"
                  color="muted"
                  type="button"
                  onClick={() => onCancel()}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  type="submit"
                  isLoading={isSubmitting}
                  className="capitalize"
                >
                  {type}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    );
  };

export default FAQForm;
