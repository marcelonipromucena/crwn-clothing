import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({ collection }) => (
  <div className="collection-preview">
    <h1 className="title">{collection.title.toUpperCase()}</h1>
    <div className="preview">
      {collection.items
        .filter((item, index) => index < 4)
        .map((item) => (
          <CollectionItem key={item.id} collection={item} />
          // <div key={item.id}>{item.name}</div>
        ))}
    </div>
  </div>
);

export default CollectionPreview;
