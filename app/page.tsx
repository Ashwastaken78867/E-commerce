import { Suspense } from "react";

import HomeClient from "@/components/HomeClient";


export default function Home() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <HomeClient />
    </Suspense>
  );
}
