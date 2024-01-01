import styles from './About.module.scss';
import Link from 'next/link';


const About= () => {
    return (
      <div className={styles.AboutContainer}>
        <section className={styles.aboutSection}>
          <div className={styles.textContent}>
            <h2>About Us</h2>
            <p>
              We are a small group of passionate photographers who share a love for exploration
              and capturing the world&apos;s beauty through both film and professional cameras.
              Our journey takes us to the far corners of the globe, where we seek to freeze
              moments in time and share the unique perspectives we encounter.
            </p>
            <p>
            We prioritize craftsmanship and quality, ensuring that every film and print 
            reflects the passion we infuse into our work. To deliver this unparalleled experience 
            to our cherished customers worldwide, we offer international shipping. Anticipate your 
            order at your doorstep within 10-15 days, as we strive to bring our creations to you with 
            utmost care and efficiency. Elevate your space with our exceptional film prints, and let 
            the world&apos;s beauty grace your surroundings.
            </p>
            <Link href="/stores">
                <button className={styles.location}>Find Us Here</button>
            </Link>
          </div>
          <div className={styles.imageContent}>
            <div className={styles.imageColumn}>
                <div className={styles.imageFirst}>
                    <img className={styles.imageCover} src="https://images.unsplash.com/photo-1660866837676-7211e74f1d78?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image 1"/>
                </div>
            </div>
            <div className={styles.imageColumn}>
                <div className={styles.imageResponsive}>
                    <img className={styles.imageCover} src="https://images.unsplash.com/photo-1660866837676-7211e74f1d78?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image 1"/>
                </div>
                <div className={styles.image}>
                    <img className={styles.imageCover} src="https://images.unsplash.com/photo-1569777470686-7dd400b54820?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image 2"/>
                </div>
                <div className={styles.image}>
                    <img className={styles.imageCover} src="https://images.unsplash.com/photo-1591631253582-ae00b2bfdeca?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image 3"/>
                </div>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default About;