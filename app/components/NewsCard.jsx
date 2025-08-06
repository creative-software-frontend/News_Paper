const NewsCard = ({ title, date }) => {
  return (
    <div className="mb-4">
      <h3 className="font-semibold text-[17px] text-black  cursor-pointer transition duration-200">
        {title}
      </h3>
      <p className="text-sm text-gray-500">codemin · {date}</p>
    </div>
  );
};

export default NewsCard;
