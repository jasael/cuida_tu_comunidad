import * as React from "react";
import Modal, { Styles } from "react-modal";
import "./index.css";

const customStyles: Styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const CreateProject = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    state: "",
    author: "",
    date: "",
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      ...formData,
      date: new Date().toISOString().split("T")[0],
    };

    console.log(data);

    const response = await fetch(
      "https://site--cuida-tu-comunidad-laravel--hjdzjrjyd7b6.code.run/api/projects",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log(response);
    setOpenModal(false);
    setFormData({
      title: "",
      description: "",
      state: "",
      author: "",
      date: "",
    });
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleModal = () => setOpenModal((state) => !state);

  return (
    <>
      <button type="button" className="button" onClick={toggleModal}>
        Crea un nuevo proyecto
      </button>

      <Modal
        isOpen={openModal}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Crea un nuevo proyecto</h2>
        <form className="form" onSubmit={onSubmit}>
          <div className="input-group">
            <label className="label" htmlFor="title">
              Título
            </label>
            <input
              className="input"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="título"
            />
          </div>
          <div className="input-group">
            <label className="label" htmlFor="description">
              Descripción
            </label>
            <textarea
              className="input"
              id="description"
              name="description"
              value={formData.description}
              rows={4}
              onChange={onChange}
            />
          </div>

          <div className="input-group">
            <label className="label" htmlFor="date">
              Fecha
            </label>
            <input
              type="date"
              id="date"
              name="date"
              placeholder="formato: dd/mm/aaaa"
              className="input"
              value={formData.date}
              onChange={onChange}
            />
          </div>
          <div className="input-group">
            <label className="label" htmlFor="author">
              Autor
            </label>
            <input
              className="input"
              type="text"
              id="author"
              name="author"
              value={formData.author}
              placeholder="Ej: John Doe"
              onChange={onChange}
            />
          </div>
          <div className="input-group">
            <label className="label" htmlFor="state">
              Estado
            </label>
            <input
              className="input"
              type="text"
              id="state"
              name="state"
              value={formData.state}
              placeholder="Ej: Nuevo Leon"
              onChange={onChange}
            />
          </div>

          <div className="actions">
            <button
              type="button"
              className="button close"
              onClick={toggleModal}
            >
              Cerrar
            </button>
            <button type="submit" className="button create">
              Crear
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateProject;
