import uuid from 'uuid';

// ADD_EXPENSE action genrator
//Every AG needs type property to be set and return
export const addExpenseAG = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        amount,
        createdAt,
        description,
        id: uuid(),
        note
    }
});
// REMOVE_EXPENSE action genrator
export const removeExpenseAG = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
// EDIT_EXPENSE action genrator
export const editExpenseAG = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});