/** side nav bar */
import { Bell, House, MessageCircleMore, SquarePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

interface MenuProps {
  href: string;
  icon: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({ href, icon }) => {
  return <Link href={href}>{icon}</Link>;
};

const SNB = () => {
  return (
    <div className="h-full overflow-hidden min-w-16">
      <div className="flex flex-col space-y-6 items-center bg-zinc-200 rounded-lg py-6">
        <Menu href="/" icon={<House />} />
        <Menu href="/add" icon={<SquarePlus />} />
        <Menu href="/" icon={<Bell />} />
        <Menu href="/" icon={<MessageCircleMore />} />
      </div>
    </div>
  );
};

export default SNB;
