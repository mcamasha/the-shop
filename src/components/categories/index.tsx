import React from "react";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { compose } from "redux";
import classNames from "classnames";

import { getCategories, getActiveCategoryId } from "selectors";
import { IReduxStore, ICategory } from "Models";
import { propEq, isNil } from "ramda";

interface IStateProps {
  categories: ICategory[];
  activeCategoryId: string;
}

export interface ICategoriesOwnProps {
  params: {
    id: string;
  };
}

type TProps = IStateProps & ICategoriesOwnProps;

const Categories: React.SFC<TProps> = () => {
  const categories = useSelector((state: IReduxStore) => getCategories(state));
  const activeCategoryId = useSelector((state: IReduxStore) =>
    getActiveCategoryId(ownProps)
  );

  const renderCategory = (category: ICategory, index: number) => {
    const getActiveState = propEq("id", activeCategoryId);

    const linkClass = classNames({
      "list-group-item": true,
      active: getActiveState(category)
    });

    return (
      <Link to={`/categories/${category.id}`} className={linkClass} key={index}>
        {category.name}
      </Link>
    );
  };

  const renderAllCategory = () => {
    const linkClass = classNames({
      "list-group-item": true,
      active: isNil(activeCategoryId)
    });

    return (
      <Link to="/" className={linkClass}>
        All
      </Link>
    );
  };

  return (
    <div className="well">
      <h4>Brand</h4>
      <div className="list-group">
        {renderAllCategory()}
        {categories.map((category, index) => renderCategory(category, index))}
      </div>
    </div>
  );
};

export default compose(withRouter)(Categories);
