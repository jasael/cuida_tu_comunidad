import "./index.css";
import TrashIcon from "../../../../../icons/TrashIcon";
import HearthIcon from "../../../../../icons/HearthIcon";
const Project = ({ project }: unknown) => {
  const date = new Date(project.date).toLocaleString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="project">
      <div className="project-header">
        <div className="project-info">
          <h3>{project.title}</h3>
          <p>{project.state}</p>
        </div>
        <div className="project-date">
          <p>{date}</p>
          {project.likes === 0 && (
            <button type="button" className="btn-icon">
              <TrashIcon />
            </button>
          )}
        </div>
      </div>
      <div className="project-body">
        <p>{project.description}</p>
      </div>

      <div className="project-footer">
        <p>{project.author}</p>

        <div className="likes">
          <p>{project.likes}</p>

          <button type="button" className="btn-icon">
            <HearthIcon color="#d4c19c" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Project;
