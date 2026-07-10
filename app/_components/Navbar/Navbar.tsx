'use client'
import { Portal } from '@mui/material'
import { usePathname } from 'next/navigation'
import { navItems } from '@/_config/navigation'
import { Menu, Navitem, Title } from './_components'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <Portal>
      <div className="flex fixed top-0 z-10 justify-center w-full pointer-events-none h-max">
        <nav className="flex relative items-start px-6 pt-2 pb-24 w-full pointer-events-none isolate max-w-350 animate-text-focus h-max">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 backdrop-blur-md pointer-events-none mask-[linear-gradient(to_bottom,black_0%,black_18%,rgba(0,0,0,0.92)_30%,rgba(0,0,0,0.78)_42%,rgba(0,0,0,0.6)_54%,rgba(0,0,0,0.4)_66%,rgba(0,0,0,0.22)_78%,rgba(0,0,0,0.08)_90%,transparent_100%)]"
          />
          <Title mr />
          {pathname !== '/contact' && (
            <>
              <div className="hidden justify-center items-center py-1 space-x-4 w-max pointer-events-auto sm:flex animate-text-focus">
                {navItems.map((item) => (
                  <Navitem
                    key={item.label}
                    label={item.label}
                    path={item.path}
                  />
                ))}
              </div>
              <div className="flex justify-end py-2 w-full pointer-events-auto sm:hidden animate-text-focus">
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
      </div>
    </Portal>
  )
}

export default Navbar
