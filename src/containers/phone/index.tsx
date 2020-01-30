import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { compose, toPairs, pick } from "ramda";
import { Link } from "react-router-dom";

import { getPhoneById } from "selectors";
import { fetchPhoneById, addPhoneToBasket } from "actions";
import BasketCart from "components/basketCart";
import { IReduxStore } from "Models";

export interface IProps {
  params: {
    id: string;
  };
}

const Phone = (props: IProps) => {
  const phone = useSelector((state: IReduxStore) =>
    getPhoneById(state, state.phonePage.id)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhoneById(props.params.id));
  }, []);

  const renderFields = () => {
    const columnFields: Array<[string, string]> = compose(
      toPairs,
      pick(["cpu", "camera", "size", "weight", "display", "battery", "memory"])
    )(phone);

    return columnFields.map(([key, value]) => (
      <div className="column" key={key}>
        <div className="ab-details-title">
          <p>{key}</p>
        </div>
        <div className="ab-details-info">{value}</div>
      </div>
    ));
  };

  const renderContent = () => {
    return (
      <div className="thumbnail">
        <div className="row">
          <div className="col-md-6">
            <img className="img-thumbnail" src={phone.image} alt={phone.name} />
          </div>
          <div className="col-md-6">{renderFields()}</div>
        </div>
        <div className="caption-full">
          <h4 className="pull-right">${phone.price}</h4>
          <h4>{phone.name}</h4>
          <p>{phone.description}</p>
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div>
        <p className="lead">Quick shop</p>
        <BasketCart />
        <div className="form-group">
          <h1>{phone.name}</h1>
          <h2>${phone.price}</h2>
        </div>
        <Link to="/" className="btn btn-info btn-block">
          Back to store
        </Link>
        <button
          type="button"
          className="btn btn-success btn-block"
          onClick={() => addPhoneToBasket(phone.id)}
        >
          Add to cart
        </button>
      </div>
    );
  };

  return (
    <div className="view-container">
      <div className="container">
        <div className="row">
          <div className="col-md-9">{phone && renderContent()}</div>
          <div className="col-md-3">{phone && renderSidebar()}</div>
        </div>
      </div>
    </div>
  );
};

export default Phone;
