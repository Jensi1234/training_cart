import { FaOpencart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import './Navbar.css'
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ProductContext } from "../context/ProductContext";

const Navbar = () => {
  const { qtyOfProduct } = useContext(AppContext)
  const { searchItem, searchTerm, setSearchTerm, setShowSearchData } = useContext(ProductContext)

  const inputSearchProduct = (e) => {
    setSearchTerm(e.target.value)
    setShowSearchData(false)
  }

  return (
    <div>
      <nav class="navbar">
        <div class="container-fluid">
          <Link to='/' className="nav-title" >
            <a class="navbar-brand">Shophub</a>
          </Link>
          <div>
            <form class="d-flex align-items-center">
              <input
                className="form-control me-2 search-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => inputSearchProduct(e)}
              />
              <button className="btn btn-outline-light search-btn" onClick={(e) => {
                e.preventDefault()
                searchItem(searchTerm)
              }}>Search</button>
              <div className="d-flex flex-column justify-content-end ms-3">
                <div className="text-center cart-count">{qtyOfProduct}</div>
                <Link to='/cart'><FaOpencart className="fs-3  cart-icon " /></Link>
              </div>
            </form>
          </div>
        </div>
      </nav>-
    </div>
  )
}

export default Navbar;