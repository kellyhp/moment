import Head from 'next/head'
import Layout from '@components/Layout';
import Header from '@components/Header';
import Container from '@components/Container';
import Button from '@components/Button';
import Image from 'next/image';

import styles from '@styles/Product.module.scss';

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


export default function Product({product}) {
  return (
    <Layout>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={`Find ${product.name} at Moments`} />
      </Head>

      <Container>
        <div className={styles.productWrapper}>
          <div className={styles.productImage}>
            <Image
             loader={HygraphImageLoader}
             src={product.image.url}
             width= "424px"
             height= "640px"
             objectFit="cover"
             alt=""
            />
          </div>
          <div className={styles.productContent}>
            <h1>{product.name}</h1>
            <div className={styles.productDescription} dangerouslySetInnerHTML={{
              __html: product.description?.html
            }} />
            <p className={styles.productPrice}>
              ${product.price}
            </p>
            <p className={styles.productBuy}>
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
          </div>
        </div>
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
      query PageProduct($slug: String) {
        product(where: {slug: $slug}) {
          id
          image {
            height
            url
            width
          }
          name
          price
          description {
            html
          }
          slug
        }
      }
    `,
    variables: {
      slug: params.productSlug
    }
  });

  const product = data.data.product;

  return {
    props: {
      product
    }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function getStaticPaths(){
  const client = new ApolloClient({
    uri:"https://api-us-west-2.hygraph.com/v2/clqq7rshi3me201t68al8hjkf/master",
    cache: new InMemoryCache()
  });

  const data = await client.query({
    query: gql
    `query PageProducts {
      products{
        name
        price
        slug
        image {
          height
          url
          width
        }
      }
    }`
  });
  const paths = await Promise.all(
    data.data.products.map(async (product) => {
      // Add a delay (adjust the milliseconds as needed)
      await delay(500); // Example: 500 milliseconds delay between requests
      
      return {
        params: {
          productSlug: product.slug,
        },
      };
    })
  );


  return {
    paths,
    fallback: false
  }
}
