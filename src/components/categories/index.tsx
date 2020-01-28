import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { compose } from "redux";
import R from "ramda";
import classNames from "classnames";

import { getCategories, getActiveCategoryId } from "selectors";
import { IReduxStore, ICategory } from "Models";

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

const Categories: React.SFC<TProps> = ({ categories, activeCategoryId }) => {
  const renderCategory = (category: ICategory, index: number) => {
    const getActiveState = R.propEq("id", activeCategoryId);

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
      active: R.isNil(activeCategoryId)
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

const mapStateToProps = (
  state: IReduxStore,
  ownProps: ICategoriesOwnProps
) => ({
  categories: getCategories(state),
  activeCategoryId: getActiveCategoryId(ownProps)
});

export default compose(withRouter, connect(mapStateToProps, null))(Categories);
