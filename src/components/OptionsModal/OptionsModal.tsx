import React, { ChangeEvent, useState } from "react";
import { H5 } from "../Headings/Headings";
import Dropdown from "../Inputs/dropdown/Dropdown-2"; // Assuming Dropdown component is correctly imported
import {
  ISubscribers,
  SubscriptionStatus
} from "@/services/promotions/payload";
import { useMutation } from "react-query";
import {
  deleteSubscription,
  updateSubscriptionStatus
} from "@/services/promotions";
import OptionsModalProps from "./OptionsModal.props";
import Button from "../Button/Button";

const OptionsModal: React.FC<OptionsModalProps> = ({
  subscriber,
  onClose,
  refetch
}) => {
  const [selectedStatus, setSelectedStatus] = useState<SubscriptionStatus>(
    subscriber?.Status || SubscriptionStatus.ACTIVE
  );

  const statusOptions = [
    SubscriptionStatus.ACTIVE,
    SubscriptionStatus.INACTIVE,
    SubscriptionStatus.EXPIRED
  ];

  const getStatusDisplayName = (status: SubscriptionStatus): string => {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return "Active";
      case SubscriptionStatus.INACTIVE:
        return "Inactive";
      case SubscriptionStatus.EXPIRED:
        return "Expired";
      default:
        return "Unknown";
    }
  };

  const displayOptions = statusOptions.map((item) => ({
    label: getStatusDisplayName(item),
    value: item.toString()
  }));

  const { mutate, isLoading } = useMutation(updateSubscriptionStatus, {
    onSuccess: () => {
      refetch(); // Refetches the data after successful update
      onClose(); // Closes the modal
    }
  });

  const { mutate: deletesubcription } = useMutation(deleteSubscription);

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(e.target.value, 10) as SubscriptionStatus;
    setSelectedStatus(selectedValue);
    console.log(selectedValue);
  };

  const handleSubscriptionMutation = () => {
    if (selectedStatus !== subscriber?.Status && subscriber) {
      mutate({ ...subscriber, Status: selectedStatus });
    }
  };

  const handleSubscriptionDelete = (subcriptionId: string) => {
    if (selectedStatus !== subscriber?.Status && subscriber) {
        deletesubcription(subcriptionId);
      }
  };

  return (
    <div className="w-100 bg-white rounded-lg p-4 absolute right-0 top-0">
      <H5 className="mb-4">Update Promotions</H5>

      <Dropdown
        options={displayOptions}
        dropdownValue={selectedStatus.toString()}
        onChange={handleStatusChange}
      />

      <div className="mt-4 flex items-center justify-between">
        {subscriber && (
          <Button
            color="primary"
            size="md"
            onClick={handleSubscriptionMutation}
            disabled={isLoading || selectedStatus === subscriber?.Status}
          >
            Update
          </Button>
        )}

        <Button
          color="danger"
          size="md"
          disabled={isLoading || selectedStatus === subscriber?.Status}
          onClick={() =>
            subscriber?.Id && handleSubscriptionDelete(subscriber.Id)
          }
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default OptionsModal;
