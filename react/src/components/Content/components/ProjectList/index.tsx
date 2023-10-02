import Project from "./components/Project";
import "./index.css";
const ProjectList = ({
  projects,
}: {
  projects: {
    id: string;
    title: string;
    state: string;
    description: string;
    date: string;
    likes: number;
    author: string;
  }[];
}) => {
  return (
    <div className="project-list">
      {projects.map(
        (project: {
          id: string;
          title: string;
          state: string;
          description: string;
          date: string;
          likes: number;
          author: string;
        }) => (
          <Project key={project.id} project={project} />
        )
      )}
    </div>
  );
};

export default ProjectList;
