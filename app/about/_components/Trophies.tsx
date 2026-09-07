import Image from 'next/image'
import { CERT_COUNT } from '@/_config/stats'
import { CERTIFICATES } from '../_config/data'
import Panel from './Panel'
import Slot from './Slot'

// Same cell shape as the inventory, so certifications read as another shelf of
// the same case rather than a separate card grid.
const Trophies = () => {
  return (
    <Panel title="Trophies" meta={`${CERT_COUNT} unlocked`}>
      <div className="grid grid-cols-1 gap-3 xs:grid-cols-3">
        {CERTIFICATES.map(({ name, url, img, alt }, slot) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="ring-dark-600 hover:ring-primary group relative flex flex-col items-center justify-center gap-3 p-5 text-center ring-1 transition-all duration-200 hover:shadow-[6px_6px_0px_0px_black]"
          >
            <Slot index={slot + 1}>
              <span className="text-macos-green absolute top-1 right-1.5 text-[0.625rem]">
                ✓
              </span>
              <Image
                src={img}
                alt={alt}
                width={64}
                height={64}
                quality={100}
                className="h-16 w-16 transition-transform duration-200 group-hover:scale-105"
              />
              <span className="text-dark-300 group-hover:text-primary text-[0.625rem] leading-snug tracking-widest uppercase transition-colors duration-200">
                {name}
              </span>
            </Slot>
          </a>
        ))}
      </div>
    </Panel>
  )
}

export default Trophies
