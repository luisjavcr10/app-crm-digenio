import { TitleSection } from "@/client/components/shared/TitleSection";
import { NoData } from "@/client/components/shared/NoData";

export default function FollowUp() {
  return (
    <div className="h-full my-6 mx-8 flex flex-col gap-8">
      <TitleSection
        name="SEGUIMIENTO"
        description="Seguimiento visual de objetivos estratégicos en conjunto con las startups participantes."
      />
      <NoData />
    </div>
  );
}