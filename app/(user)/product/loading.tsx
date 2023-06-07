import { GiTeapot } from "@react-icons/all-files/gi/GiTeapot";
import { ClipLoader } from "react-spinners";

export default function loading() {
  return (
    <div className="absolute left-0 top-0 z-20 flex h-screen w-full flex-col items-center justify-center bg-gradient-to-tr from-[#F7D060] to-my-yellow">
      <GiTeapot size={150} className="text-white" />
      <ClipLoader color="white" size={30} />
    </div>
  );
}
