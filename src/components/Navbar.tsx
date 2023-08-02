import { NavLink } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const Navbar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="navbar">
      <div className="logo">
        <FaPlayCircle size={30} fill="black" />
        VideoHub
      </div>
      <div className="searchbar">
        <input type="text" className="search-input" placeholder="Search..." />
        <button className="search-btn">
          <GoSearch size={20} />
        </button>
      </div>
      <ul className="nav-links">
        <li className="nav-items">
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        {!isAuthenticated && (
          <li className="nav-items">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/register"
            >
              Register
            </NavLink>
          </li>
        )}
        {!isAuthenticated && (
          <li className="nav-items">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/login"
            >
              Login
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li className="nav-items">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/create-video"
            >
              Create
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li className="nav-items">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/logout"
            >
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
