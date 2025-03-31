import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

function QuickInput({textLabel, dataToProcess, processingFunction, exitFunction}) {
  const [text, setText] = useState("");

  const handleClick = () => {
    console.log("Textbox Value:", text);
    console.log("Data to process:", dataToProcess);
    processingFunction(text, dataToProcess);
    if (exitFunction) {
      exitFunction();
    }
  };

  return (
    <div className="container mt-3">
      <Form>
        <Form.Group controlId="textInput">
          <Form.Label>{textLabel}</Form.Label>
          <Form.Control
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Type ${textLabel}`}
          />
        </Form.Group>
        <Button variant="primary" className="mt-2" onClick={handleClick}>
          Done
        </Button>
      </Form>
    </div>
  );
}

export default QuickInput;
