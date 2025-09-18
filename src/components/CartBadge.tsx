import { useEffect, useState } from "react";
import { getCount } from "../store/cart";

export default function CartBadge() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const update = () => setCount(getCount());
    update();
    window.addEventListener("cart:update", update);
    return () => window.removeEventListener("cart:update", update);
  }, []);
  if (!count) return null;
  return (
    <span className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-red-600 text-white">
      {count}
    </span>
  );
}
