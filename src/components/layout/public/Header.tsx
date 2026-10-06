"use client";

import Logo from "@/assest/logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const Header = () => {
  const routes = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about-us" },
    { name: "Contact", path: "/contact" },
  ];
  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          type: "success",
          title: "Good Bye",
          description: "Logout Successful",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: (err) => {
        toast.add({
          type: "error",
          title: "Login Failed",
          description: "Something Went Wrong",
        });
      },
    });
  };
  return (
    <header className="bg-white shadow-md py-4 px-6 ">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto ">
        <div>
          <Logo />
        </div>
        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.path} href={route.path}>
              {route.name}
            </Link>
          ))}
        </nav>
        <div>
          {!data && !isLoading && (
            <Button
              variant="default"
              render={<Link href="/login">Login</Link>}
              nativeButton={false}
            >
              Login
            </Button>
          )}
          {data && !isLoading && (
            <Button variant="default" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
