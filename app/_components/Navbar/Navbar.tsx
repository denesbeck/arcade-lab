'use client'
import { Portal } from '@mui/material'
import { usePathname } from 'next/navigation'
import { navItems } from '@/_config/navigation'
import { Menu, Navitem, Title } from './_components'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <Portal>
      <div className="pointer-events-none fixed top-0 z-10 flex h-max w-full justify-center">
        <nav className="pointer-events-none relative isolate flex h-max w-full max-w-350 animate-text-focus items-center px-6 pt-2 pb-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,black_0%,black_18%,rgba(0,0,0,0.92)_30%,rgba(0,0,0,0.78)_42%,rgba(0,0,0,0.6)_54%,rgba(0,0,0,0.4)_66%,rgba(0,0,0,0.22)_78%,rgba(0,0,0,0.08)_90%,transparent_100%)] backdrop-blur-md"
          />
          <Title mr />
          {pathname !== '/contact' && (
            <>
              <div className="pointer-events-auto hidden w-max animate-text-focus items-center justify-center space-x-4 py-1 md:flex">
                {navItems.map((item) => (
                  <Navitem
                    key={item.label}
                    label={item.label}
                    path={item.path}
                  />
                ))}
              </div>
              <div className="pointer-events-auto flex w-full animate-text-focus justify-end py-2 md:hidden">
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
