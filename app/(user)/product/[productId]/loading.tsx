import { GiTeapot } from "react-icons/gi";

export default function loading() {
  return (
    <div className="absolute left-0 top-0 z-20 flex h-screen w-full items-center justify-center bg-my-beige">
      <GiTeapot size={150} className="text-white" />
    </div>
  );
}
