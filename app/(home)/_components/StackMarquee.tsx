import { SKILLS } from '@/about/_config/data'

// Duplicated once so the -50% keyframe lands exactly on the seam.
const TRACK = [...SKILLS, ...SKILLS]

const StackMarquee = () => {
  return (
    <div
      aria-hidden
      className="border-secondary animate-text-focus group relative h-18 overflow-hidden border-y-2 mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div className="animate-marquee absolute inset-y-0 left-0 flex w-max items-center gap-12 pr-12 group-hover:[animation-play-state:paused]">
        {TRACK.map((skill, index) => {
          const Icon = skill.icon
          return (
            <div
              key={`${skill.name}-${index}`}
              className="flex shrink-0 items-center gap-3"
            >
              <Icon className="text-dark-300 h-6 w-6" />
              <span className="text-dark-400 text-xs tracking-widest whitespace-nowrap uppercase">
                {skill.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StackMarquee
