import  { useState } from 'react';
interface FilterFormProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    fetchHandler: (pageNumber: number,pageSize: number,searchTerm: string, category?: string)=>void
    pageSize:number,
    pageNumber:number
  }
export const FilterForm = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    fetchHandler,
    pageNumber,
    pageSize
  }: FilterFormProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categories = ["All","Id","Name","Email","Role"];

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category:string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };
  const OnClickHandler = () => {
    searchTerm ? fetchHandler(pageNumber,pageSize,searchTerm,selectedCategory) : fetchHandler(pageNumber,pageSize,'','')
  }
  return (
    <div className="flex mt-2 w-3/4">
      <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Your Email
      </label>
      <button
        id="dropdown-button"
        onClick={handleDropdownToggle}
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
        type="button"
      >
        {selectedCategory}
        <svg
          className={`w-2.5 h-2.5 ml-2.5 transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>
      {isDropdownOpen && (
        <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
            {categories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => handleCategorySelect(category)}
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="relative w-full">
        <input
          type="search"
          id="search-dropdown"
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus: outline-none"
          placeholder={`Search id, name, email, role . . . `}
          required
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-primary rounded-r-lg border border-primary hover:bg-ternary focus:ring-4 focus:outline-none focus:ring-primary-300"
          onClick={OnClickHandler}
        >
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
}

