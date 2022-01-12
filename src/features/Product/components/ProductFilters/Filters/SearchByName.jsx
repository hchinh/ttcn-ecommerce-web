import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchByName.module.css';

SearchByName.propTypes = {
  onChange: PropTypes.func,
};

function SearchByName({ onChange }) {
  const handleSearch = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      <form className={styles.filter_products} onSubmit={handleSearch}>
        <div className={styles.formdiv}>
          <input
            type="text"
            className={styles.filterproducts__input}
            name="q"
            placeholder=""
          />
          <label className={styles.form_label}>Search</label>
        </div>
      </form>
    </div>
  );
}

export default SearchByName;
