import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext } from "react";
import { InfoContext } from "../context/InfoContext";

function Info() {
  const { show, setShow, infoTopic, infoMessage } = useContext(InfoContext);
  const handleClose = () => setShow(false);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{infoTopic}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{infoMessage}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Info;
