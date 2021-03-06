import React, { useEffect, useState } from 'react';
import ProductInfor from './components/ProductInfor/ProductInfor';
import { Link } from 'react-router-dom';
import ProductRelated from './components/ProductRelated/ProductRelated';
import styles from './ProductDetail.module.css';
import NavBar from './components/Navbar/NavBar';
import Footer from 'features/Product/components/Footer/Footer';
import ClipLoader from 'react-spinners/ClipLoader';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail(props) {
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getApi = `https://ttcn-ecommerce-app.herokuapp.com/api/products/${id}`;
      axios.get(getApi).then((response) => {
        setProduct(response.data);
      });
      setLoading(false);
    }
  }, [id]);
  return (
    <React.Fragment>
      {loading ? (
        <div className={styles.sweet_loading}>
          <ClipLoader color={'#F5A623'} loading={loading} size={40} />
          <span>Please Wait</span>
        </div>
      ) : (
        <React.Fragment>
          <NavBar />
          <div className={styles.container_productDetails}>
            <div className={styles.grid__row}>
              <div className={styles.grid__column5}>
                <div className={styles.back_btn}>
                  <Link to={'/'} className={styles.btn_back}>
                    <i class="fas fa-arrow-left"></i>
                    Back
                  </Link>
                </div>
                <img
                  src={product?.thumbnail}
                  alt=""
                  className={styles.product_img}
                />
              </div>
              <div className={styles.grid__column5}>
                <ProductInfor />
              </div>
              <div className={styles.RelatedWapper}>
                <ProductRelated />
              </div>
            </div>
          </div>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default ProductDetail;
