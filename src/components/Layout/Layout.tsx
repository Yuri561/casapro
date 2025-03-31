import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface LayoutProps {
    children: React.ReactNode;
  }
  const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
      <>
        <Header/>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
