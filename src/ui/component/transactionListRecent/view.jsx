// @flow
import * as icons from 'constants/icons';
import React, { Fragment } from 'react';
import BusyIndicator from 'component/common/busy-indicator';
import Button from 'component/button';
import TransactionList from 'component/transactionList';
import RefreshTransactionButton from 'component/transactionRefreshButton';

type Props = {
  fetchTransactions: () => void,
  fetchingTransactions: boolean,
  hasTransactions: boolean,
  transactions: Array<Transaction>,
  fetchMyClaims: () => void,
};

class TransactionListRecent extends React.PureComponent<Props> {
  componentDidMount() {
    const { fetchMyClaims, fetchTransactions } = this.props;

    fetchMyClaims();
    fetchTransactions();
  }

  render() {
    const { fetchingTransactions, hasTransactions, transactions } = this.props;
    return (
      <section className="card card--section">
        <header className="card__header card__header--flat">
          <h2 className="card__title card__title--flex-between">
            {__('Recent Transactions')}
            <RefreshTransactionButton />
          </h2>
        </header>

        {fetchingTransactions && !hasTransactions && (
          <div className="card__content">
            <BusyIndicator message={__('Loading transactions')} />
          </div>
        )}

        {!fetchingTransactions && !hasTransactions && (
          <div className="card__content">
            <p className="card__subtitle">{__('No transactions... yet.')}</p>
          </div>
        )}

        {hasTransactions && (
          <Fragment>
            <div className="card__content">
              <TransactionList
                slim
                transactions={transactions}
                emptyMessage={__("Looks like you don't have any recent transactions.")}
              />
            </div>
            <div className="card__actions">
              <Button button="primary" navigate="/$/transactions" label={__('Full History')} icon={icons.HISTORY} />
            </div>
          </Fragment>
        )}
      </section>
    );
  }
}

export default TransactionListRecent;
