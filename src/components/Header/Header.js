import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

import Container from '@components/Container';
import { useRouter } from 'next/router';
import { useSnipcart } from 'use-snipcart';
import styles from './Header.module.scss';

const Header = () => {
  
  const {cart = {}} = useSnipcart();
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          <Link href="/">
            <a>Moment</a>
          </Link>
        </p>
        <ul className={styles.headerLinks}>
        <li>
            <Link href="/categories/landscape">
              <a>Landscape</a>
            </Link>
          </li>
          <li>
            <Link href="/categories/city">
              <a>City</a>
            </Link>
          </li>
          <li>
            <Link href="/stores">
              <a>Find Us</a>
            </Link>
          </li>
        </ul>
        <p className={styles.headerCart}>
          <button className="snipcart-checkout">
            <FaShoppingCart />
            <span>
              ${cart.subtotal?.toFixed(2)}
            </span>
          </button>
        </p>
        <ul className={styles.headerLocales}>
          <li>
            <Link href="#">
              <a>
                ES
              </a>
            </Link>
          </li>
        </ul>
      </Container>
    </header>
  )
}

export default Header;