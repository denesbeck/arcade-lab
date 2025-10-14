"use client";
import { usePathname } from "next/navigation";
import { Menu, Navitem, Title } from "./_components";
import { navItems } from "@/_config/navigation";
import { Portal } from "@mui/material";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <Portal>
      <nav className="flex fixed top-0 z-10 items-center py-2 px-6 w-full animate-text-focus h-max backdrop-blur-md">
        <Title mr />
        {pathname !== "/contact" && (
          <>
            <div className="hidden justify-center items-center py-1 space-x-4 w-max sm:flex animate-text-focus">
              {navItems.map((item) => (
                <Navitem key={item.label} label={item.label} path={item.path} />
              ))}
            </div>
            <div className="flex justify-end py-2 w-full sm:hidden animate-text-focus">
              <Menu>
                <>
                  {navItems.map((item) => (
                    <Navitem
                      key={item.label}
                      label={item.label}
                      path={item.path}
                    />
                  ))}
                </>
              </Menu>
            </div>
          </>
        )}
      </nav>
    </Portal>
  );
};

export default Navbar;
