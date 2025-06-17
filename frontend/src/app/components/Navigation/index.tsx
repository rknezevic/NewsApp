"use client";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Navbar toggle={toggle} />
    </>
  );
};

export default Navigation;