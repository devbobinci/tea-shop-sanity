import "@/app/globals.css";

import Image from "next/image";

export default function Logo(props: any) {
  const { renderDefault, title } = props;

  return (
    <div className="flex items-center space-x-2">
      <Image
        src="/images/studio/logo-white.png"
        alt="logo"
        width={50}
        height={50}
        className="rounded-full"
      />
      {/* To zwraca nazwe strony obok logo */}
      {renderDefault && <>{renderDefault(props)}</>}
    </div>
  );
}
