export const getUserFromLocalStorage = () => {
    const userId = localStorage.getItem('id');
    const userToken = localStorage.getItem('token');
    const userType = localStorage.getItem('type');
    
    return {userId, userToken, userType};
  }
