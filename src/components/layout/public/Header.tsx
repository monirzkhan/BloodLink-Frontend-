import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Header = () => {
  const routes = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about-us" },
    { name: "Login", path: "/login" },
  ];
  return (
    <header className="bg-white shadow-md py-4 px-6 ">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto ">
        <div>BloodLink</div>
        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.path} href={route.path}>
              {route.name}
            </Link>
          ))}
        </nav>
        <div>
          <Button
            variant="default"
            render={<Link href="/login">Login</Link>}
            nativeButton={false}
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
