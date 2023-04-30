import React from 'react';
import Container from 'react-bootstrap/Container';
import FooterFile from './FooterFile';
import HeaderFile from './HeaderFile';

const Layout = ({ children }) => {
    return (
        <div>

            <HeaderFile />

            <Container className='container-box'>{children}</Container>

            <FooterFile />
        </div>
    )
}
export default Layout;