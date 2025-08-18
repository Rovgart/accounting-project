// TestComponent.tsx
"use client";
import { useEffect } from "react";

export default function TestComponent() {
  useEffect(() => {
    console.log("✅ useEffect działa w TestComponent");
  }, []);

  return <div>Test</div>;
}
