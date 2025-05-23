import Image from "next/image";

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
            text-center text-[40px] font-playfair font-[700] text-neutral-1"
      >
        <p>
          Estrateg<span className="text-alert-red">ias</span>{" "}
        </p>
        <p>diseño y</p>
        <p className="text-alert-red">
          produ<span className="text-neutral-1">cción</span>{" "}
        </p>
        <p className="mt-5 text-[16px] font-[500] text-neutral-1">
          Con ideas de negocio únicas <span className="text-alert-red">y</span>
        </p>
        <p className="text-[16px] font-[500] text-neutral-1">
          personas apasionadas por su{" "}
          <span className="text-alert-red">trabajo</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-around items-center gap-10 my-16 lg:my-24 mx-10 md:mx-20 lg:mx-60">
        <div className="flex flex-col items-center justify-center gap-5 text-center border border-neutral-3 rounded-[12px] py-4 px-6">
          <p className="text-[36px] font-[600]">MISIÓN</p>
          <p className="text-[16px]">
            Impulsar startups de impacto social mediante el desarrollo de
            soluciones escalables, sostenibles e innovadoras, que respondan a
            problemáticas reales de comunidades vulnerables y promuevan el
            bienestar colectivo.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 text-center border border-neutral-3 rounded-[12px] py-4 px-6">
          <p className="text-[36px] font-[600]">VISIÓN</p>
          <p className="text-[16px]">
            Ser líderes en innovación social en Latinoamérica para el año 2030,
            reconocidos por generar ecosistemas emprendedores resilientes,
            inclusivos y colaborativos que transformen positivamente la vida de
            millones de personas.
          </p>
        </div>
      </div>
    </div>
  );
}
