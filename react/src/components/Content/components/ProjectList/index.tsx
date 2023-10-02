import Project from "./components/Project";
import "./index.css";
const ProjectList = ({ projects }: unknown) => {
  return (
    <div className="project-list">
      {projects.map((project: unknown) => (
        <Project key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
