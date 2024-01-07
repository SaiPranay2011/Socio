"use client";

import Modal from "@/components/modals/Modal";
import Button from "@/components/reusableComponents/button";
import Input from "@/components/reusableComponents/input";
import { User } from "@prisma/client";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { FiEdit } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface SettingModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingModal: React.FC<SettingModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 dark:border-gray-50/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
              Profile
            </h2>
            <div className="flex justify-between items-center">
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                Edit your public information
              </p>
              <div onClick={() => setEditOpen(true)}>
                {!editOpen ? (
                  <Button disabled={isLoading} secondary type="button">
                    <span className="flex items-center">
                      Edit <FiEdit className="ml-1" size={16} />
                    </span>
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-y-6">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Profile Picture
                </label>
                <div className="mt-2 flex flex-col items-center justify-center gap-x-3">
                  <Image
                    width="150"
                    height="150"
                    className="rounded-full"
                    src={
                      image ||
                      currentUser?.image ||
                      "/assets/images/placeholder.jpg"
                    }
                    alt="Avatar"
                  />
                  {editOpen && (
                    <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="socioweb"
                  >
                    <Button disabled={isLoading} secondary type="button">
                      <span className="flex items-center">
                        Change <FiEdit className="ml-1" size={16} />
                      </span>
                    </Button>
                  </CldUploadButton>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
                  Personal Information
                </h2>
                {editOpen ? (
                  <div className="flex flex-col gap-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-100 sm:w-40 sm:flex-shrink-0">
                        Email
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300 sm:col-span-2">
                        {currentUser.email}
                      </dd>
                    </div>
                    <Input
                      disabled={isLoading}
                      label="Name"
                      id="name"
                      errors={errors}
                      required
                      register={register}
                    />
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button disabled={isLoading} secondary onClick={() => setEditOpen(false)}>Cancel</Button>
                        <Button disabled={isLoading} type="submit">Save</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-900 dark:text-gray-100 sm:w-40 sm:flex-shrink-0">
                        Email
                      </dt>
                      <dd className="mt-1 text-sm text-gray-500 dark:text-gray-300 sm:col-span-2">
                        {currentUser?.email}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-900 dark:text-gray-100 sm:w-40 sm:flex-shrink-0">
                        Name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-500 dark:text-gray-300 sm:col-span-2">
                        {currentUser?.name}
                      </dd>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};
export default SettingModal;
