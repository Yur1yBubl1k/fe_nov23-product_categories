/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const SORT_ROMA = 'Roma';
const SORT_ANNA = 'Anna';
const SORT_MAX = 'Max';
const SORT_JOHN = 'John';

function findCategories(id) {
  return categoriesFromServer.find(category => category.id === id);
}

function findUsers(id) {
  return usersFromServer.find(user => user.id === id);
}

function filterByUsers(arrayProducts, sortUser) {
  let copyProducts = [...arrayProducts];

  if (sortUser) {
    copyProducts = copyProducts.filter(
      product => product.user.name === sortUser,
    );
  }

  return copyProducts;
}

function filterByInputFunc(products, filterInput) {
  const standartFilterInput = filterInput.trim().toLowerCase();
  let copyProducts = [...products];

  if (standartFilterInput) {
    copyProducts = copyProducts.filter(product =>
      // eslint-disable-next-line implicit-arrow-linebreak
      product.name.toLowerCase().includes(standartFilterInput));
  }

  return copyProducts;
}

const products = productsFromServer.map(product => ({
  ...product,
  category: findCategories(product.categoryId), // find by product.categoryId
  user: findUsers(findCategories(product.categoryId).ownerId), // find by category.ownerId
}));

export const App = () => {
  const [sortUser, setSortUser] = useState('');
  const [filterInput, setFilterInput] = useState('');

  const filterUsers = filterByUsers(products, sortUser);
  const filterByInput = filterByInputFunc(filterUsers, filterInput);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                onClick={() => {
                  setSortUser('');
                }}
                data-cy="FilterAllUsers"
                href="#/"
                className={classNames({ 'is-active': sortUser === '' })}
              >
                All
              </a>

              <a
                onClick={() => {
                  setSortUser(SORT_ROMA);
                }}
                data-cy="FilterUser"
                href="#/"
                className={classNames({ 'is-active': sortUser === SORT_ROMA })}
              >
                Roma
              </a>

              <a
                onClick={() => {
                  setSortUser(SORT_ANNA);
                }}
                data-cy="FilterUser"
                href="#/"
                className={classNames({ 'is-active': sortUser === SORT_ANNA })}
              >
                Anna
              </a>

              <a
                onClick={() => {
                  setSortUser(SORT_MAX);
                }}
                data-cy="FilterUser"
                href="#/"
                className={classNames({ 'is-active': sortUser === SORT_MAX })}
              >
                Max
              </a>

              <a
                onClick={() => {
                  setSortUser(SORT_JOHN);
                }}
                data-cy="FilterUser"
                href="#/"
                className={classNames({ 'is-active': sortUser === SORT_JOHN })}
              >
                John
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={(event) => {
                    setFilterInput(event.target.value);
                  }}
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={`${filterInput}`}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {filterInput !== '' && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      onClick={() => {
                        setFilterInput('');
                      }}
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Grocery
              </a>

              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Drinks
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Fruits
              </a>
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Electronics
              </a>
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Clothes
              </a>
            </div>

            <div className="panel-block">
              <a
                onClick={() => {
                  setFilterInput('');
                  setSortUser('');
                }}
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>
        <div className="box table-container">
          {filterByInput.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      ID
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Product
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-down" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Category
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-up" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      User
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {filterByInput.map(product => (
                  <tr key={product.id} data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.name}</td>
                    <td data-cy="ProductCategory">{`${product.category.icon} - ${product.category.title}`}</td>

                    <td
                      data-cy="ProductUser"
                      className={
                        product.user.sex === 'm'
                          ? 'has-text-link'
                          : 'has-text-danger'
                      }
                    >
                      {product.user.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
