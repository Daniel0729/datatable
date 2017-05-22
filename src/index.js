import React from 'react';
import ReactDOM from 'react-dom';

import {compose} from 'redux';
import * as search from 'searchtabular';
import * as Table from 'reactabular-table';
import Paginator from './Paginator.jsx';
import paginate from './paginate';

var rows = [
        {id:1,title: "你是快来君王",content: "看哪!神的帐幕在我们中间,你的荣耀遍及在全地之上.那首先与末后的就是耶稣,在你里面就是永恒",reference: " ",musicsheet: " ",medialink: " "},
        {id:2,title: "Still",content: "I need still, need still.",reference: " ",musicsheet: " ", medialink: " "},
        {id:3, title: "10000 Reasons",content: "The sun comes up, it’s a new day dawning", reference: " ", musicsheet: " ", medialink: " "},
        {id:4,title: "Great Morning",content: "Thank you lord,for this great morning,thank you lord,for this new day", reference: " ", musicsheet: " ", medialink: " "},
        {id:5,title: "你是快来君王",content: "看哪!神的帐幕在我们中间,你的荣耀遍及在全地之上.那首先与末后的就是耶稣,在你里面就是永恒",reference: " ",musicsheet: " ",medialink: " "},
        {id:6,title: "Still",content: "I need still, need still.",reference: " ",musicsheet: " ", medialink: " "},
        {id:7, title: "10000 Reasons",content: "The sun comes up, it’s a new day dawning", reference: " ", musicsheet: " ", medialink: " "},
        {id:8,title: "Great Morning",content: "Thank you lord,for this great morning,thank you lord,for this new day", reference: " ", musicsheet: " ", medialink: " "},
        {id:9,title: "你是快来君王",content: "看哪!神的帐幕在我们中间,你的荣耀遍及在全地之上.那首先与末后的就是耶稣,在你里面就是永恒",reference: " ",musicsheet: " ",medialink: " "},
        {id:10,title: "Still",content: "I need still, need still.",reference: " ",musicsheet: " ", medialink: " "},
        {id:11, title: "10000 Reasons",content: "The sun comes up, it’s a new day dawning", reference: " ", musicsheet: " ", medialink: " "},
        {id:12,title: "Great Morning",content: "Thank you lord,for this great morning,thank you lord,for this new day", reference: " ", musicsheet: " ", medialink: " "},
        {id:13,title: "你是快来君王",content: "看哪!神的帐幕在我们中间,你的荣耀遍及在全地之上.那首先与末后的就是耶稣,在你里面就是永恒",reference: " ",musicsheet: " ",medialink: " "},
        {id:14,title: "Still",content: "I need still, need still.",reference: " ",musicsheet: " ", medialink: " "},
        {id:15, title: "10000 Reasons",content: "The sun comes up, it’s a new day dawning", reference: " ", musicsheet: " ", medialink: " "},
        {id:16,title: "Great Morning",content: "Thank you lord,for this great morning,thank you lord,for this new day", reference: " ", musicsheet: " ", medialink: " "},
        {id:17,title: "你是快来君王",content: "看哪!神的帐幕在我们中间,你的荣耀遍及在全地之上.那首先与末后的就是耶稣,在你里面就是永恒",reference: " ",musicsheet: " ",medialink: " "},
        {id:18,title: "Still",content: "I need still, need still.",reference: " ",musicsheet: " ", medialink: " "},
        {id:19, title: "10000 Reasons",content: "The sun comes up, it’s a new day dawning", reference: " ", musicsheet: " ", medialink: " "},
        {id:20,title: "Great Morning",content: "Thank you lord,for this great morning,thank you lord,for this new day", reference: " ", musicsheet: " ", medialink: " "},
        {id:21,title: "你是快来君王",content: "看哪!神的帐幕在我们中间,你的荣耀遍及在全地之上.那首先与末后的就是耶稣,在你里面就是永恒",reference: " ",musicsheet: " ",medialink: " "},
        {id:22,title: "Still",content: "I need still, need still.",reference: " ",musicsheet: " ", medialink: " "},
        {id:23, title: "10000 Reasons",content: "The sun comes up, it’s a new day dawning", reference: " ", musicsheet: " ", medialink: " "},
        {id:24,title: "Great Morning",content: "Thank you lord,for this great morning,thank you lord,for this new day", reference: " ", musicsheet: " ", medialink: " "},
     ];

const columns = [
  {
    property: 'title',
    header: {
      label: 'Title',
    }
  },
  {
    property: 'content',
    header: {
      label: 'Content',
    },
  },
  {
    property: 'reference',
    header: {
      label: 'Reference',
    },
  },
];

class PaginationTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchColumn: 'all',
      query: {}, // Search query
      columns,
      rows,
      pagination: { // initial pagination settings
        page: 1,
        perPage: 5
      }
    };

     this.onSelect = this.onSelect.bind(this);
  }
  render() {
    const { searchColumn, rows, columns, pagination, query } = this.state;
    const paginated = compose(
      paginate(pagination),
      search.multipleColumns({ columns, query })
    )(rows);
    const searchedRows = search.multipleColumns({
    columns: columns,
    query: query
  })(rows);
    return (
      <div>
        <div className="search-container">
          <span>Search</span>
          <search.Field
            column={searchColumn}
            query={query}
            columns={columns}
            rows={rows}
            onColumnChange={searchColumn => this.setState({ searchColumn })}
            onChange={query => this.setState({ query })}
          />
        </div>

        <Table.Provider columns={columns} className="pure-table pure-table-striped">
          <Table.Header />

          <Table.Body rows={paginated.rows} rowKey="id" />
        </Table.Provider>
        <div className="controls">
          <Paginator
            pagination={pagination}
            pages={paginated.amount}
            onSelect={this.onSelect}
          />
        </div>
      </div>
    );
  }
  onSelect(page) {
    const pages = Math.ceil(
      this.state.rows.length / this.state.pagination.perPage
    );

    this.setState({
      pagination: {
        ...this.state.pagination,
        page: Math.min(Math.max(page, 1), pages)
      }
    });
  }
};

ReactDOM.render(
  <PaginationTable />,
  document.getElementById('root')
);

