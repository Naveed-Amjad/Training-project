// library imports
import { useNavigate } from 'react-router-dom';
// component imports
import ReactButton from '../../button';
import FilterDropdown from '../../utils/filtersComponent';
import UserCard from './UserCard';
import image422 from '../../../assets/image422.jpg'
// Redux imports

// style imports
import './userHome.css';
// import Login from '../../../container/auth/Login';

//
const UserHome = () => {
  const token = true;
  const nav = useNavigate();
  return (
    <div className=''>
      <div className='filters'>
        <div className='filter_divs justify-content-center'><span className='heading'>Heading</span></div>
        <div className='filter_divs'>
          <FilterDropdown style={{ width: '90px', height: '35px', marginLeft: '16px' }} title='Size' />
          <FilterDropdown style={{ width: '90px', height: '35px', marginLeft: '16px' }} title='Color' />
          <FilterDropdown style={{ width: '90px', height: '35px', marginLeft: '16px' }} title='Price' />
        </div>
        <div className='filter_divs '>
          <h6 className='mt-2 ms-2'>Sorting</h6>
          <FilterDropdown style={{ width: '250px', height: '35px', marginLeft: '26px' }} title='Price' />
        </div>
        <div className='filter_divs'>
          <h6 className='mt-2 ms-2'>Search <input className='custom-search-bar' type='text' placeholder='search by name' /></h6>
        </div>
      </div>
      <div style={{ paddingTop: '130px' }} className='cards_div'>
        <div className='cards_side'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((data, index) => (
            <UserCard key={index} />
          ))}
        </div>
        <div className='details_dev'>
          <div className='pic_buttons'>
            <div className='image'>
              <img src={image422} />
            </div>
            <div className='buttons_side'>
              <div className='text_div'>
                Cargo Trousers for Men - 6 Pocket Trousers - 6 Pocket Cargo Trouser
              </div>
              <div className='colors_div'>
                <h6>Color: </h6>
                <div className='colors'>
                  <div className='color_img_div'>
                    <div style={{ height: '28px', width: '28px', background: '#155724', padding: '6px' }}></div>
                  </div>
                  <div className='color_img_div'>
                    <div style={{ height: '28px', width: '28px', background: '#AAA', padding: '6px' }}></div>
                  </div>
                  <div className='color_img_div'>
                    <div style={{ height: '28px', width: '28px', background: '#1B1E21', padding: '6px' }}></div>
                  </div>
                  <div className='color_img_div'>
                    <div style={{ height: '28px', width: '28px', background: '#231579', padding: '6px' }}></div>
                  </div>
                  <div className='color_img_div'>
                    <div style={{ height: '28px', width: '28px', background: '#740F0F', padding: '6px' }}></div>
                  </div>
                </div>
                <div className='size'>
                  <h6>Size: </h6>
                  <div className='size_div'>
                    <div className='size_div_child'>
                      <div style={{ height: '28px', width: '28px', padding: '6px' }}>XS</div>
                    </div>
                    <div className='size_div_child'>
                      <div style={{ height: '28px', width: '28px', padding: '6px' }}>S</div>
                    </div>
                    <div className='size_div_child'>
                      <div style={{ height: '28px', width: '28px', padding: '6px' }}>M</div>
                    </div>
                    <div className='size_div_child'>
                      <div style={{ height: '28px', width: '28px', padding: '6px' }}>L</div>
                    </div>
                    <div className='size_div_child'>
                      <div style={{ height: '28px', width: '28px', padding: '6px' }}>XL</div>
                    </div>
                    <div className='size_div_child'>
                      <div style={{ height: '28px', width: '28px', padding: '6px' }}>2XL</div>
                    </div>
                    <div className='size_div_child'>
                      <div style={{ height: '28px', width: '28px', padding: '6px' }}>3XL</div>
                    </div>
                  </div>
                </div>
                <div className='price_div'>
                  <span style={{ fontSize: '18px' }}>Price: <span style={{ color: '#007BFF', fontSize: '24px' }}>$00.00</span> </span>
                </div>
              </div>
            </div>
          </div>
          <div className='carousel'>Carouse</div>
          <div className='quantity'>
            <h6>Quantity: </h6>
            <div className='d-flex'>
              <span className='sign'>-</span>
              <span className='number_span px-4 pt-1'>2</span>
              <span className='sign'>+</span>
            </div>
          </div>
          <ReactButton className='cart_btn' placeholder="Add to Cart" onclick={() => token ? nav('/shopingbag') : nav('/login')} />
        </div>
      </div>
    </div>
  );
}

export default UserHome;
