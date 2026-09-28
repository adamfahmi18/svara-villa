"use client";

import { useEffect, useState } from "react";

export function PageLoader() {
  const [done, setDone] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setDone(true), 700); return () => window.clearTimeout(timer); }, []);
  return <div className={`page-loader ${done ? "page-loader-done" : ""}`} aria-hidden="true"><span>S</span><i /></div>;
}
