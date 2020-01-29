import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { searchPhone } from "actions";

const Search = () => {
  const [value, setValue] = useState<string>("");
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(searchPhone(value));
  };

  return (
    <div className="well blosd">
      <h3 className="lead">Quick shop</h3>
      <div className="input-group">
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} type="text" className="form-control" />
        </form>
        <span className="input-group-btn">
          <button className="btn btn-default">
            <span className="glyphicon glyphicon-search" />
          </button>
        </span>
      </div>
    </div>
  );
};

export default Search;
