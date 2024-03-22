"use client";

const Footer = () => {
  return (
    <footer className="text-light text-center text-white py-4 mb-[-20px] relative bg-gray-800 flex items-center justify-center w-full">
      <div className="w-100 position-absolute bottom-0 pt-3 w-100">
        <div className="d-flex align-items-center justify-content-center flex-column">
          <p>
            <em>
              <b>Design & Developed by</b>
            </em>{" "}
            -{" "}
            <a
              href="https://github.com/heera9331"
              target="_parent"
              rel="noreferrer"
            >
              Heera Singh Lodhi
            </a>
          </p>
          <p>&copy; 2023 - IMEC</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
