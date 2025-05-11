const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "DASHBOARD",
        href: "/dashboard",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/exam.png",
        label: "QTRACK",
        href: "/q/track",
        visible: ["admin", "teacher", "student", "parent"],
      },
      
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Menu = () => {
  return (
    <div className=" -mt-4 text-sm">
      {menuItems?.map((i) => (
        <div key={i?.title} className="flex flex-col gap-2">
          <span className=" hidden lg:block text-gray-400 font-light my-4">
            {i?.title}
          </span>
          {i?.items?.map((item) => {
            return (
              <Link
                key={item?.label}
                href={item?.href}
                className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 px-2 rounded-md hover:bg-ejSkyLight"
              >
                <Image
                  src={`/assets/images${item?.icon}`}
                  alt=""
                  width={20}
                  height={20}
                />
                <span className="hidden lg:block">{item?.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
