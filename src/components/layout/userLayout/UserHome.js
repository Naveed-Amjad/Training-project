// library imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
// component imports
import ReactButton from '../../button';
import FilterDropdown from '../../utils/filtersComponent';
import UserCard from './UserCard';
// Redux imports
import { getProducts } from '../../../redux/slices/productsSlice';
import { addItem } from '../../../redux/slices/cartSlice';
// style imports
import './userHome.css';

//
const UserHome = () => {
  const products = useSelector((state) => state.productsReducer.products);
  const [itemDetails, setItemDetails] = useState({});
  const [priceObject, setPriceObject] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [sortFilter, setSortFilter] = useState();
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    dispatch(getProducts(filters)).then(({ payload }) => {
      if (payload?.data?.length) {
        setItemDetails(payload?.data[0]);
      }
    });
  }, []);

  useEffect(() => {
    console.log('fiterr')
    dispatch(getProducts(filters)).then(({ payload }) => {
      if (payload?.data?.length) {
        setItemDetails(payload?.data[0]);
      }
    });
  }, [filters]);

  const quantityDecreaseHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      const disabledbtn = document.getElementById('decreasebtn');
      disabledbtn.disabled = true;
    }
  };

  const handleSortFilter = (value) => {
    setSortFilter(value);
    setFilters({
      ...filters,
      sort: value
    });
  }
  const handlePriceFilter = (min, max) => {
    setPriceObject({
      minPrice: min,
      maxPrice: max,
    });
    setFilters({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };
  const arr = [
    {
      title: '0-100',
      onClick: () => handlePriceFilter(0, 100),
    },
    {
      title: '100-200',
      onClick: () => handlePriceFilter(100, 200),
    },
    {
      title: '300-500',
      onClick: () => handlePriceFilter(300, 500),
    },
    {
      title: '600-800',
      onClick: () => handlePriceFilter(600, 800),
    },
    {
      title: '1000-1500',
      onClick: () => handlePriceFilter(1000, 1500),
    },
    {
      title: '1500-2000',
      onClick: () => handlePriceFilter(1500, 2000),
    },
    {
      title: '2000 & Above',
      onClick: () => handlePriceFilter(2000, 1000000)
    }
  ];

  const sortArr = [
    {
      value: 'default',
      sort: 0,
      onClick: () => handleSortFilter(0)
    },
    {
      value: 'Low to high',
      sort: -1,
      onClick: () => handleSortFilter(1)
    },
    {
      value: 'High to low',
      sort: 1,
      onClick: () => handleSortFilter(-1)
    },
  ];

  const handleDetails = (data) => {
    setItemDetails(data);
    // setCartItem(data);
  };
  const handleSearch = debounce((e) => {
    setSearchName(e.target.value);
    setFilters({
      ...filters,
      name: e.target.value
    });
  }, 500);

  // const title = priceObject.maxPrice ? priceObject.minPrice - priceObject.maxPrice : 'Price'
  const title = sortFilter === undefined ? 'Default sort' : 'High to low';
  console.log('SORT FILTER = ', sortFilter);
  return (
    <div className="">
      <div className="filters">
        <div className="filter_divs justify-content-center">
          <span className="heading">Products</span>
        </div>
        <div className="filter_divs">
          <FilterDropdown
            style={{ width: '90px', height: '35px', marginLeft: 'px' }}
            title='Price'
            list={arr}
          />
          <div style={{ marginLeft: '20px', height: '30px', width: '230px', color: 'blue' }}>{priceObject.maxPrice ? `Price range ${priceObject.minPrice} - ${priceObject.maxPrice} is selected` : ''}</div>
          {console.log('minPrice = ', priceObject.minPrice)}
        </div>
        <div className="filter_divs ">
          <h6 className="mt-2">Sorting</h6>
          <FilterDropdown
            style={{ width: '250px', height: '35px', marginLeft: '0px' }}
            title={title}
            sortArr={sortArr}
          />
        </div>
        <div className="filter_divs">
          <h6 className="mt-2 ms-2">
            Search{' '}
            <input
              className="custom-search-bar"
              type="text"
              placeholder="search by name"
              onChange={handleSearch}
            />
          </h6>
        </div>
      </div>
      <div style={{ paddingTop: '130px' }} className="cards_div">
        <div className="cards_side">
          {products.length
            ? products.map((data, index) => (
              <UserCard
                key={index}
                product={data}
                handleDetails={handleDetails}
              />
            ))
            : <div style={{ margin: '200px 0px 0px 300px', color: 'blue' }}><h3>No Products to Show</h3></div>}
        </div>
        {products.length ? <div className="details_dev">
          <div className="pic_buttons">
            <div className="image">
              <img
                src={
                  itemDetails?.thumbnail
                    ? itemDetails.thumbnail
                    : products[0]?.thumbnail
                }
                style={{ height: '350px', width: '330px' }}
              />
            </div>
            <div className="buttons_side">
              <div className="text_div">
                {itemDetails?.description
                  ? itemDetails.description
                  : products[0]?.description}
              </div>
              <div className="colors_div">
                <h6 style={{ marginTop: '40px' }}>Color: </h6>
                <div className="colors">
                  <div className="color_img_div">
                    <div
                      style={{
                        height: '28px',
                        width: '28px',
                        background: '#155724',
                        padding: '6px',
                      }}
                    ></div>
                  </div>
                  <div className="color_img_div">
                    <div
                      style={{
                        height: '28px',
                        width: '28px',
                        background: '#AAA',
                        padding: '6px',
                      }}
                    ></div>
                  </div>
                  <div className="color_img_div">
                    <div
                      style={{
                        height: '28px',
                        width: '28px',
                        background: '#1B1E21',
                        padding: '6px',
                      }}
                    ></div>
                  </div>
                  <div className="color_img_div">
                    <div
                      style={{
                        height: '28px',
                        width: '28px',
                        background: '#231579',
                        padding: '6px',
                      }}
                    ></div>
                  </div>
                  <div className="color_img_div">
                    <div
                      style={{
                        height: '28px',
                        width: '28px',
                        background: '#740F0F',
                        padding: '6px',
                      }}
                    ></div>
                  </div>
                </div>
                <div className="size">
                  <h6>Size: </h6>
                  <div className="size_div">
                    <div className="size_div_child">
                      <div
                        style={{
                          height: '28px',
                          width: '28px',
                          padding: '6px',
                        }}
                      >
                        XS
                      </div>
                    </div>
                    <div className="size_div_child">
                      <div
                        style={{
                          height: '28px',
                          width: '28px',
                          padding: '6px',
                        }}
                      >
                        S
                      </div>
                    </div>
                    <div className="size_div_child">
                      <div
                        style={{
                          height: '28px',
                          width: '28px',
                          padding: '6px',
                        }}
                      >
                        M
                      </div>
                    </div>
                    <div className="size_div_child">
                      <div
                        style={{
                          height: '28px',
                          width: '28px',
                          padding: '6px',
                        }}
                      >
                        L
                      </div>
                    </div>
                    <div className="size_div_child">
                      <div
                        style={{
                          height: '28px',
                          width: '28px',
                          padding: '6px',
                        }}
                      >
                        XL
                      </div>
                    </div>
                    <div className="size_div_child">
                      <div
                        style={{
                          height: '28px',
                          width: '28px',
                          padding: '6px',
                        }}
                      >
                        2XL
                      </div>
                    </div>
                    <div className="size_div_child">
                      <div
                        style={{
                          height: '28px',
                          width: '28px',
                          padding: '6px',
                        }}
                      >
                        3XL
                      </div>
                    </div>
                  </div>
                </div>
                <div className="price_div">
                  <span style={{ fontSize: '18px' }}>
                    Price:{' '}
                    <span style={{ color: '#007BFF', fontSize: '24px' }}>
                      {itemDetails?.price
                        ? itemDetails.price
                        : products[0]?.price}
                    </span>{' '}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel"></div>
          <div className="quantity">
            <h6>Quantity: </h6>
            <div className="d-flex">
              <span
                className="sign"
                id="decreasebtn"
                onClick={quantityDecreaseHandler}
              >
                -
              </span>
              <span className="number_span px-4 pt-1">{quantity}</span>
              <span className="sign" onClick={() => setQuantity(quantity + 1)}>
                +
              </span>
            </div>
          </div>
          <ReactButton
            className="cart_btn"
            placeholder="Add to Cart"
            onClick={() => {
              // setCartItem(products[0])
              if (itemDetails) {
                dispatch(addItem({ product: itemDetails, quantity: quantity }));
              } else {
                dispatch(addItem({ product: products[0], quantity: quantity }));
              }
              localStorage.getItem('role') === 'user'
                ? nav('/shopingbag')
                : nav('/login');
            }}
          />
        </div> : null}
      </div>
    </div>
  );
};

export default UserHome;
