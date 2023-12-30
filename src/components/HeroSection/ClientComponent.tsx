"use client";

import { FC } from "react";
import CountUpNumber from "../CountUpNumber/CountUpNumber";
type Props = {
  heading1: React.ReactNode;
  section2: React.ReactNode;
};
const ClientComponent: FC<Props> = (props) => {
  const { heading1, section2 } = props;
  return (
    <section className="container mx-auto flex items-center gap-12 px-4">
      <div className="h-full py-10">
        {heading1}
        <div className="mt-12 flex justify-between">
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-center text-xs lg:text-xl">Basic Room</p>
            <CountUpNumber duration={5000} endValue={50} />
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-center text-xs lg:text-xl">Luxury Room</p>
            <CountUpNumber duration={5000} endValue={120} />
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-center text-xs lg:text-xl">Suite</p>
            <CountUpNumber duration={5000} endValue={60} />
          </div>
        </div>
      </div>
      {section2}
    </section>
  );
};

export default ClientComponent;
