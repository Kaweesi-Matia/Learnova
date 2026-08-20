export default function Loading({ label = "Loading..." }) {
  return <div className="grid min-h-[240px] place-items-center text-sm text-slate-500"><div className="text-center"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand-600"/><p className="mt-3">{label}</p></div></div>;
}
