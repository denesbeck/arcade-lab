import { Panel } from '@/_components'
import { TOOL_COUNT } from '@/_config/stats'
import { SKILL_GROUPS } from '../_config/data'
import Slot from './Slot'

const MAX_GROUP = Math.max(...SKILL_GROUPS.map(({ skills }) => skills.length))

// The count next to the meter matters: a bare 4-of-8 bar next to a group name
// reads as a proficiency rating rather than a tally of what is in the group.
const Meter = ({ filled }: { filled: number }) => (
  <div aria-hidden className="flex shrink-0 gap-1">
    {Array.from({ length: MAX_GROUP }, (_, cell) => (
      <span
        key={cell}
        className={`h-2.5 w-1.5 ${cell < filled ? 'bg-primary' : 'ring-dark-600 ring-1'}`}
      />
    ))}
  </div>
)

const Inventory = () => {
  return (
    <Panel title="Inventory" meta={`${TOOL_COUNT} slots filled`}>
      {/* Eight columns is exactly the largest group, so no group orphans a
          single item onto a row of its own; the cap keeps cells slot-sized. */}
      <div className="flex max-w-[44rem] flex-col gap-8">
        {SKILL_GROUPS.map(({ name, skills }) => (
          <div key={name} className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <span className="text-dark-200 text-[0.625rem] tracking-[0.25em] uppercase">
                {name}
              </span>
              <Meter filled={skills.length} />
              <span className="text-dark-500 text-[0.625rem] tracking-[0.2em] uppercase">
                {skills.length}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 xs:grid-cols-5 sm:grid-cols-8">
              {skills.map(({ name: skill, icon: Icon }, slot) => (
                <div
                  key={skill}
                  className="ring-dark-600 hover:ring-primary group relative flex aspect-square flex-col items-center justify-center gap-2 p-2 ring-1 transition-all duration-200 hover:shadow-[4px_4px_0px_0px_black]"
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
