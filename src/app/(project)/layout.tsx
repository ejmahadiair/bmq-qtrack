import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type propstype = {
    children?: React.ReactNode;
}
const PanelLayout: React.FC<propstype> = (props) => {
  return (
    <>
    <div className="h-screen flex">
        {/* LEFT */}
        <div className=" w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] overflow-hidden">
          <Link
            href="/"
            className=" flex items-center justify-center lg:justify-start gap-2 w-full p-4 "
          >
            <Image
              src="/assets/images/bmw.png" 
              alt="logo"
              width={32}
              height={32}
            />
            <span className=" text-sm block max-lg:hidden font-bold">BMW QTRACK</span>
          </Link>

          <div className=" h-[89%] 2xl:h-[91%] overflow-y-auto p-4 ">
            <Menu />
          </div>
        </div>
        {/* RIGHT */}
        <div className=" w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-auto flex flex-col ">
          <div className=" bg-white">
            <Navbar />
          </div>
          <div className=" overflow-y-auto p-[0.6rem]">{props?.children}</div>
        </div>
      </div>
    </>
  )
}

export default PanelLayout