import Clock from "@/components/layout/Clock";
import Addressbar from "@/components/layout/Addressbar";
import Shortcut from "@/components/layout/Shortcut";
import ModeToggle from "./ModeToggle";
import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import ProfileButton from "./ProfileButton";
import Sidebar from "./Sidebar";

export default function Navbar() {
  return (
    <nav className="flex flex-row justify-between items-center px-0 lg:px-8 py-4 gap-6 sticky top-0 left-0 mb-8 bg-background">
      <div className="flex flex-row items-center">
        <Sidebar />
        <Clock />
        <Addressbar />
      </div>
      <ProfileButton />
    </nav>
  );
}
