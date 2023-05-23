import Link from "next/link";
import { TbArrowBackUp } from "react-icons/tb";

export default function StudioNavbar(props: any) {
  return (
    <div>
      <div className="flex items-center justify-between p-5">
        <Link href="/" className="flex items-center text-my-beige">
          <TbArrowBackUp className="mr-2 h-6 w-6 text-my-beige" />
          Powrót na stronę
        </Link>
      </div>

      <>{props.renderDefault(props)}</>
    </div>
  );
}
