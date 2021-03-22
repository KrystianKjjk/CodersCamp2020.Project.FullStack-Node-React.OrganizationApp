import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Counter from './Counter';

test('increments after click +', async () => {
    render(
        <Provider store={store}>
        <Counter />
        </Provider>
    );
    
    const countDisplay = await screen.findByLabelText('Count');
    expect(countDisplay.textContent).toBe('0');
    const plusBtn = await screen.findByLabelText('Increment value');
    userEvent.click(plusBtn);
    expect(countDisplay.textContent).toBe('1');
});
