import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { getTotalBasketCount, getTotalBasketPrice } from "selectors";
import { IReduxStore } from "Models";

const BasketCart: React.FC = () => {
  const totalBasketCount: number = useSelector((state: IReduxStore) =>
    getTotalBasketCount(state)
  );
  const totalPrice: number = useSelector((state: IReduxStore) =>
    getTotalBasketPrice(state)
  );

  return (
    <div className="cart">
      <div className="dropdown">
        <Link
          to="/basket"
          id="dLabel"
          className="btn btn-inverse btn-block btn-lg"
        >
          <i className="fa fa-fa-shopping-cart" />
          <span>
            {totalBasketCount} item(s) - ${totalPrice}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BasketCart;
