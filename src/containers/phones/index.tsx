import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchPhones,
  loadMorePhones,
  addPhoneToBasket,
  fetchCategories
} from "actions";
import { getPhones } from "selectors";
import { IReduxStore, IPhone } from "Models";
import { take } from "ramda";

interface IProps {
  params: {
    id: string;
  };
}

const Phones = (props: IProps) => {
  const phones: IPhone[] = useSelector((state: IReduxStore) =>
    getPhones(state, props)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhones());
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPhone = (phone: IPhone, index: number) => {
    const shortDescription = `${take(60, phone.description)}...`;

    return (
      <div className="col-sm-4 col-lg-4 col-md-4 book-list" key={index}>
        <div className="thumbnail">
          <img className="img-thumbnail" src={phone.image} alt={phone.name} />
          <div className="caption">
            <h4 className="pull-right">${phone.price}</h4>
            <h4>
              <Link to={`/phones/${phone.id}`}>{phone.name}</Link>
            </h4>
            <p>{shortDescription}</p>
            <p className="itemButton">
              <button
                className="btn btn-primary"
                onClick={() => addPhoneToBasket(phone.id)}
              >
                Buy Now!
              </button>
              <Link to={`/phones/${phone.id}`} className="btn btn-default">
                More info
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="books row">
        {phones.map((phone: IPhone, index: number) =>
          renderPhone(phone, index)
        )}
      </div>
      <div className="row">
        <div className="col-md-12">
          <button
            onClick={loadMorePhones}
            className="pull-right btn btn-primary"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Phones;
