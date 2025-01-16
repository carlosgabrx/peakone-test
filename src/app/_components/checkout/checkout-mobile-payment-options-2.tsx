import React from "react";
import { GlobeAmericasIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

type Props = {
  firePaypal: () => void;
  loading: string;
};

const CheckoutMobilePaymentOptions2 = ({ firePaypal, loading }: Props) => {
  return (
    <>
      <div className="flex justify-center items-center mt-4 mx-4 w-full">
        <div
          className="flex w-full mb-4 py-4 justify-center border-[1px] border-[#ffc439] bg-[#ffc439] rounded-md px-4 cursor-pointer overflow-hidden space-x-2 hover:bg-[#ffde3a] hover:border-[#ffde3a]"
          onClick={() => {
            if (loading === "") {
              firePaypal();
            }
          }}
        >
          <Image
            src="https://imagedelivery.net/3TTaU3w9z1kOYYtN3czCnw/1397951e-7288-4b95-8ef1-b1f423b56c00/public"
            width={278}
            height={44}
            alt="Paypal"
            className="cursor-pointer w-full max-h-[40px] hover:brightness-110 object-contain"
          />
        </div>
      </div>

    </>
  );
};

export default CheckoutMobilePaymentOptions2;
