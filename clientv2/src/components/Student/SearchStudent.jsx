const SearchStudent = () => {
  return (
    <div className="searchStudent container w-100">
      <input
        className="container my-3 p-3" 
        type="search"
        name="query"
        id="query"
        placeholder="Enter student name, place, mobile, email"
      />
    </div>
  );
};

export default SearchStudent;
