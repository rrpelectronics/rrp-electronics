"uyse client";
import React from 'react';

const HeadingCenter = ({ heading }) => {
  return (
    <h3 className="text-center text-heading2 text-black leading-[110%] tracking-heading2 mb-8 md:mb-10 col-span-4">
      {heading.split("\n").map((line, i) => (
        <React.Fragment key={i}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </h3>
  );
}

export default HeadingCenter;