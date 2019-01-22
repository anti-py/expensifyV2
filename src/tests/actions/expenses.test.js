import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
            addExpenseAG, 
            editExpenseAG, 
            removeExpenseAG, 
            setExpensesAG, 
            startAddExpenseAG,
            startRemoveExpenseAG, 
            startSetExpensesAG
        } from '../../actions/expensesAG';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({ id, description, amount, note, createdAt}) => {
        expenseData[id] = { description, amount, note, createdAt }
    });
    database.ref('expense').set(expenseData).then(() => done());//we are using done for creating
});
const createMockStore = configureMockStore([thunk]);

test('This should setup remove expense action object', () => {
    const action = removeExpenseAG({id: 'abc11810'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'abc11810'
    })
});

test('This should setup remove expense from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[2].id;
    store.dispatch(startRemoveExpenseAG({ id })).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test('This should test edit expense action object', () => {
    const result = editExpenseAG('abc18110',{ description: 'Nov JIO bill' });
    expect(result).toEqual({
        type: 'EDIT_EXPENSE',
        id : 'abc18110',
        updates: {
            description: 'Nov JIO bill'
        }
    });
});

test('This shuld setup add expense object with provided values', () => {
    const result = addExpenseAG(expenses[2]);
    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'mouse purchase',
        amount: 34,
        note: 'this one is good',
        createdAt: 1000
        };

    store.dispatch(startAddExpenseAG(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense : {
                id: expect.any(String),
                ...expenseData
            }
        });

        //checking the data with firebase
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');//this returns a pormise chain
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();//require as this block of operation is async in nature 
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };

    store.dispatch(startAddExpenseAG({})).then(() => {//pass empty obj as we are testing defaults
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense : {
                id: expect.any(String),
                ...expenseDefaults
            }
        });

        //checking the data with firebase
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');//this returns a pormise chain
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();//require as this block of operation is async in nature 
    }); 
});


test('This shuld setup set expense action object with data', () => {
    const result = setExpensesAG(expenses);
    expect(result).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});