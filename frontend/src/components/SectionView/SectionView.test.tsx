import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import SectionView from './SectionView';
import { MemoryRouter } from 'react-router-dom';

describe('SectionView', () => {
   it('renders without error', () => {
      render(
         <MemoryRouter>
            <Provider store={store}>
               <SectionView />
            </Provider>
         </MemoryRouter>
      );
   });

   it('renders without error', () => {
      const { baseElement } = render(
         <MemoryRouter>
            <Provider store={store}>
               <SectionView />
            </Provider>
         </MemoryRouter>
      );
      // SAVE
      const inputsBefore = baseElement.querySelectorAll('input');
      expect(inputsBefore).toHaveLength(4);
      // 4 - Section Name, Course Name, Start Date, End Date
      const textareaBefore = baseElement.querySelectorAll('textarea');
      expect(textareaBefore).toHaveLength(2);
      // 2 - Section Description (hidden and normal)
      const buttons = baseElement.querySelectorAll('button');
      expect(buttons).toHaveLength(1);
      expect(buttons[0]).toHaveTextContent('SAVE');
      
   });



});


// describe('Registration', () => {
//    jest.setTimeout(7000);
//    it('renders without error', () => {
//       render(
//          <Provider store={store}>
//             <Registration />)
//          </Provider>
//       );

//       const fnameInput = screen.getByTestId('r-fname');
//       const lnameInput = screen.getByTestId('r-lname');
//       const emailinput = screen.getByTestId('r-email');
//       const passwordInput = screen.getByTestId('r-password');
//       const cpasswordInput = screen.getByTestId('r-cpassword');
//       const button = screen.getByTestId('r-button');

//       expect(fnameInput).toHaveTextContent('Name');
//       expect(lnameInput).toHaveTextContent('Surname');
//       expect(emailinput).toHaveTextContent('Email Address');
//       expect(passwordInput).toBeInTheDocument();
//       expect(cpasswordInput).toBeInTheDocument();
//       expect(button ).toBeInTheDocument();
//    });

//    it('sends form data to API service', async () => {
//       const { getByTestId } = render(
//          <Provider store={store}>
//             <Registration />)
//          </Provider>
//       );

//       const inputFirstNameDiv = screen.getByTestId('r-fname')
//       const inputFirstNameElement = inputFirstNameDiv.querySelector('input');
//       fireEvent.change(inputFirstNameElement, { target: { value: 'Jan' } });

//       const inputLastNameDiv = screen.getByTestId('r-lname')
//       const inputLastNameElement = inputLastNameDiv.querySelector('input');
//       fireEvent.change(inputLastNameElement, { target: { value: 'Nowak' } });
      
//       const inputEmailDiv = screen.getByTestId('r-email')
//       const inputEmailElement = inputEmailDiv.querySelector('input');
//       fireEvent.change(inputEmailElement, { target: { value: 'testowy@o2.pl' } });

//       const inputPasswordDiv = screen.getByTestId('r-password')
//       const inputPasswordElement = inputPasswordDiv.querySelector('input');
//       fireEvent.change(inputPasswordElement, { target: { value: 'Aaaa1234!' } });
      
//       const inputPasswordConfirmDiv = screen.getByTestId('r-cpassword')
//       const inputPasswordConfirmElement = inputPasswordConfirmDiv.querySelector('input');
//       fireEvent.change(inputPasswordConfirmElement, { target: { value: 'Aaaa1234!' } });

//       const fakePost = jest.fn();
      
//       //@ts-ignore
//       BaseService.mockImplementation(() => {
//          return {post: fakePost};
//       });

//       const button = await screen.getByTestId('r-button');
//       button.click();

//       const snackbar = await waitForElement(() => getByTestId('r-snack-success'));
//       expect(snackbar).toBeInTheDocument();

//       expect(fakePost.mock.calls[0]).toEqual(["register", {
//          name: "Jan",
//          surname: "Nowak",
//          email: "testowy@o2.pl", 
//          password: "Aaaa1234!",
//          confirmPassword: "Aaaa1234!"}]);

//    });
// });