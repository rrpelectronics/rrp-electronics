import React from "react";

const TableHeader = React.memo(() => (
  <li className="hidden lg:grid grid-cols-4 gap-x-3 md:gap-x-5 gap-y-4 pb-5.5 border-b-1 border-b-borderPrimary">
    <p
      data-animate-text
      className="col-span-2 text-textPrimary text-bodySmall font-neueMontreal leading-[120%] uppercase"
    >
      Position
    </p>
    <p
      data-animate-text
      className="col-span-2 text-textPrimary text-bodySmall font-neueMontreal leading-[120%] uppercase"
    >
      Location
    </p>
  </li>
));

TableHeader.displayName = "TableHeader";

export default TableHeader;
