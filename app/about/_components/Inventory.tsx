import { Panel } from '@/_components'
import { TOOL_COUNT } from '@/_config/stats'
import { SKILL_GROUPS } from '../_config/data'
import Slot from './Slot'

const MAX_GROUP = Math.max(...SKILL_GROUPS.map(({ skills }) => skills.length))

// A meter cell shares its slot's delay, so the bar fills as the slots land.
// Starts after the panel's own blur-in (200ms + 400ms), or the first cells go unseen.
const slotDelay = (group: number, slot: number) => 600 + group * 150 + slot * 80

// The count next to the meter matters: a bare 4-of-8 bar next to a group name
// reads as a proficiency rating rather than a tally of what is in the group.
const Meter = ({ filled, group }: { filled: number; group: number }) => (
  <div aria-hidden className="flex shrink-0 gap-1">
    {Array.from({ length: MAX_GROUP }, (_, cell) => (
      <span key={cell} className="ring-dark-600 relative h-2.5 w-1.5 ring-1">
        {/* -inset-px covers the ring, so a lit cell reads as solid. */}
        {cell < filled && (
          <span
            style={{ animationDelay: `${slotDelay(group, cell)}ms` }}
            className="bg-primary animate-meter-fill absolute -inset-px [animation-fill-mode:backwards]"
          />
        )}
      </span>
    ))}
  </div>
)

// CSS rather than CountUp: a JS counter starts at hydration, which trails the
// cells' CSS clock by however long hydration takes. Digit n shows from cell n
// lighting until cell n+1 does; the last one holds.
const MeterCount = ({ filled, group }: { filled: number; group: number }) => (
  <span className="text-dark-500 grid text-[0.625rem] tracking-[0.2em] uppercase">
    <span className="sr-only">{filled}</span>
    {Array.from({ length: filled + 1 }, (_, n) => {
      const start = n === 0 ? 0 : slotDelay(group, n - 1)
      const last = n === filled
      const duration = last ? 1 : slotDelay(group, n) - start
      return (
        <span
          key={n}
          aria-hidden
          style={{
            animation: `meterCount ${duration}ms linear ${start}ms ${last ? 'forwards' : 'none'}`,
          }}
          className="opacity-0 [grid-area:1/1]"
        >
          {n}
        </span>
      )
    })}
  </span>
)

const Inventory = () => {
  return (
    <Panel title="Inventory" meta={`${TOOL_COUNT} slots filled`} delay={200}>
      {/* Nine columns is exactly the largest group, so no group orphans a
          single item onto a row of its own. The cap is derived, not round:
          9 cells + 8 gaps at the original 81px slot size. */}
      <div className="flex max-w-[49.5rem] flex-col gap-8">
        {SKILL_GROUPS.map(({ name, skills }, group) => (
          <div key={name} className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <span className="text-dark-200 text-[0.625rem] tracking-[0.25em] uppercase">
                {name}
              </span>
              <Meter filled={skills.length} group={group} />
              <MeterCount filled={skills.length} group={group} />
            </div>
            <div className="grid grid-cols-3 gap-2 xs:grid-cols-5 sm:grid-cols-9">
              {skills.map(({ name: skill, icon: Icon }, slot) => (
                <div
                  key={skill}
                  style={{ animationDelay: `${slotDelay(group, slot)}ms` }}
                  className="ring-dark-600 hover:ring-primary group animate-text-focus relative flex aspect-square flex-col items-center justify-center gap-2 p-2 ring-1 transition-all duration-200 [animation-fill-mode:backwards] hover:shadow-[4px_4px_0px_0px_black]"
                >
                  <Slot index={slot + 1}>
                    <Icon className="text-primary h-6 w-6 shrink-0" />
                    <span className="text-dark-300 group-hover:text-primary text-center text-[0.5rem] leading-tight tracking-widest break-words uppercase transition-colors duration-200">
                      {skill}
                    </span>
                  </Slot>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

export default Inventory
