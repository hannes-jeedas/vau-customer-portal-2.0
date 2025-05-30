import React, { useState, useMemo } from 'react';
import './OrderTable.css';
import { formatDateToDDMMYYYY } from '../../utils/dateFunctions';

const OrderTable = ({ orders }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filters, setFilters] = useState({
    OrderNum: '',
    PONum: '',
    OrderDate: '',
    OpenOrder: '',
    firstDelivery: '',
    NeedByDate: ''
  });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  

  // Filtering and Sorting

  const filteredAndSortedOrders = useMemo(() => {
    let filteredOrders = [...orders];

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filteredOrders = filteredOrders.filter(order =>
          String(order[key] ?? '').toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    if (sortConfig.key) {
      filteredOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    return filteredOrders;
  }, [orders, filters, sortConfig]);

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return '';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <div className="order-table-container">
      <table className="order-table">
        <thead>
          <tr>
            <th>
              <div className="header-content">
                <span onClick={() => handleSort('OrderNum')}>
                  Order ID {getSortIcon('OrderNum')}
                </span>
                <input
                  type="text"
                  value={filters.OrderNum}
                  onChange={(e) => handleFilterChange('OrderNum', e.target.value)}
                  placeholder="Filter Order ID..."
                />
              </div>
            </th>
            <th>
              <div className="header-content">
                <span onClick={() => handleSort('PONum')}>
                  PO Number {getSortIcon('PONum')}
                </span>
                <input
                  type="text"
                  value={filters.PONum}
                  onChange={(e) => handleFilterChange('PONum', e.target.value)}
                  placeholder="Filter PO Number..."
                />
              </div>
            </th>
            <th>
              <div className="header-content">
                <span onClick={() => handleSort('OrderDate')}>
                  Order Date {getSortIcon('OrderDate')}
                </span>
                <input
                  type="text"
                  value={filters.OrderDate}
                  onChange={(e) => handleFilterChange('OrderDate', e.target.value)}
                  placeholder="Filter Order Date..."
                />
              </div>
            </th>
            <th>
              <div className="header-content">
                <span onClick={() => handleSort('firstDelivery')}>
                  First Delivery {getSortIcon('firstDelivery')}
                </span>
                <input
                  type="text"
                  value={filters.firstDelivery}
                  onChange={(e) => handleFilterChange('firstDelivery', e.target.value)}
                  placeholder="Filter First Delivery..."
                />
              </div>
            </th>
            <th>
              <div className="header-content">
                <span onClick={() => handleSort('NeedByDate')}>
                  Expected Delivery {getSortIcon('NeedByDate')}
                </span>
                <input
                  type="text"
                  value={filters.NeedByDate}
                  onChange={(e) => handleFilterChange('NeedByDate', e.target.value)}
                  placeholder="Filter Expected Delivery..."
                />
              </div>
            </th>
            <th>
              <div className="header-content">
                <span onClick={() => handleSort('OpenOrder')}>
                  Status {getSortIcon('OpenOrder')}
                </span>
                <input
                  type="text"
                  value={filters.OpenOrder}
                  onChange={(e) => handleFilterChange('OpenOrder', e.target.value)}
                  placeholder="Filter Status..."
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedOrders?.map((order) => (
            <tr key={order.OrderNum}>
              <td>{order.OrderNum}</td>
              <td>{order.PONum}</td>
              <td>{formatDateToDDMMYYYY(order.OrderDate)}</td>
              <td>{/* {formatDateToDDMMYYYY(order.firstDelivery)} */} - {/* ajutine placeholder */}</td>
              <td>{formatDateToDDMMYYYY(order.NeedByDate)}</td>
              <td className={`status ${String(order.OpenOrder).toLowerCase() === 'true' ? 'processing' : 'delivered'}`}>
                {String(order.OpenOrder).toLowerCase() === 'true' ? 'Processing' : 'Delivered'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
