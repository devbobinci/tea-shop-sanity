import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="animate-pulse text-center">
      <ClipLoader size={50} />
    </div>
  );
}
