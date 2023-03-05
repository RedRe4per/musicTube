import Image from "next/image";
import { useState } from "react";

export const UserInfo = () => {
  const [isDropdown, setIsDropdown] = useState(false);

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <div className="min-w-[322px] text-h3-light text-white-200">
      <section
        className={`absolute top-0 min-w-[322px] ${
          isDropdown ? "bg-gray-800 shadow-lg bg-white" : ""
        } rounded-[10px]`}
      >
        <div className="flex w-full h-[80px] justify-around items-center gap-2">
          <Image
            src="/person-avator.png"
            alt="avatar"
            width={50}
            height={50}
          ></Image>
          <span>Matheus</span>
          <Image
            src={isDropdown ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"}
            alt="arrow"
            width={28}
            height={28}
            onClick={handleDropdown}
            className="cursor-pointer"
          ></Image>
        </div>
        <div className={`${isDropdown ? "" : "hidden"}`}>
          <ul className="flex flex-col gap-[15px] ml-[46px] mt-[14px] mb-[37px]">
            <li>Private session</li>
            <li>Account</li>
            <li>Settings</li>
            <li>Log out</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
