export function Progress({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={className}>
      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-full transition-[width] duration-300"
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}

