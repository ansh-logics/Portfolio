import { Link } from "react-router-dom";
import SectionHeader from "../terminal/SectionHeader";
import ProjectList from "../terminal/ProjectList";
import { links, projects } from "../../data/portfolio";

function AllProjects() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-10 pt-28 sm:px-6 md:pt-32">
      <Link to="/" className="text-sm text-ink-muted transition-colors hover:text-accent">
        ← cd ..
      </Link>
      <div className="mt-8">
        <SectionHeader
          index="~"
          command="cat ~/projects/*/README.md"
          title="All Projects"
          kicker="Everything I've built, from backend services to desktop apps."
        />
      </div>
      <ProjectList projects={projects} variant="grid" />
      <p className="mt-16 text-sm text-ink-muted">
        Want the details on something?{" "}
        <a href={`mailto:${links.email}`} className="text-accent hover:underline">
          {links.email}
        </a>
      </p>
    </section>
  );
}

export default AllProjects;
