import Logo from "../../assets/images/logo.svg";
import "./index.css";

const Header = () => {
  return (
    <header className="header">
      <img src={Logo} alt="Logo Cuida tu Comunidad" className="header-logo" />
      <h1 className="header-title">Cuida tu Comunidad</h1>
    </header>
  );
};

export default Header;
