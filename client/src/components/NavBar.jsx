import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search } from "./";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import CategorySidebar from "./categorySidebar/CategorySidebar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useUserContext } from "../redux/UserContext";
import { useGetProductCategoriesQuery } from "../redux/categoryApi";
import axios from "axios";
import DropdownProfile from "./menu/Menu";
import { Tooltip } from "@mui/material";
import { useMeQuery } from "../redux/auth";
const categoryType = ["Public","Company", "Public Business"];
const categorySort = ["New","Old","Popular","Special","Best"];
const NavBar = () => {
   const location = useLocation();
   const currentPath = location.pathname;
  const navigate=useNavigate()
  const cart = useSelector((state) => state.cart.cart.productsNumber);
  const wishlist = useSelector((state) => state.wishlist.wishlist.productsNumber);
  const [sidebar, setSidebar] = useState(false);
  // const { user } = useUserContext();
   const { data:userdata } = useMeQuery();
  const { data, isLoading, isError } = useGetProductCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  function func(category) {
    setSelectedCategory(category);
  }
  const  funcSort=((sort)=> {
    
    setSelectedSort(sort.target.value);
    navigate(`/search?sort=${sort.target.value === "All" ? "" : sort.target.value}`);
  })
  const  funcType=((type)=> {
    setSelectedType(type.target.value)
    navigate(`?type=${type.target.value === "All" ? "" : type.target.value}`);
  })
  //  console.log("type sort filter category", selectedCategory, selectedType, selectedSort);
  return (
    <header className="bg-amazonclone">
      <div className="max-w-[100vw] flex flex-wrap justify-between items-center py-1 md:py-2 px-4 md:px-10 lg:px-16 xl:px-20">
        {/* Left */}
        <div className="hidden md:flex  items-center mr-2">
          <Link to={"/"}>
            <span className="md:text-3xl text-white">Amazon</span>
          </Link>
        </div>
       
        <div>
          <select
            onChange={funcType}
            className="md:w-fit  bg-gray-300 text-black border  text-[7px] md:text-[13px] h-5 md:h-10 select-text mx-2"
          >
            <option value="All">Type</option>
            {categoryType.map((v, u) => (
              <option
                className="border-none p-2 text-[8px] md:text-[16px]"
                value={v}
                key={u}
              >
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            onChange={funcSort}
            className="md:w-fit h-5 md:h-10  bg-gray-300 text-black border  text-[7px] md:text-[13px] select-text"
          >
            <option value="All">Sort</option>
            {categorySort.map((v, u) => (
              <option
                className="border-none p-2 text-[8px] md:text-[16px]"
                value={v}
                key={u}
              >
                {v}
              </option>
            ))}
          </select>
        </div>
        {/* Middle */}
        <div className="flex-[50%] md:flex flex-grow items-center ml-4">
          <Search func={func} />
        </div>
        {/* Right */}

        <div className="flex  items-center justify-end text-white space-x-4">
          <Tooltip title="Messages" placement="bottom">
            <Link
              to={"/message"}
              className="hidden md:block ml-1 mr-1 md:mr-2 lg:mr-2 xl:mr-2"
            >
              {/* ... Message icon ... */}
              <div className="flex ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-[14px] md:h-[22px] text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>

                <div className="relative">
                  <div className="absolute   right-[-22px] top-[-20px] font-bold m-2 text-[8px] md:text-[12px]  bg-green-500  md:p-[2px] p-[1px] rounded">
                    20
                  </div>
                </div>
              </div>
            </Link>
          </Tooltip>
          <Tooltip title="Wishlist">
            <Link
              to={"/wishlist"}
              className="hidden md:block ml-2 mr-2 md:mr-2 lg:mr-2 xl:mr-2"
            >
              {/* ... Wishlist icon and count ... */}
              <div className="flex m-2">
                <HeartIcon className="h-[14px] md:h-[22px]  text-white" />
                <div className="relative">
                  <div className="absolute   right-[-20px] top-[-24px] font-bold m-2 text-[8px] md:text-[12px]  bg-green-500  md:p-[4px] p-[1px] rounded">
                    {wishlist}
                  </div>
                </div>
                {/* <div className="mt-7 text-xs xl:text-sm font-bold">Wishlist</div> */}
              </div>
            </Link>
          </Tooltip>
          <Tooltip title="Cart">
            {" "}
            <Link
              to={"/cart"}
              className="hidden md:block ml-2 mr-4 md:mr-2 lg:mr-2 xl:mr-2"
            >
              {/* ... Cart icon and count ... */}
              <div className="flex m-2">
                <ShoppingCartIcon className="h-[14px] md:h-[22px] text-white" />
                <div className="relative">
                  <div className="absolute right-[-22px] top-[-22px] font-bold m-2 text-[8px] md:text-[12px]  bg-green-400  md:p-[4px] p-[1px] rounded">
                    {cart}
                  </div>
                </div>
                {/* <div className="mt-7 text-xs xl:text-sm font-bold">Cart</div> */}
              </div>
            </Link>
          </Tooltip>
          <Link to={"#"} className="ml-1 mr-1 md:mr-6 lg:mr-8 xl:mr-10">
            {/* ... Cart icon and count ... */}
            <DropdownProfile />
          </Link>
        </div>
      </div>

      <div className="flex bg-amazonclone-light_blue text-white text-xs md:text-sm py-2 px-4 md:px-10 lg:px-16 xl:px-20 space-x-3">
        <div className="flex items-center cursor-pointer">
          {sidebar ? (
            <CloseIcon onClick={() => setSidebar(false)} className="h-6 w-6" />
          ) : (
            <MenuIcon onClick={() => setSidebar(true)} className="h-6 w-6" />
          )}
          <span onClick={() => setSidebar(!sidebar)} isOpen={sidebar} className="ml-2">
            All
          </span>
          {sidebar && (
            <CategorySidebar
              open={sidebar}
              setOpen={setSidebar}
              filteredCategory={selectedCategory === "All" ? "" : selectedCategory}
              filteredType={selectedType === "All" ? "" : selectedType}
              filteredSort={selectedSort === "All" ? "" : selectedSort}
              user={userdata?.user}
            />
          )}
        </div>
        <div className="text-[8px] md:text-[16px] ">Today's Deals</div>
        <div className="text-[8px] md:text-[16px] ">
          <Link to="/products">Products</Link>
        </div>
        <div className="hidden md:block text-[8px] md:text-[16px] ">Customer Service</div>
        {/* <div>
          <Link to="https://adminamazon.vercel.app/">Admin</Link>
        </div> */}
        <div>
          {userdata && userdata.user ? (
            <Link to="/profile">account</Link>
          ) : (
            <Link to="/signin">login</Link>
          )}
        </div>
        <div className="hidden md:block text-[8px] md:text-[16px] ">Gift Cards</div>
        <div className="hidden md:block text-[8px] md:text-[16px] ">Sell</div>
      </div>
    </header>
  );
};

export default NavBar;
