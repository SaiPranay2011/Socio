"use client";

import { useCallback, useEffect, useState } from "react";
import Input from "../reusableComponents/input";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import ThemeSwitch from "../mainComponents/themeSwitcher";
import Button from "../reusableComponents/button";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";
const LoginForm = () => {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if(session?.status == 'authenticated'){
      router.push('/users')
    }
  },[session?.status,router])
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("api/register", data)
        .then(() => signIn('credentials',data))
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false))
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid Credentials");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!");
            router.push("/users")
          }
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }
  };
  return (
    <div className="flex flex-col justify-center items-center flex-grow w-20 h-full ">
      <ThemeSwitch />
      {/* This div will be the main picture or clone. */}
      {/* <div></div> */}
      <div className="">SOCIO</div>
      <div className="mt-8 sm:mx-auto sm-w-full sm:max-w-md">
        <div className="w-72 dark:bg-gray-600 bg-gray-200 px-4 py-8 shadow sm:rounded-lg sm:px-5">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === "REGISTER" && (
              <Input
                id="name"
                label="Name"
                register={register}
                errors={errors}
              />
            )}
            <Input
              id="email"
              label="Email address"
              type="email"
              register={register}
              errors={errors}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              register={register}
              errors={errors}
            />
            <div className="flex justify-center">
              <Button disabled={isLoading} type="submit">
                {variant === "LOGIN" ? "Sign in" : "Register"}
              </Button>
            </div>
          </form>

          <div className="flex justify-center text-sm mt-6 px-2">
            <div className="mx-1">
              {variant == "LOGIN" ? "New to Socio?" : "Already have an account"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant == "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
