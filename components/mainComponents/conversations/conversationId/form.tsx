"use client";

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./messageInput";
import { CldUploadButton } from "next-cloudinary";
const ConversationForm = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });

    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result.info.secure_url,
      conversationId: conversationId
    })
  }
  return (
    <div className="py-4 px-4 fixed bottom-0 z-10 bg-white dark:bg-gray-800  border-none flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton options={{maxFiles:1}} onUpload={handleUpload} uploadPreset="socioweb">
      <HiPhoto size={30} className="cursor-pointe"/>
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center lg:gap-2 w-full "
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="rounded-full p-2 dark:bg-gray-600 bg-gray-200 cursor-pointer dark:hover:bg-gray-500 hover:bg-gray-300 transition"
        >
          <HiPaperAirplane size={18} className="dark:text-white text-black"/>
        </button>
      </form>
    </div>
  );
};

export default ConversationForm;
