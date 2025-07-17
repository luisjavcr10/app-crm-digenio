export const SwitchEntity = ({
  entity,
  click1,
  click2,
  isModal
}:{
  entity:"users" | "teams",
  click1:()=>void,
  click2:()=>void,
  isModal?: boolean
}) => {
  return (
    <div className={`${isModal? 'px-6 py-4':''} flex gap-4 text-[12px]`}>
      <div
        onClick={click1}
        className={`cursor-pointer px-3 py-1 rounded-[6px] ${entity === "users" ? "bg-neutral-4 dark:bg-neutral-2 border border-neutral-3 dark:border-neutral-4" : "border border-neutral-3 dark:border-neutral-2"}`}
      >
        Usuarios
      </div>

      <div
        onClick={click2}
        className={`cursor-pointer px-3 py-1 rounded-[6px] ${entity === "teams" ? "bg-neutral-4 dark:bg-neutral-2 border border-neutral-3 dark:border-neutral-4" : "border border-neutral-3 dark:border-neutral-2"}`}
      >
        Equipos
      </div>
    </div>
  );
};
