import Image from "next/image";
import { BsChevronRight } from "react-icons/bs";

export default function MainProduct() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 md:flex-row md:justify-between items-center my-16 px-4 md:px-6 xl:p-0 mx-auto max-w-7xl">
      <div className="md:w-1/2">
        <Image
          src="/images/zestaw.png"
          alt="Zestaw Yerba Mate"
          width={300}
          height={400}
          className="w-full xl:w-5/6"
        />
      </div>

      <div className="md:w-1/2 flex flex-col items-center md:block">
        <h2 className="text-2xl font-playFair font-bold md:text-3xl lg:text-3xl">
          100% organic Yerba Mate
        </h2>
        <div className="space-y-4 my-4 text-center md:text-left">
          <p className="text-my-m-gray">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            natus.
          </p>
          <p className="text-my-m-gray">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
            obcaecati esse voluptates nulla pariatur eligendi minus reiciendis
            neque blanditiis consequatur.
          </p>
        </div>

        <h4 className="uppercase text-lg pb-2 text-my-beige font-semibold">
          Tea benefits
        </h4>
        <ul className="space-y-1">
          <li className="text-my-m-gray text-sm lg:text-base flex items-center">
            <span className="bg-my-beige inline-block h-[2px] w-[10px] mr-2"></span>
            Obniża ciśnienie krwi
          </li>
          <li className="text-my-m-gray text-sm lg:text-base flex items-center">
            <span className="bg-my-beige inline-block h-[2px] w-[10px] mr-2"></span>
            Poprawia trawienie
          </li>
          <li className="text-my-m-gray text-sm lg:text-base flex items-center">
            <span className="bg-my-beige inline-block h-[2px] w-[10px] mr-2"></span>
            Chroni zęby przed próchnicą
          </li>
          <li className="text-my-m-gray text-sm lg:text-base flex items-center">
            <span className="bg-my-beige inline-block h-[2px] w-[10px] mr-2"></span>
            Ułatwia zapamiętywanie i uczenie się
          </li>
        </ul>

        <button className="font-semibold my-6 bg-my-yellow px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base rounded-md flex items-center gap-2 group">
          Kup Teraz <BsChevronRight />
        </button>
      </div>
    </div>
  );
}
