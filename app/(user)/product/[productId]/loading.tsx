import { GiTeapot } from "react-icons/gi";
import { ClipLoader } from "react-spinners";

export default function loading() {
  return (
    <div className="absolute left-0 top-0 z-20 flex h-screen w-full flex-col items-center justify-center bg-my-beige">
      <GiTeapot size={150} className="text-white" />
      <ClipLoader color="white" size={30} />
    </div>
  );
}
