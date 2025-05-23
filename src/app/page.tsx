import Image from "next/image";

export default function Home() {
  return (
    <div
      className=" 
        flex flex-col
      "
    >
      <div 
          className="
          h-96 md:min-h-screen 
          relative
        "
      >
        <Image src="/images/main-image.png" fill alt="background" />
      </div>
      <div
        className="
          flex flex-col md:flex-row justify-around items-center
          gap-10
          my-16 lg:my-24 mx-20 lg:mx-60
        "
      >
        <div 
          className="
            flex flex-col items-center justify-center gap-5 
            text-center 
            border border-neutral-3 rounded-[12px]
            py-4 px-6
          "
        >
          <p className="text-[36px] font-[600]">MISIÓN</p>
          <p className="text-[16px]">Impulsar startups de impacto social mediante el desarrollo de soluciones escalables, sostenibles e innovadoras, que respondan a problemáticas reales de comunidades vulnerables y promuevan el bienestar colectivo.</p>
        </div>
        <div 
          className="
            flex flex-col items-center justify-center gap-5 
            text-center 
            border border-neutral-3 rounded-[12px]
            py-4 px-6
          "
        >
          <p className="text-[36px] font-[600]">VISIÓN</p>
          <p className="text-[16px]">Ser líderes en innovación social en Latinoamérica para el año 2030, reconocidos por generar ecosistemas emprendedores resilientes, inclusivos y colaborativos que transformen positivamente la vida de millones de personas.</p>
        </div>
      </div>
    </div>
  );
}
