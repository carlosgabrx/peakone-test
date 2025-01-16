import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "@/app/_context/SessionContext";
import { CheckoutPageType } from "@/interfaces/checkoutPage";
import { ProductInfoType } from "@/interfaces/productInfo";
import { delay } from "@/app/_utils/delay";
import { PriceDisplaySimple } from "./checkout-price-display";

type QuantityProps = {
  product: ProductInfoType;
  info: CheckoutPageType;
  setProduct: (product: ProductInfoType) => void;
  couponActive: boolean;
  country: string;
};

// Select the number of products to purchase
const QuantitySelector2 = ({
  product,
  info,
  setProduct,
  couponActive,
  country,
}: QuantityProps) => {
  const [checkedIndex, setCheckedIndex] = useState<number | null>(null);

  const handleProductClick = (
    productNum: number,
    productPrice: number,
    productShipping: number,
    productShippingId: number,
    productOfferId: number,
    productStickyId: number
  ) => {
    setCheckedIndex(productNum);

    setProduct({
      product: productNum,
      productName: `${productNum + 1}x ${info.product.name}`,
      productPrice: productPrice.toString(),
      productShipping: productShipping.toString(),
      productShippingId: productShippingId.toString(),
      productOfferId: productOfferId.toString(),
      productStickyId: productStickyId.toString(),
    });
  };

  const [price1, setPrice1] = useState(Number(info.product.price1));
  const [price2, setPrice2] = useState(Number(info.product.price2));
  const [price3, setPrice3] = useState(Number(info.product.price3));
  const [price4, setPrice4] = useState(Number(info.product.price4));

  const [showCouponFlag, setShowCouponFlag] = useState(false);

  useEffect(() => {
    function scrollIfNotVisible(elementId: string) {
      const element = document.getElementById(elementId);

      if (!element) return; // Exit if the element is not found

      const rect = element.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Check if the element is completely within the viewport
      const isCompletelyVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= viewportHeight &&
        rect.right <=
        (window.innerWidth || document.documentElement.clientWidth);

      // If not fully visible, scroll into view
      if (!isCompletelyVisible) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center", // Adjust this if you want it to align differently
        });
      }
    }

    const changePriceDrama = async () => {
      scrollIfNotVisible("quantity-selector");
      document.getElementById("price1")!.style.background = "#5acd65";
      await delay(200);
      setPrice1(price1 - parseFloat(info.product.couponValue));
      document.getElementById("price1")!.style.background = "none";
      document.getElementById("price2")!.style.background = "#5acd65";
      await delay(200);
      setPrice2(price2 - parseFloat(info.product.couponValue));
      document.getElementById("price2")!.style.background = "none";
      document.getElementById("price3")!.style.background = "#5acd65";
      await delay(200);
      setPrice3(price3 - parseFloat(info.product.couponValue));
      document.getElementById("price3")!.style.background = "none";
      document.getElementById("price4")!.style.background = "#5acd65";
      await delay(200);
      setPrice4(price4 - parseFloat(info.product.couponValue));
      document.getElementById("price4")!.style.background = "none";
      setShowCouponFlag(true);
    };
    if (couponActive) {
      changePriceDrama();
    }
  }, [couponActive]);

  return (
    <><div className="p-4">
      <div
        className="flex w-full justify-between items-center"
      >
        <div className="flex items-center w-full">
          <Image
            src="https://www.oriclehearing.com/hear/app/desktop/images-chk-v3/frm-hdr-icn1.png"
            width={50}
            height={40}
            alt=""
          />
          <div className="ml-2 flex flex-col mb-4">
            <h3 className="font-bold text-[26px]">Select Quantity</h3>
            <h3 className="text-[14px]">
              How many hearing {info.product.name} do you want?
            </h3>
          </div>

        </div>

        {/* <div className="flex w-1/3 justify-end">
          <div
            className={`${
              showCouponFlag
                ? "bg-[#ffe300] text-blue-500 border-blue-500"
                : "invisible"
            } px-2 md:px-4 py-2 text-center font-bold uppercase text-[10px] md:text-[14px] border-[3px] rounded-md flex items-center justify-center whitespace-nowrap`}
          >
            $5 OFF Winner!
          </div>
        </div> */}
      </div >
      <div className="flex w-full rounded-lg bg-[#ffe7e7] p-4 mb-4">
        <Image
          src="https://www.oriclehearing.com/hear/app/desktop/images-chk-v3/fire-img.png"
          alt="fire icon"
          width={13}
          height={10}
          className="w-[13px] h-[18px]" />
        <span className="ml-2 font-bold text-[#e32d2d]">High Demand:</span>
        <span className="ml-1 font-medium">49 people are looking this offer!</span>
      </div>
      <div className="flex w-full flex-col space-y-2">
        <div
          className={` relative flex w-full justify-center border-[2px] border-[#c2c2c2] rounded-md cursor-pointer hover:shadow-sm  hover:shadow-blue-500 transition-all ${checkedIndex === 0 && "bg-yellow-100 border-blue-500 border-[3px]"
            }`}
          onClick={() =>
            handleProductClick(
              0,
              Number(info.product.price1),
              Number(info.product.ship1),
              Number(info.product.shippingId1),
              Number(info.product.offerId1),
              Number(info.product.stickyId1)
            )
          }
        >
          <input
            type="checkbox"
            className="absolute left-[0px] ml-2 mt-2 w-6 h-6 cursor-pointer accent-black"
            checked={checkedIndex === 0}
            readOnly
          />

          <span className="absolute left-[0px] ml-10 mt-2 text-[17px] font-bold text-black">
            Buy 1 Pack
          </span>
          <div className="flex w-1/3 sm:w-auto justify-start items-center">
            <Image
              src={info.product.image1}
              width={120}
              height={120}
              alt="Quantity 1"
              className="h-auto"
            />

            <div className="absolute -left-[20px] -top-[20px] relative">
              <Image
                src="https://www.oriclehearing.com/hear/app/desktop/images-chk-v3/save-seal.png"
                width={70}
                height={70}
                className="object-scale-down max-w-[70px] h-auto"
                alt="50% Discount Badge"
              />
              <span className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold">
                <span className="text-sm">50%</span>
                <span className="text-xs">OFF</span>
              </span>
            </div>
          </div>
          <div className="flex w-2/3 sm:w-1/2 flex-col justify-start items-end mr-4 text-[#282828] text-center">
            <div className="flex flex-col justify-end py-10 items-end w-ful space-x-2 sm:space-x-0">
              <p className="text-[16px] text-black line-through decoration-red-500">
                {/* {info.product.ogPrice3} */}
                <PriceDisplaySimple
                  priceUSD={parseFloat(info.product.ogPrice1)}
                  countryCode={country}
                  digits={0}
                />
              </p>

              <p className="text-[24px] text-black font-bold" id="price1">
                {/* ${price3.toFixed(2)} */}
                <PriceDisplaySimple
                  priceUSD={price1}
                  countryCode={country}
                  digits={2}
                />
              </p>
              <p className="text-[15px] text-[#5acd65] font-bold">50% Discount</p>

            </div>
          </div>
        </div>
        <div
          className={` relative flex w-full justify-center border-[2px] border-[#c2c2c2] !mt-8 rounded-md cursor-pointer hover:shadow-sm  hover:shadow-blue-500 transition-all ${checkedIndex === 1 && "bg-yellow-100 border-blue-500 border-[3px]"
            }`}
          onClick={() =>
            handleProductClick(
              1,
              Number(info.product.price2),
              Number(info.product.ship2),
              Number(info.product.shippingId2),
              Number(info.product.offerId2),
              Number(info.product.stickyId2)
            )
          }
        >
          <div className="relative">
            <div className="absolute -top-[27px] left-[10px] bg-blue-500 text-white text-[12px] font-bold px-3 py-1 rounded-t-md">
              BESTSELLER
            </div>
          </div>
          <input
            type="checkbox"
            className="absolute left-[0px] ml-2 mt-2 w-6 h-6 cursor-pointer accent-black"
            checked={checkedIndex === 1}
            readOnly
          />

          <span className="absolute left-[0px] ml-10 mt-2 text-[17px] font-bold text-black">
            Buy 2 Packets
          </span>
          <div className="flex w-1/3 sm:w-auto justify-start items-center">
            <Image
              src={info.product.image2}
              width={120}
              height={120}
              alt="Quantity 1"
              className="h-auto"
            />

            <div className="absolute -left-[20px] -top-[20px] relative">
              <Image
                src="https://www.oriclehearing.com/hear/app/desktop/images-chk-v3/save-seal.png"
                width={70}
                height={70}
                className="object-scale-down max-w-[70px] h-auto"
                alt="56% Discount Badge"
              />
              <span className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold">
                <span className="text-sm">56%</span>
                <span className="text-xs">OFF</span>
              </span>
            </div>
          </div>
          <div className="flex w-2/3 sm:w-1/2 flex-col justify-start items-end mr-4 text-[#282828] text-center">
            <div className="flex flex-col justify-end py-10 items-end w-ful space-x-2 sm:space-x-0">
              <p className="text-[16px] text-black line-through decoration-red-500">
                {/* {info.product.ogPrice3} */}
                <PriceDisplaySimple
                  priceUSD={parseFloat(info.product.ogPrice2)}
                  countryCode={country}
                  digits={0}
                />
              </p>

              <p className="text-[24px] text-black font-bold" id="price2">
                {/* ${price3.toFixed(2)} */}
                <PriceDisplaySimple
                  priceUSD={price2}
                  countryCode={country}
                  digits={2}
                />
              </p>
              <p className="text-[15px] text-[#5acd65] font-bold">56% Discount</p>

            </div>
          </div>
        </div>
        <div
          className={` relative flex w-full justify-center border-[2px] border-[#c2c2c2] rounded-md cursor-pointer hover:shadow-sm  hover:shadow-blue-500 transition-all ${checkedIndex === 2 && "bg-yellow-100 border-blue-500 border-[3px]"
            }`}
          onClick={() =>
            handleProductClick(
              2,
              Number(info.product.price3),
              Number(info.product.ship3),
              Number(info.product.shippingId3),
              Number(info.product.offerId3),
              Number(info.product.stickyId3)
            )
          }
        >
          <input
            type="checkbox"
            className="absolute left-[0px] ml-2 mt-2 w-6 h-6 cursor-pointer accent-black"
            checked={checkedIndex === 2}
            readOnly
          />

          <span className="absolute left-[0px] ml-10 mt-2 text-[17px] font-bold text-black">
            Buy 3 Packets
          </span>
          <div className="flex w-1/3 sm:w-auto justify-start items-center">
            <Image
              src={info.product.image3}
              width={120}
              height={120}
              alt="Quantity 1"
              className="h-auto"
            />

            <div className="absolute -left-[20px] -top-[20px] relative">
              <Image
                src="https://www.oriclehearing.com/hear/app/desktop/images-chk-v3/save-seal.png"
                width={70}
                height={70}
                className="object-scale-down max-w-[70px] h-auto"
                alt="58% Discount Badge"
              />
              <span className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold">
                <span className="text-sm">58%</span>
                <span className="text-xs">OFF</span>
              </span>
            </div>
          </div>
          <div className="flex w-2/3 sm:w-1/2 flex-col justify-start items-end mr-4 text-[#282828] text-center">
            <div className="flex flex-col justify-end py-10 items-end w-ful space-x-2 sm:space-x-0">
              <p className="text-[16px] text-black line-through decoration-red-500">
                {/* {info.product.ogPrice3} */}
                <PriceDisplaySimple
                  priceUSD={parseFloat(info.product.ogPrice3)}
                  countryCode={country}
                  digits={0}
                />
              </p>

              <p className="text-[24px] text-black font-bold" id="price3">
                {/* ${price3.toFixed(2)} */}
                <PriceDisplaySimple
                  priceUSD={price3}
                  countryCode={country}
                  digits={2}
                />
              </p>
              <p className="text-[15px] text-[#5acd65] font-bold">58% Discount</p>

            </div>
          </div>
        </div>
        <div
          className={` relative flex w-full justify-center border-[2px] border-[#c2c2c2] rounded-md cursor-pointer hover:shadow-sm  hover:shadow-blue-500 transition-all ${checkedIndex === 3 && "bg-yellow-100 border-blue-500 border-[3px]"
            }`}
          onClick={() =>
            handleProductClick(
              3,
              Number(info.product.price4),
              Number(info.product.ship4),
              Number(info.product.shippingId4),
              Number(info.product.offerId4),
              Number(info.product.stickyId4)
            )
          }
        >
          <input
            type="checkbox"
            className="absolute left-[0px] ml-2 mt-2 w-6 h-6 cursor-pointer accent-black"
            checked={checkedIndex === 3}
            readOnly
          />

          <span className="absolute left-[0px] ml-10 mt-2 text-[17px] font-bold text-black">
            Buy 4 Packets
          </span>
          <div className="flex w-1/3 sm:w-auto justify-start items-center">
            <Image
              src={info.product.image4}
              width={120}
              height={120}
              alt="Quantity 1"
              className="h-auto"
            />

            <div className="absolute -left-[20px] -top-[20px] relative">
              <Image
                src="https://www.oriclehearing.com/hear/app/desktop/images-chk-v3/save-seal.png"
                width={70}
                height={70}
                className="object-scale-down max-w-[70px] h-auto"
                alt="58% Discount Badge"
              />
              <span className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold">
                <span className="text-sm">60%</span>
                <span className="text-xs">OFF</span>
              </span>
            </div>
          </div>
          <div className="flex w-2/3 sm:w-1/2 flex-col justify-start items-end mr-4 text-[#282828] text-center">
            <div className="flex flex-col justify-end py-10 items-end w-ful space-x-2 sm:space-x-0">
              <p className="text-[16px] text-black line-through decoration-red-500">
                {/* {info.product.ogPrice3} */}
                <PriceDisplaySimple
                  priceUSD={parseFloat(info.product.ogPrice4)}
                  countryCode={country}
                  digits={0}
                />
              </p>

              <p className="text-[24px] text-black font-bold" id="price4">
                {/* ${price3.toFixed(2)} */}
                <PriceDisplaySimple
                  priceUSD={price4}
                  countryCode={country}
                  digits={2}
                />
              </p>
              <p className="text-[15px] text-[#5acd65] font-bold">60% Discount</p>

            </div>
          </div>
        </div>
      </div >
    </div>
    </>

  );
};

export default QuantitySelector2;
