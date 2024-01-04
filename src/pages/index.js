import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';

import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';
import Contact from '@components/Contact';
import About from '@components/About';


import styles from '@styles/Page.module.scss'

import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";

function HygraphImageLoader({ src, width  }) {
  const relativeSrc = (src) => src.split('/').pop();

  return `https://media.graphassets.com/${relativeSrc(
    src
  )}`;
}

export default function Home({home, products}) {
  const {heroTitle, heroText, heroLink, heroBackground} = home;
  return (
    <Layout>
      <Head>
        <title>Moment</title>
        <meta name="description" content="Capturing and printing the perfect films." />
      </Head>

      <Container>
        <h1 className="sr-only">Moment</h1>

        <div className={styles.hero}>
          <Link href={heroLink}>
            <a>
              <div className={styles.heroContent}>
                <h2>{heroTitle}</h2>
                <p>{heroText}</p>
              </div>
              <img className={styles.heroImage} width="100%" height="auto" object-fit="contain" src={heroBackground.url} alt="" />
            </a>
          </Link>
        </div>

        <div className={styles.marquee}>
          <div className={styles.track}>
            <div>&nbsp;Explore the world&apos;s breathtaking landscapes and vibrant cityscapes
            through the lens of a passionate traveler and photographer.
            Explore the world&apos;s breathtaking landscapes and vibrant cityscapes
            through the lens of a passionate traveler and photographer.
            </div>
          </div>
        </div>

        <h2 className={styles.heading}>Featured Films</h2>

        <ul className={styles.products}>
          {products.map(product => {
            return (
              <li key={product.slug}>
                <Link href={`/products/${product.slug}`}>
                  <a>
                    <div className={styles.productImage}>
                      <Image
                        loader={HygraphImageLoader}
                        src={product.image.url}
                        loading="lazy"
                        width= "212px"
                        height= "320px"
                        objectFit="cover"
                        alt=""
                      />
                    </div>
                    <h3 className={styles.productTitle}>
                      { product.name }
                    </h3>
                    <p className={styles.productPrice}>
                      ${ product.price }
                    </p>
                  </a>
                </Link>
                <p>
                <Button
                  className="snipcart-add-item"
                  data-item-id={product.id}
                  data-item-price={product.price}
                  data-item-url={`/products/${product.slug}`}
                  data-item-image={product.image.url}
                  data-item-name={product.name}
                >
                Add to Cart
              </Button>
                </p>
              </li>
            )
          })}
        </ul>
        <About/>
        <Contact/>
      </Container>
    </Layout>
  )
}

export async function getStaticProps(){
  const client = new ApolloClient({
    uri:"https://api-us-west-2.hygraph.com/v2/clqq7rshi3me201t68al8hjkf/master",
    cache: new InMemoryCache()
  });

  const data = await client.query({
    query: gql
    `query PageHome {
      page(where: {slug: "homepage"}) {
        id
        heroLink
        heroText
        heroTitle
        name
        slug
        heroBackground {
          height
          width
          url
        }
      }
      products(where: {categories_some: {slug: "featured"}}) {
        id
        name
        price
        slug
        image {
          url
          width
          height
        }
      }
    }`
  });
  const home = data.data.page;
  const products = data.data.products;
  return {
    props:{
      home,
      products
    }

  }
}