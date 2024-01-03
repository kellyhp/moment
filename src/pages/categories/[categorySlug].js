import Head from 'next/head'
import Link from 'next/link';
import Layout from '@components/Layout';
import Header from '@components/Header';
import Container from '@components/Container';
import Button from '@components/Button';
import Image from 'next/image';

import styles from '@styles/Page.module.scss';

import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";

function HygraphImageLoader({ src, width }) {
  const relativeSrc = (src) => src.split('/').pop();

  return `https://media.graphassets.com/${relativeSrc(
    src
  )}`;
}

export default function Category({category, products}) {
  return (
    <Layout>
      <Head>
        <title>{category.name}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Container>
        <div className={styles.headerDiv}>
          <h1>{category.name}</h1>
        </div>
        <p>From the serene tranquility of natural landscapes to the vibrant energy of bustling city streets, 
          our curated collection reflects the awe-inspiring moments that make travel a transformative experience.
          Here are a collection of photos available for print! </p>

        <h2>Products</h2>
        <ul className={styles.products}>
          {products.map(product => {
            return (
              <li key={product.id}>
                <Link href={`/products/${product.slug}`}>
                  <a>
                    <div className={styles.productImage}>
                      <Image
                       loader={HygraphImageLoader}
                        src={product.image.url}
                        loading="lazy"
                        width= "424px"
                        height= "640px"
                        objectFit="cover"
                       alt=""
                      />
                    </div>
                    <h3 className={styles.productTitle}>
                      { product.name }
                    </h3>
                    <p className={styles.productPrice}>
                      ${ product.price.toFixed(2) }
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
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: 'https://api-us-west-2.hygraph.com/v2/clqq7rshi3me201t68al8hjkf/master',
    cache: new InMemoryCache()
  });

  const data = await client.query({
    query: gql`
      query PageCategory($slug: String = "") {
        category(where: {slug: $slug}) {
          id
          name
          slug
          products {
            id
            image {
              height
              width
              url
            }
            name
            price
            slug
          }
        }
      }
    `,
    variables: {
      slug: params.categorySlug
    }
  });

  const category = data.data.category;

  return {
    props: {
      category,
      products: category.products
    }
  }
}

export async function getStaticPaths(){
  const client = new ApolloClient({
    uri:"https://api-us-west-2.hygraph.com/v2/clqq7rshi3me201t68al8hjkf/master",
    cache: new InMemoryCache()
  });

  const data = await client.query({
    query: gql`
      query PageCategories {
        categories {
          id
          slug
        }
      }

    `
  });

  const paths = data.data.categories.map(category => {
    return {
      params: {
        categorySlug: category.slug
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}