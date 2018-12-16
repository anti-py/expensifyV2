import React from 'react';
import { shallow } from 'enzyme';
import moment from  'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters} from '../fixtures/filters';

let setTextFilterAG, sortByDateAG, sortByAmountAG, setStartDateAG, setEndDateAG, wrapper;

beforeEach(() => {
    setTextFilterAG = jest.fn();
    sortByDateAG = jest.fn();
    sortByAmountAG = jest.fn();
    setStartDateAG = jest.fn();
    setEndDateAG = jest.fn();
    wrapper = shallow(
        < ExpenseListFilters
            filters= {filters}
            setTextFilterAG= {setTextFilterAG}
            sortByDateAG={ sortByDateAG}
            sortByAmountAG={sortByAmountAG}
            setStartDateAG={setStartDateAG}
            setEndDateAG={setEndDateAG}
        />);
});
test('should render ExpenseListFilters corretly',()=> {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({
      filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
  });
  
  test('should handle text change', () => {
    const value = 'rent';
    wrapper.find('input').simulate('change', {
      target: { value }
    });
    expect(setTextFilterAG).toHaveBeenLastCalledWith(value);
  });
  
  test('should sort by date', () => {
    const value = 'date';
    wrapper.setProps({
      filters: altFilters
    });
    wrapper.find('select').simulate('change', {
      target: { value }
    });
    expect(sortByDateAG).toHaveBeenCalled();
  });
  
  test('should sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
      target: { value }
    });
    expect(sortByAmountAG).toHaveBeenCalled();
  });
  
  test('should handle date changes', () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
    expect(setStartDateAG).toHaveBeenLastCalledWith(startDate);
    expect(setEndDateAG).toHaveBeenLastCalledWith(endDate);
  });
  
  test('should handle date focus changes', () => {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
  });