import { skillCategories } from '@/lib/data'

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-12">
          Skills
        </h2>

        <div className="flex flex-col gap-10">
          {skillCategories.map(category => (
            <div key={category.name}>
              <h3 className="font-heading font-semibold text-sm text-muted uppercase tracking-widest mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <span
                    key={skill}
                    className="font-mono text-sm px-3 py-1.5 rounded-md bg-surface border border-border text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
