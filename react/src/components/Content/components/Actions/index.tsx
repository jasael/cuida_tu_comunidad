import * as React from "react";
import "./index.css";
import CreateProject from "./components/CreateProject";



const Actions = ({
  states,
  filters,
  handleChange,
}: {
  states: string[];
  filters: {
    search: string;
    state: string;
  };
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}) => {


  return (
    <div className="actions">
      <header className="actions-header">
        <CreateProject />

        <div className="filters">
          <div className="input-group">
            <label className="label" htmlFor="search">
              Buscar
            </label>

            <input
              type="search"
              id="search"
              name="search"
              onChange={handleChange}
              value={filters.search}
              className="input"
              placeholder="Busca un proyecto por título"
            />
          </div>

          <div className="input-group">
            <label className="label" htmlFor="state">
              Estado
            </label>

            <select
              className="input select"
              name="state"
              onChange={handleChange}
              id="state"
              value={filters.state}
            >
              {["Todos", ...states].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Actions;
