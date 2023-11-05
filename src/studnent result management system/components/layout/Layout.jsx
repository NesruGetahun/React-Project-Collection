import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../navigation/Header';

import styles from './Layout.module.css'
const Layout = () => {
  return (
    <div className={styles.layout}>
     <Header />
      <Outlet />
    </div>
  );
}

export default Layout