import { toast } from "@/components/ui/toast";
import { useGoogleLogin } from "@/hooks/google.auth.hook";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import React from "react";

const GoogleLoginComponent = () => {
  const { mutate: googleLogin } = useGoogleLogin();
  const router = useRouter();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.add({
        title: "Google OAuth Failed",
        description: "Something went wrong. Please try again",
        type: "error",
      });
      return;
    }
    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Logged in Successfully",
            description: "Welcome back",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Google OAuth Failed",
            description:
              err.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google Login Failed",
      description: "Something Went Wrong, Please try again",
      type: "error",
    });
  };
  return (
    <GoogleLogin
      theme="filled_black"
      shape="circle"
      text="continue_with"
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
    />
  );
};

export default GoogleLoginComponent;
