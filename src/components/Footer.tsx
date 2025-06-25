import { fetchData } from "../hooks/fetchData";
import type Global from "@/interfaces/global";

const apiData = fetchData("/api/global");

export function Footer() {
    const response: any = apiData.read();

    // Extract the actual data from the nested structure
    const data: Global = response?.data;

    return (
        <div className="bg-ultramarine-950/80 h-dvh flex flex-col gap-2 items-center justify-center text-gray-200">
            {data?.siteName || 'Site Name Not Available'}
        </div>
    );
};

