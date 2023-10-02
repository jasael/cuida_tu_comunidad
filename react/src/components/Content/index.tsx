import * as React from "react";
import Actions from "./components/Actions";
import "./index.css";
import ProjectList from "./components/ProjectList";

const Content = () => {
  const [projects, setProjects] = React.useState<
    {
      id: string;
      title: string;
      state: string;
      description: string;
      date: string;
      likes: number;
      author: string;
    }[]
  >([]);
  const [states, setStates] = React.useState([]);
  const [filters, setFilters] = React.useState({
    search: "",
    state: "Todos",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  React.useEffect(() => {
    async function getProjects() {
      const data = await fetch(`${import.meta.env.VITE_API_URL}/projects`).then(
        (response) => response.json()
      );

      if (data.projects) {
        setProjects(data.projects);
      } else setProjects([]);
    }

    async function getStates() {
      const data = await fetch(
        `${import.meta.env.VITE_STATES_URL}/getaccesstoken`,
        {
          method: "GET",
          headers: {
            "api-token":
              "7P8eWwZwkA9VW8Drgk_cub-gc5dO75dupwvlii7nNWGOHzOh_5XG-io5fAsvWaX9sRI",
            "user-email": "programadorjp2001@gmail.com",
          },
        }
      ).then((response) => response.json());

      if (data.auth_token) {
        const arrayOfObjects = await fetch(
          `${import.meta.env.VITE_STATES_URL}/states/Mexico`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + data.auth_token,
            },
          }
        ).then((response) => response.json());

        const states = arrayOfObjects.reduce(
          (array: string[], item: { state_name: string }) => {
            array.push(item.state_name);
            return array;
          },
          []
        );

        setStates(states);
      }
    }
    getStates();
    getProjects();
  }, []);

  React.useEffect(() => {
    async function getProjects() {
      const query = `?title=${filters.search}&state=${
        filters.state !== "Todos" ? filters.state : ""
      }`;

      const data = await fetch(
        `${import.meta.env.VITE_API_URL}/projects${query}`
      ).then((response) => response.json());

      if (data.projects) {
        setProjects(data.projects);
      } else setProjects([]);
    }

    console.log(filters);
    getProjects();
  }, [filters]);

  return (
    <div className="content">
      <Actions states={states} filters={filters} handleChange={handleChange} />

      <main className="main">
        <h2>Proyectos</h2>

        <ProjectList projects={projects} />
      </main>
    </div>
  );
};

export default Content;
