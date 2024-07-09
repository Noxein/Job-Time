import { LogoutBtn } from "@/app/ui/LogoutBtn";
import { ResetRemoveArr } from "@/app/ui/ResetRemoveArr";
import Sidenav from "@/app/ui/sidenav";

export default function SomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="w-screen">
            <Sidenav logoutBtn={<LogoutBtn />} />
            {children}
            <ResetRemoveArr />
        </div>

    );
  }
  