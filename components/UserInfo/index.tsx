import Image from "next/image";
import { useState } from "react";

export const UserInfo = () => {
  const [isDropdown, setIsDropdown] = useState(false);

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <section className="min-w-[322px] text-h3-light text-white-200 z-10">
      <section
        className={`absolute top-2 min-w-[322px] ${
          isDropdown ? "bg-gray-800 shadow-lg bg-white" : ""
        } rounded-[10px]`}
      >
        <section
          onClick={handleDropdown}
          className="flex w-full h-[80px] justify-around items-center gap-2"
        >
          <div className="flex items-center gap-3">
            <Image
              src="/icons/account-circle-fill.svg"
              alt="avatar"
              width={50}
              height={50}
              unoptimized
            />
            <span className="hidden lg:block text-h4-normal">Guest</span>
          </div>
          <img
            src={isDropdown ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"}
            alt="arrow"
            className="cursor-pointer hidden lg:block"
          ></img>
        </section>
        <section className={`${isDropdown ? "" : "hidden"}`}>
          <ul className="flex flex-col gap-[15px] ml-[46px] mt-[14px] mb-[37px]">
            <li>Private session</li>
            <li>Account</li>
            <li>Settings</li>
            <li>Log in</li>
          </ul>
        </section>
      </section>
    </section>
  );
};
