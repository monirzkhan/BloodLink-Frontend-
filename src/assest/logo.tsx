import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href={"/"}>
        <img className="h-16" src="/bloodLink-log.png" alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
