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
        {links.map((link) => {
          return (
            <NavigationMenuItem key={link.name}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(
                    `${navigationMenuTriggerStyle()} hover:font-semibold hover:text-main`,
                    {
                      "font-semibold text-sub1": pathname === link.href,
                    }
                  )}
                >
                  {link.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// export default function SNB() {
//   // const router = useRouter();
//   return (
//     <div>
//       <div className="flex flex-col w-16 bg-sub2 rounded-lg py-5 gap-2">
//         <Button variant="link" onClick={() => router.push("/")}>
//           Home
//         </Button>
//         <Button variant="link" onClick={() => router.push("/post")}>
//           Post
//         </Button>
//         <Button variant="link">Noti</Button>
//         <Button variant="link">Talk</Button>
//       </div>
//     </div>
//   );
// }
