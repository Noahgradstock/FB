import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-1000 text-white text-center py-4 mt-8">
      <p className="text-sm">&copy; {new Date().getFullYear()} Företagsnamn. Alla rättigheter förbehållna.</p>
    </footer>
  );
};

export default Footer;