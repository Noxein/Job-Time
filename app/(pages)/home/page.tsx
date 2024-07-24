import { FetchTableData } from "@/app/ui/FetchTableData";
import { DisplayDaysDesktop as DisplayDaysDesktopSkeleton } from "@/app/ui/LoadingSkeletons/DisplayDaysDesktop";
import { RegularData } from "@/app/ui/RegularData";
import { StartWorkBtn } from "@/app/ui/StartWorkBtn";
import { Suspense } from "react";

export default function Home(){
    return(
        <main>
            <StartWorkBtn />
            <RegularData />
            <Suspense fallback={<DisplayDaysDesktopSkeleton />}>
                <FetchTableData />
            </Suspense>
        </main>
    )
}