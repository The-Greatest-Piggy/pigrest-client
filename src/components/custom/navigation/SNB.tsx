/**
 * side navigation bar
 *
 * home, add, noti, talk
 */

"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "HOME",
    href: "/",
  },
  {
    name: "POST",
    href: "/post",
  },
  {
    name: "NOTI",
    href: "/noti",
  },
  {
    name: "CHAT",
    href: "/chat",
  },
];

export default function SNB() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <NavigationMenu className="h-fit">
      <NavigationMenuList className="flex flex-col space-y-3">
        {links.map((link) => (
          <NavigationMenuItem key={link.name}>
            <Link
              href={link.href}
              className={clsx(
                `${navigationMenuTriggerStyle()} hover:font-semibold hover:text-main`,
                {
                  "font-semibold text-sub1": pathname === link.href,
                }
              )}
            >
              {link.name}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
