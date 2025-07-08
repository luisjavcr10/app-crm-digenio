"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { useSidebarStore } from "@/client/store/sidebarStore";

const questions = [
  "¿Qué tan satisfecho estás con tu trabajo en general?",
  "¿Qué tan probable es que recomiendes esta empresa como un buen lugar para trabajar?",
  "¿Te sientes valorado por tu equipo y tus superiores?",
  "¿Qué tan claras son tus funciones y responsabilidades en tu rol actual?",
  "¿Qué tan satisfecho estás con las herramientas y recursos que tienes para trabajar?",
  "¿Sientes que tienes oportunidades reales de crecimiento profesional en esta empresa?",
  "¿Consideras que el ambiente laboral es saludable y colaborativo?",
  "¿Qué tan de acuerdo estás con la afirmación: 'Mi experiencia laboral en esta empresa es positiva'?",
  "¿Qué tan bien te comunicas con tu equipo de trabajo?"
]

export default function SurveyPage() {
  const isOpenSidebar = useSidebarStore((state)=> state.isOpen);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  // Estado para almacenar las respuestas - inicializado con null para cada pregunta
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const router = useRouter();

  // Función para manejar la selección de respuesta
  const handleAnswerSelect = (questionIndex:number, value:number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  // Función para manejar el envío del formulario
  const handleSumbit = () =>{
    //Necesitamos validar que todos estan marcados
    if(answers.every((answer) => answer !== null)){
      setIsOpen(true);
    }else{
      setError("Por favor, responde todas las preguntas");
    }
  }

  const handleModal = () => {
    console.log('Respuestas:', answers);
    setIsOpen(false);
    router.push("/");
  };

  return (
    <div className={`h-full my-6 mx-8 flex flex-col gap-8 ${isOpenSidebar? 'overflow-auto':''}`}>
      <div className="flex flex-col gap-4">
        <p className="text-[36px] font-[600]">Encuesta de Clima y Satisfacción Laboral</p>

        <p>
          Tu opinión es fundamental para mejorar nuestro entorno de trabajo.
          Esta encuesta es confidencial y solo tomará unos minutos. Recuerda que
          1 representa la calificación más baja y 10 la más alta. Las respuestas
          serán analizadas para identificar oportunidades de mejora en el equipo
          y calcular el índice de satisfacción (NPS). ¡Gracias por tu
          colaboración!
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="flex flex-col gap-6">
            <p className="px-4 py-2 w-full border border-neutral-3 rounded-[12px]">{question}</p>
            <div className="flex justify-around">
              {[1,2,3,4,5,6,7,8,9,10].map((value) => (
                <div 
                  key={value} 
                  onClick={() => handleAnswerSelect(questionIndex, value)}
                  className={`py-2 px-4 rounded-[4px] border border-neutral-3 cursor-pointer transition-colors ${
                    answers[questionIndex] === value 
                      ? 'bg-neutral-1 text-neutral-3' 
                      : 'text-neutral-3 hover:bg-neutral-1'
                  }`}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-center items-center gap-4 my-6">
        <p className="text-alert-red text-[12px]">{error}</p>
        <MainButton text="Enviar respuesta" handleClick={handleSumbit}/>
      </div>

      {isOpen && <div className="fixed inset-0 bg-[#1f1f1f80] flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center">
          <h2 className="text-[16px] text-center mb-4">¡Encuesta respondida con éxito!</h2>
          <MainButton
            text={"Ir al inicio"}
            handleClick={handleModal}
            disabled={false}
          />
        </div>
      </div>}
    </div>
  );
}