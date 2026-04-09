"use client";

import { useState, useEffect } from "react";
import NavbarNoAcc from "./NavbarNoAcc";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const [hasAccount, setHasAccount] = useState(false);

  const checkAuth = () => {
    const user = localStorage.getItem("user_token");
    setHasAccount(!!user);
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);

  return <>{hasAccount ? <Navbar /> : <NavbarNoAcc />}</>;
}

// "use client";

// import { useSelector } from "react-redux";
// import NavbarHaveAcc from "./NavbarHaveAcc";
// import NavbarNoAcc from "./NavbarNoAcc";
// import { RootState } from "@/redux/store"; // Adjust path to your store type

// export default function NavbarWrapper() {
//   // Select your token from Redux
//   const token = useSelector((state: RootState) => state.auth.token);

//   return (
//     <header className="sticky top-0 z-50">
//       {token ? <NavbarHaveAcc /> : <NavbarNoAcc />}
//     </header>
//   );
// }