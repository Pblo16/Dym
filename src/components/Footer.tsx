import { useFetch } from "../hooks/useFetch";
import React from "react";
import { Suspense } from "react";
import { fetchData } from "../hooks/fetchData";

interface Position {
    id: number;
    name: string;
}
const apiData = fetchData("http://localhost/api/position");

export function Footer() {
    const data = apiData.read();

    return (
        <div className="bg-ultramarine-950/80 h-dvh flex flex-col gap-2 items-center justify-center">
            <h2 className="text-3xl">Posiciones disponibles</h2>
            <Suspense fallback={<div>Loading...</div>}>
                {data && data.length > 0 ? (
                    data.map((item: Position) => (
                        <div key={item.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                            <h3 className="text-white font-medium text-lg">
                                {item.name}
                            </h3>
                        </div>
                    ))
                ) : (
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <p className="text-white">No hay posiciones disponibles en este momento</p>
                    </div>
                )}
            </Suspense>
        </div>
    );
};

