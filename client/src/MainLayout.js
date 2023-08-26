import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { RiCodeView, RiCouponLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB, FaStarHalf, FaStar } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt, BiLogOut } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import Cookies from "js-cookie";
import { logout } from "./utils/baseUrl";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
//   const authState = useSelector((state) => state);

//   const { user, isLogoutSuccess, isError } = authState.auth;

//   // Usage

//   useEffect(() => {
//     dispatch(getMyDetails());
//   }, [dispatch]);

  const logoutHandler = async() => {
    await logout()
    // navigate("/signin");
  };

  return (
    <Layout className="h-[100vh] w-full">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0 ">
            <span className="sm-logo">
              {" "}
              <a
                style={{ textDecoration: "none", color: "white" }}
                href="https://adminamazonapp.vercel.app/"
              >
                Amazon
              </a>
            </span>
            <span className="lg-logo">
              {" "}
              <a
                style={{ textDecoration: "none", color: "white" }}
                href="https://adminamazonapp.vercel.app/"
              >
                Amazon
              </a>
            </span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else if (key.startsWith("http")) {
              // Navigate to an external URL
              window.location.href = key;
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Profile",
            },
            {
              key: "reviews",
              icon: <FaStar className="fs-4" />,
              label: "Reviews",
            },
            // {
            //   key: "customers",
            //   icon: <AiOutlineUser className="fs-4" />,
            //   label: "Customers",
            // },
            {
              key: "Catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "https://adminamazon.vercel.app",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "https://adminamazon.vercel.app",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Product List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "https://adminamazon.vercel.app",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Coupon",
                },
                // {
                //   key: "coupon-list",
                //   icon: <RiCouponLine className="fs-4" />,
                //   label: "Coupon List",
                // },
              ],
            },
            {
              key: "blogs",
              icon: <FaBloggerB className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "https://adminamazon.vercel.app",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog",
                },
                // {
                //   key: "blog-list",
                //   icon: <FaBloggerB className="fs-4" />,
                //   label: "Blog List",
                // },
                {
                  key: "https://adminamazon.vercel.app",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog Category",
                },
                // {
                //   key: "blog-category-list",
                //   icon: <FaBloggerB className="fs-4" />,
                //   label: "Blog Category List",
                // },
              ],
            },

            {
              key: "#",
              icon: <BiLogOut className="fs-4" />,
              label: "Logout",
              onClick: logoutHandler,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        {/* <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          })}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  width={25}
                  height={25}
                  style={{ borderRadius: "50%" }}
                  src={user && user.avatar?.url}
                  alt={user && user?.name}
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{user && user?.name}</h5>
                <p className="mb-0">{user && user?.email}</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="profile"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={logoutHandler}
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header> */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
