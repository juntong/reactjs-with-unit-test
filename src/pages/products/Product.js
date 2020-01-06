import React from 'react';

export const Product = props => {
  const goTo = productId => {
    props.history.push('/product/detail/' + productId);
  };

  return (
    <div>
      <ul>
        {props.products.map(product => (
          <li
            key={product.id}
            id={'product-' + product.id}
            onClick={goTo(product.id)}
          >
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
