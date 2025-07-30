import React, { FC } from 'react'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
interface NavBarProps {
 className?:string
  
}

export const NavBar: FC<NavBarProps> = ({ className,  }) => {
  return (
    <div className={cn('',className)}>
     <NavigationMenu>
  <NavigationMenuList>
    {/* <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem> */}
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
      <Link href={'tic-tac-toe'}>tic tac toe</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
    </div>
  )
}