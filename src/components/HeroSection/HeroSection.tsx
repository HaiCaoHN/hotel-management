import Image from "next/image";
import ClientComponent from "./ClientComponent";
import { heading1, section2 } from "./SeverComponent";

function HeroSection() {
  return <ClientComponent section2={section2} heading1={heading1} />;
}

export default HeroSection;
