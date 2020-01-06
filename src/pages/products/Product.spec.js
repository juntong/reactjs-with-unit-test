import { mount } from 'enzyme';
import React from 'react';
import { Product } from './Product';

describe('Product', () => {
  let props;
  let wrapper;

  const setUp = props => {
    return mount(<Product {...props} />);
  };

  beforeEach(() => {
    props = {
      history: {
        push: jest.fn()
      },
      products: [
        {
          id: 1,
          name: 'product 1'
        },
        {
          id: 2,
          name: 'product 2'
        }
      ]
    };
    wrapper = setUp(props);
  });

  afterEach(() => {
    wrapper = '';
  });

  it('should render correctly when products have data', () => {
    props.products.forEach(product => {
      expect(wrapper.find('li#product-' + product.id).text()).toEqual(
        product.name
      );
    });
  });

  it('should redirect to product detail correctly when click product list', () => {
    wrapper.find('li#product-' + props.products[0].id).simulate('click');

    expect(props.history.push).toHaveBeenCalledWith(
      '/product/detail/' + props.products[0].id
    );
  });
});
