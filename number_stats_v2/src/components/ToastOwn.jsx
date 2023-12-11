import React from 'react';
import Toast from 'react-native-toast-message';

const ToastOwn = () => {
  return <Toast position="bottom" bottomOffset={60} visibilityTime={4000} />;
};

export default ToastOwn;
