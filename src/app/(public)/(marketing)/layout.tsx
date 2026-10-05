import Footer from "@/components/layout/public/Footer";
import FooterPage from "@/components/layout/public/Footer";
import Header from "@/components/layout/public/Header";
import React, { ReactNode } from "react";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
