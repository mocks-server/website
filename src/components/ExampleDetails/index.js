import React from "react";

import Details from "@theme/Details";

function ExampleDetails({ children }) {
  return (
    <Details className="code-example" summary={<summary>Example</summary>}>
      {children}
    </Details>
  );
}

export default ExampleDetails;
