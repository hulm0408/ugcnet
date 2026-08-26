export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-stone-200 border-t-emerald-800 rounded-full animate-spin" />
        <p className="text-sm text-stone-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}
