// library imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { notification } from 'antd'
// component imports
import ReactButton from '../../button';
import FilterDropdown from '../../utils/filtersComponent';
import UserCard from './UserCard';
import Load from '../../../assets/Load.svg';
// Redux imports
import { getProducts, getProductDetails } from '../../../redux/slices/productsSlice';
import { addItem, addSizeAndColor } from '../../../redux/slices/cartSlice';
import { GetNotifications } from '../../../redux/slices/notification-slice';
// style imports
import './userHome.css';

//
const UserHome = () => {
  const products = useSelector((state) => state.productsReducer.products);
  const { token } = useSelector((state) => state.authReducer);
  const { itemDetails } = useSelector((state) => state?.productsReducer);
  // const [itemDetails, setItemDetails] = useState({});
  const [priceObject, setPriceObject] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState();
  const [sizeName, setSizeName] = useState();
  const [sortFilter, setSortFilter] = useState();
  const [colorName, setColorName] = useState();
  const [next, setNext] = useState(8);
  const [filters, setFilters] = useState([]);
  const [productColor, setProductColor] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productId, setProductId] = useState();
  const [stock, setStock] = useState();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const userId = localStorage.getItem('id');
  const role = useSelector((state) => state.authReducer.role);

  useEffect(() => {
    dispatch(getProducts(filters)).then(({ payload }) => {
      if (payload?.data?.length) {
        dispatch(getProductDetails({ productId: payload?.data[0]._id }))
      }
    });
  }, [filters]);

  useEffect(() => {
    dispatch(GetNotifications({ userId }))
  }, [])

  const quantityDecreaseHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      const disabledbtn = document.getElementById('decreasebtn');
      disabledbtn.disabled = true;
    }
  };

  const quantityIncreaseHandler = () => {
    if (quantity >= itemDetails?.stock) {
      const disabledbtn = document.getElementById('increasebtn');
      disabledbtn.disabled = true;
      notification.warning({
        message: 'warning',
        description: `Currently we have only ${itemDetails?.stock} items in stock`,
        type: 'error',
      });
    } else {
      setQuantity(quantity + 1);
    }
  }

  const handleSortFilter = (value) => {
    setSortFilter(value);
    setFilters({
      ...filters,
      sort: value
    });
  }
  const handleColorFilter = (value) => {
    setColorFilter(value);
    setColorName(value);
    setFilters({
      ...filters,
      color: value
    })
  }

  const handleSizeFilter = (value) => {
    setSizeFilter(value);
    setSizeName(value);
    setFilters({
      ...filters,
      size: value
    })
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

  const sizeArr = [
    {
      title: 'XS',
      onClick: () => handleSizeFilter('XS')
    },
    {
      title: 'S',
      onClick: () => handleSizeFilter('S')
    },
    {
      title: 'M',
      onClick: () => handleSizeFilter('M')
    },
    {
      title: 'L',
      onClick: () => handleSizeFilter('L')
    },
    {
      title: 'XL',
      onClick: () => handleSizeFilter('XL')
    },
    {
      title: 'Clear Filter',
      onClick: () => handleSizeFilter('')
    }
  ]
  const colorArr = [
    {
      title: 'Black',
      onClick: () => handleColorFilter('Black')
    },
    {
      title: 'Grey',
      onClick: () => handleColorFilter('Grey')
    },
    {
      title: 'Red',
      onClick: () => handleColorFilter('Red')
    },
    {
      title: 'Green',
      onClick: () => handleColorFilter('Green')
    },
    {
      title: 'Orange',
      onClick: () => handleColorFilter('Orange')
    },
    {
      title: 'Clear Filter',
      onClick: () => handleColorFilter('')
    }
  ]
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
    },
    {
      title: 'Clear Filter',
      onClick: () => handlePriceFilter('', '')
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
    // setItemDetails(data);
    // setCartItem(data);
  };
  const handleSearch = debounce((e) => {
    setSearchName(e.target.value);
    setFilters({
      ...filters,
      name: e.target.value
    });
  }, 500);

  const SizeArray = ['S', 'XS', 'M', 'L', 'XL', '2XL', '3XL']
  const colorArray = ['#155724', '#AAA', '#1B1E21', '#231579', '#740F0F'];
  // const title = priceObject.maxPrice ? priceObject.minPrice - priceObject.maxPrice : 'Price'
  const title = (sortFilter === undefined || sortFilter === 0) ? 'Default sort' : sortFilter === -1 ? 'High to low' : 'Low to High';
  const colorTitle = colorName || 'Color';
  const sizeTitle = sizeName || 'Size'
  return (
    <div className="">
      <div className="filters">
        <div className="filter_divs justify-content-center">
          <span className="heading">Products</span>
        </div>
        <div>
          <FilterDropdown
            style={{ width: '90px', height: '35px', margin: '30px' }}
            title={sizeTitle}
            list={sizeArr}
          />
        </div>
        <div>
          <FilterDropdown
            style={{ width: '90px', height: '35px', margin: '30px' }}
            title={colorTitle}
            list={colorArr}
          />
        </div>
        <div className="filter_divs">
          <FilterDropdown
            style={{ width: '90px', height: '35px', marginLeft: 'px' }}
            title='Price'
            list={arr}
          />
          <div style={{ marginLeft: '20px', height: '30px', width: '230px', color: 'blue' }}>{priceObject.maxPrice ? `Price range ${priceObject.minPrice} - ${priceObject.maxPrice} is selected` : ''}</div>
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
          <h6 className="mt-2 ">
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
          {products?.length
            ? <> {products.map((data, index) => {
              return (index < next && <UserCard
                key={index}
                product={data}
                handleDetails={handleDetails}
                setStock={setStock}
              // setProductId={setProductId}
              />);
            }
            )}
              {products?.length > next ? <img src={Load} onClick={() => setNext((num) => num + 8)} style={{ height: '35px', width: '100px', margin: '0px 0px 0px 250px' }} /> : ''}
            </>
            : <div style={{ margin: '200px 0px 0px 300px', color: 'blue' }}><h3>No Products to Show</h3></div>}
        </div>
        {products?.length ? <div className="details_dev">
          <div className="pic_buttons">
            <div className="image">
              <img
                src={
                  itemDetails?.images?.length
                    ? typeof (itemDetails?.images?.[0]) === 'object'
                      ? `http://localhost:4009/${itemDetails?.images[0][0]}`
                      : `http://localhost:4009/${itemDetails?.images[0]}`
                    : ''
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
                  {
                    colorArray?.map((color, index) => {
                      return (
                        <div key={index} className={color === productColor ? 'color_img_div border-danger' : 'color_img_div'}>
                          <div onClick={() => setProductColor(color)}
                            style={{
                              height: '28px',
                              width: '28px',
                              background: color,
                              padding: '6px'
                            }}
                          >
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <div className="size">
                  <h6>Size: </h6>
                  <div className="size_div">
                    {
                      SizeArray?.map((size, index) => {
                        return (
                          <div key={index} className={productSize === size ? 'size_div_child border-danger' : 'size_div_child'}>
                            <div onClick={() => setProductSize(size)}
                              style={{
                                height: '28px',
                                width: '28px',
                                padding: '6px',
                              }}
                            >
                              {size}
                            </div>
                          </div>
                        )
                      })
                    }
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
              <span className="number_span px-4 pt-1">{itemDetails?.stock > 0 ? quantity : 0}</span>
              <span className="sign" id='increasebtn' onClick={() => quantityIncreaseHandler()}>
                +
              </span>
            </div>
          </div>
          <ReactButton
            isEnabledbtn={!(productColor && productSize && itemDetails?.stock)}
            className="cart_btn"
            placeholder="Add to Cart"
            onClick={() => {
              dispatch(addSizeAndColor({
                color: productColor,
                size: productSize
              }))
              // setCartItem(products[0])
              if (itemDetails) {
                dispatch(addItem({ product: itemDetails, quantity }));
              } else {
                dispatch(addItem({ product: products[0], quantity }));
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
