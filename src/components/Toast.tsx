import { useEffect, useState } from "react";

export default function Toast() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    const onOk = (e: Event) => {
      const d = (e as CustomEvent).detail as string | undefined;
      setMsg(d || "Ajouté au panier");
    };
    const clear = () => setMsg(null);
    window.addEventListener("toast:ok", onOk);
    let t: any;
    if (msg) t = setTimeout(clear, 1500);
    return () => {
      window.removeEventListener("toast:ok", onOk);
      if (t) clearTimeout(t);
    };
  }, [msg]);
  if (!msg) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-black/80 text-white px-4 py-2 rounded-lg shadow">
      {msg}
    </div>
  );
}
