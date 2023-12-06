import "./Footer.css";

const Footer = () => {
  return (
    <footer
      className="text-light py-4 position-relative"
      style={{ height: "50vh" }}
    >
      <div className="i-bg-primary w-100 position-absolute bottom-0 pt-3 w-100">
        <div className="d-flex align-items-center justify-content-center flex-column">
          <p>
            <em>
              <b>Design & Developed by</b>
            </em>{" "}
            - Heera Singh Lodhi
          </p>
          <p>&copy; 2023 - IMEC</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
