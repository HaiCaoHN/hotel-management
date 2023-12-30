import Link from "next/link";
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="container mx-auto px-4">
        <Link href="" className="text-tertiary-light font-black">
          HotelZZ
        </Link>
        <h4 className="py-6 text-[40px] font-semibold">Contact</h4>
        <div className="flex flex-wrap items-center justify-between gap-16">
          <div className="flex-1">
            <p>123Road </p>
            <div className="flex items-center py-4">
              <BsFillSendFill />
              <p className="ml-2">hotel-manager</p>
            </div>
            <div className="flex items-center">
              <BsTelephoneOutbound />
              <p className="ml-2">000-000-000</p>
            </div>
            <div className="flex items-center py-4">
              <BiMessageDetail />
              <p className="ml-2">hotel-manager</p>
            </div>
          </div>
          <div className="flex-1 md:text-right">
            <p className="pb-4">Our Story</p>
            <p className="pb-4">Get in touch</p>
            <p className="pb-4">Our Privacy Commitment</p>
            <p className="pb-4">Terms of service</p>
            <p>Customer Assistance</p>
          </div>
          <div className="flex-1 md:text-right">
            <p className="pb-4">DIning Experience</p>
            <p className="pb-4">Wellness</p>
            <p className="pb-4">Fitness</p>
            <p className="pb-4">Sport</p>
            <p>Events</p>
          </div>
        </div>
      </div>
      <div className="bg-tertiary-light bottom-0 left-0 mt-16 h-10 w-full md:h-[70px]"></div>
    </footer>
  );
};

export default Footer;
