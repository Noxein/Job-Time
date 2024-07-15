import { FetchTableData } from "@/app/ui/FetchTableData";
import { DisplayDaysDesktop as DisplayDaysDesktopSkeleton } from "@/app/ui/LoadingSkeletons/DisplayDaysDesktop";
import { RegularData } from "@/app/ui/RegularData";
import { Suspense } from "react";

export default function Home(){
    return(
        <main>
            <RegularData />
            <Suspense fallback={<DisplayDaysDesktopSkeleton />}>
                <FetchTableData />
            </Suspense>
        </main>
    )
}