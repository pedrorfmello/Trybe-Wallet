import React from 'react';
import '../index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <p>
          Feito com
          {' '}
          <span role="img" aria-label="Heart">❤️</span>
          {' '}
          por Pedro Mello.
        </p>
      </footer>
    );
  }
}

export default Footer;
