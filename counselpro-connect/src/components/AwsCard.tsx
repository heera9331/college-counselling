import { useState } from "react";
import { VscTriangleLeft } from "react-icons/vsc";
import { VscTriangleDown } from "react-icons/vsc";

const AwsCard = ({
  title,
  children,
  titleProps,
  cardProps,
}: {
  title?: string;
  children?: any;
  titleProps?: string;
  cardProps?: string;
}) => {
  const [click, setClick] = useState(true);
  return (
    <div className={`m-3 bg-white-100 shadow-sm shadow-gray-600 ${cardProps}`}>
      {title && (
        <div className="bg-white-200 border-b p-3 flex justify-between items-center">
          <h2 className={`text-2xl font-semibold ${titleProps}`}>{title}</h2>
          {click && (
            <VscTriangleLeft
              onClick={() => {
                setClick(false);
              }}
            />
          )}
          {!click && (
            <VscTriangleDown
              onClick={() => {
                setClick(true);
              }}
            />
          )}
          {/* <VscTriangleRight /> */}
        </div>
      )}
      {children && click && <div className="px-3 pb-3">{children}</div>}
    </div>
  );
};

export default AwsCard;
