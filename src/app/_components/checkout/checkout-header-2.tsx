import React from "react";
import { CheckoutPageType } from "@/interfaces/checkoutPage";
import Image from "next/image";
import { siteProduct } from "@/lib/site-info";

type Props = {
  info: CheckoutPageType;
};
const CheckoutHeader2 = ({ info }: Props) => {
  return (
    <div className="flex w-full relative flex-col items-center">

      <div className="flex w-full justify-center bg-white shadow-sm z-10">
        <div className="flex w-full max-w-[1100px] justify-between items-center px-4 text-[12px] sm:text-[16px]">
          <div className="flex w-1/2 lg:w-1/3 p-2 sm:p-4 justify-center items-center font-bold text-white">
            <Image
              src={info.header.logo}
              alt="Logo"
              width={140}
              height={40}
              className="max-w-[140px] sm:max-w-none mr-4"
            />

          </div>
          <div className="flex w-1/2 lg:w-1/3 justify-center items-center font-bold text-white">
            <Image
              src="https://www.oriclehearing.com/hear/app/desktop/images-chk-v3/quaranty-seal.png"
              alt="Quaranty Seal"
              width={200}
              height={40}
              className="max-w-[200px] sm:max-w-none mr-4"
            />

          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader2;
