import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({ collection, addItem }) => {
  console.log('[CollectionItem]', collection);
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${collection.imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{collection.name}</span>
        <span className="price">{collection.price}</span>
      </div>
      <CustomButton onClick={() => addItem(collection)} inverted>
        ADD TO CART
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CollectionItem);
