// src/Components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-4">
      <p className="mb-0">
        © {new Date().getFullYear()} Animesh Market. All Rights Reserved.
      </p>
      <small>
        <a href="/" className="text-white-50 mx-2">Home</a> |
        <a href="/dashboard" className="text-white-50 mx-2">Dashboard</a> |
        <a href="/cart" className="text-white-50 mx-2">Cart</a>
      </small>
    </footer>
  );
};

export default Footer;
