"use client";

import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../dictionaries";


/*
async function Index({ params }: any) {
  const { title, description } = await getDictionary(params.lang); // en

  return (
    <>
      <Header />
      <main className="mt-5 ml-5 w-[100%]">
        <div className="w-[60%] mx-auto text-center mt-20">
          <h1 className=" text-2xl">{title}</h1>
          <p className=" text-base mt-10">{description}</p>
        </div>
      </main>
    </>
  );
}

export default Index;
*/


import { useEffect, useState } from "react";

export default function Index({ params }: any) {
    
    const [data, setData] = useState({ title: "", description: "" });

    useEffect(() => {
        async function fetchData() {
            const dictionary = await getDictionary(params.lang);
            setData(dictionary);
        }
        fetchData();
    }, [params.lang]);

    const { title, description } = data;

    return (
    <>
        <AppBarComponent />
        <main className="mt-5 ml-5 w-[100%]">
        <div className="w-[60%] mx-auto text-center mt-20">
            <h1 className=" text-2xl">{title}</h1>
            <p className=" text-base mt-10">{description}</p>
        </div>
        </main>
    </>
    );
}

