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
  return (
    <div
      className={`m-3 h-[300px] w-[300px] bg-white-100 shadow-sm shadow-gray-600 ${cardProps}`}
    >
      {title && (
        <div className="bg-white-200 border-b p-3">
          <h2 className={`text-2xl font-semibold ${titleProps}`}>{title}</h2>
        </div>
      )}
      {children && <div className="px-3 pb-3">{children}</div>}
    </div>
  );
};

export default AwsCard;
