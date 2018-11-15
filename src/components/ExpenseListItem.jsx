import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numral from 'numeral';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (//as dispatch is on props 
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>
            {numeral(amount).format('$0,0.00')} - 
            {moment(createdAt).createdAt('MMMM Do, YYYY')}
        </p>
    </div>
);

export default ExpenseListItem;