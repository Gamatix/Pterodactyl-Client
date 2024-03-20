import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="text-slate-500 flex flex-col justify-center items-center mt-2 mb-3 ">
      <div>© How2MC 2024 all rights reserved.</div>
      <div>Made with 💖 by How2MC_</div>
      <div>
        <Link className="hover:text-black">Terms Of Service</Link>
        <span> | </span>
        <Link className="hover:text-black">Privacy Policy</Link>
      </div>
    </div>
  );
}

export default Footer;
