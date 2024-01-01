import styles from './Footer.module.scss';
import { useState } from 'react';

const Footer = ({ ...rest }) => {
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your newsletter signup logic here
    console.log('Subscribed with email:', email);
    // You may want to send the email to your backend or a newsletter service
    setEmail('');
  };
  return (
    <footer className={styles.footer} {...rest}>
      <div>
        <div>
          <h2>Subscribe to Our Newsletter</h2>
          <p>Stay up-to-date with the latest news and offers.</p>
          <form className={styles.newsletter} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
            <button className={styles.submit} type="submit">Subscribe</button>
          </form>
        </div>
        <p>
          &copy;  2023 - Kelly Phan
        </p>
      </div>
    </footer>
  )
}

export default Footer;