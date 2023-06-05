import { AiOutlineShoppingCart } from "react-icons/ai";
import { ClipLoader } from "react-spinners";

export default function loading() {
  return (
    <div className="absolute left-0 top-0 z-20 flex h-screen w-full flex-col items-center justify-center bg-gradient-to-tr from-[#C7E9B0] to-[#9DC08B]">
      <AiOutlineShoppingCart size={150} className="text-white" />
      <ClipLoader color="white" size={30} />
    </div>
  );
}
