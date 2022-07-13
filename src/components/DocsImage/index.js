import React from "react";
import clsx from "clsx";

function DocsImage({ src, alt, note }) {
  return (
    <div className="docs-img-holder">
      <div>
        <img src={src} alt={alt} className={clsx(!note && "no-note")} />
        {note ? <span>{note}</span> : null}
      </div>
    </div>
  );
}

export default DocsImage;
