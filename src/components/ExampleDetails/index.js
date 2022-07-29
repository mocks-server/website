import React from "react";

import Details from "@theme/Details";

function ExampleDetails({ children, title = "Example" }) {
  return (
    <Details className="code-example" summary={<summary>{title}</summary>}>
      {children}
    </Details>
  );
}

export default ExampleDetails;
