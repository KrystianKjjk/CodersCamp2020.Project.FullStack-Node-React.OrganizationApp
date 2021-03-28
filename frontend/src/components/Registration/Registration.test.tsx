import React from 'react';
import Registration from './Registration';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import BaseService from '../../app/baseService';

jest.mock('../../app/baseService', () => jest.fn());

describe('Registration', () => {
   it('renders without error', async () => {
      render(
         <Provider store={store}>
            <Registration />)
         </Provider>
      );

      const fnameInput = await screen.getByTestId('r-fname');
      const lnameInput = await screen.getByTestId('r-lname');
      const emailinput = await screen.getByTestId('r-email');
      const passwordInput = await screen.getByTestId('r-password');
      const cpasswordInput = await screen.getByTestId('r-cpassword');
      const button = await screen.getByTestId('r-button');

      expect(fnameInput).toHaveTextContent('First Name');
      expect(lnameInput).toHaveTextContent('Last Name');
      expect(emailinput).toHaveTextContent('Email Address');
      expect(passwordInput).toBeInTheDocument();
      expect(cpasswordInput).toBeInTheDocument();
      expect(button ).toBeInTheDocument();
   });

   it('sends form data to API service', async () => {
      render(
         <Provider store={store}>
            <Registration />)
         </Provider>
      );

      const inputFirstNameDiv = await screen.getByTestId('r-fname')
      const inputFirstNameElement = inputFirstNameDiv.querySelector('input');
      fireEvent.change(inputFirstNameElement, { target: { value: 'Jan' } });

      const inputLastNameDiv = await screen.getByTestId('r-lname')
      const inputLastNameElement = inputLastNameDiv.querySelector('input');
      fireEvent.change(inputLastNameElement, { target: { value: 'Nowak' } });
      
      const inputEmailDiv = await screen.getByTestId('r-email')
      const inputEmailElement = inputEmailDiv.querySelector('input');
      fireEvent.change(inputEmailElement, { target: { value: 'testowy@o2.pl' } });

      const inputPasswordDiv = await screen.getByTestId('r-password')
      const inputPasswordElement = inputPasswordDiv.querySelector('input');
      fireEvent.change(inputPasswordElement, { target: { value: 'Aaaa1234!' } });
      
      const inputPasswordConfirmDiv = await screen.getByTestId('r-cpassword')
      const inputPasswordConfirmElement = inputPasswordConfirmDiv.querySelector('input');
      fireEvent.change(inputPasswordConfirmElement, { target: { value: 'Aaaa1234!' } });

      const fakePost = jest.fn();
      
      //@ts-ignore
      BaseService.mockImplementation(() => {
         return {post: fakePost};
      });

      const button = await screen.getByTestId('r-button');
      button.click();

      expect(fakePost.mock.calls[0]).toEqual(["register", {
         name: "Jan",
         surname: "Nowak",
         email: "testowy@o2.pl", 
         password: "Aaaa1234!",
         confirmPassword: "Aaaa1234!"}]);

   });
});