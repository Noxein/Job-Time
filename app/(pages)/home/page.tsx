import { FetchTableData } from "@/app/ui/FetchTableData";
import { RegularData } from "@/app/ui/RegularData";

export default function Home(){
    return(
        <main>
            <RegularData />
            <FetchTableData />
        </main>
    )
}