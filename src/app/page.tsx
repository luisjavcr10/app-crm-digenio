import Image from "next/image";
import { Card } from "@/client/components/private/home/Card";
import { cardsInHome } from "@/client/constants/CardsInHome";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="h-96 md:h-[500px] xl:min-h-screen relative">
        {/* Background image */}
        <Image
          className="z-0 object-cover md:object-cover md:object-center"
          src="/images/main-image.png"
          fill
          alt="background"
        />

        {/* Main text */}
        <div
          className=" hidden md:block
            absolute z-10 top-20 right-16 
            text-end text-[64px] font-playfair font-[700] text-neutral-1"
        >
          <p>
            Estrateg<span className="text-neutral-5">ias</span>{" "}
          </p>
          <p>diseño y</p>
          <p className="text-neutral-5">
            produ<span className="text-neutral-1">cción</span>{" "}
          </p>
          <p className="text-[16px] font-[500] text-start text-neutral-5">
            Con ideas de negocio únicas{" "}
            <span className="text-neutral-1">y</span>
          </p>
          <p className="text-[16px] font-[500] text-start text-neutral-5">
            personas apasionadas por su{" "}
            <span className="text-neutral-1">trabajo</span>
          </p>
        </div>
      </div>

      {/* Main text mobile */}
      <div
        className="
            mt-10
            md:hidden 
            text-center text-[40px] font-playfair font-[700]"
      >
        <p>
          Estrateg<span className="text-primary-1">ias</span>{" "}
        </p>
        <p>diseño y</p>
        <p className="text-primary-1">
          produ<span className="">cción</span>{" "}
        </p>
        <p className="mt-5 text-[16px] font-[500]">
          Con ideas de negocio únicas <span className="text-primary-1">y</span>
        </p>
        <p className="text-[16px] font-[500]">
          personas apasionadas por su{" "}
          <span className="text-primary-1">trabajo</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-around items-center gap-10 my-16 lg:my-24 mx-10 md:mx-20 lg:mx-60">
        {cardsInHome.map((card,index)=>
        <Card title={card.title} description={card.description} key={index}
        />)}
      </div>
    </div>
  );
}
