type Props = {
  status: "online" | "offline";
};

function CustomerStatusBadge({ status }: Props) {
  const statusColor =
    status === "offline"
      ? "bg-[var(--color-warning)]"
      : "bg-[var(--color-success)]";

  return (
    <div className="flex justify-center items-center gap-1 rounded-md shadow-sm shadow-black px-1.5 py-2.5">
      <div className={`size-4 rounded-full ${statusColor}`}></div>
      <span className="text-xs">{status.toLocaleUpperCase()}</span>
    </div>
  );
}

export default CustomerStatusBadge;
