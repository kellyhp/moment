import { useForm } from "react-hook-form";
import styles from './Contact.module.scss';


const Contact = () => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    console.log("~ e", e);
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      {/* HEADINGS */}
        <div>
            <h2 className={styles.contactTitle}>
                Contact Us 
            </h2>
          <div className={styles.contactEdit}>
          </div>
        </div>
    
    <p>
        Whether you have specific product inquiries, want to make a booking, or simply have questions about our services, our team is ready to provide you with the information you need. 
        Contact us through the provided channels, and we&apos;ll ensure a prompt and helpful response. 
        Thank you for considering us for your needs—we look forward to hearing from you!
    </p>

      {/* FORM & IMAGE */}
      <div className={styles.contactForm}>
        <div
          className={styles.contactImageFlex}>
          <img className={styles.contactImage}
          src="https://images.unsplash.com/photo-1574882559683-c27d3f9ab471?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="contact" />
        </div>

 
          <form
            target="_blank"
            onSubmit={onSubmit}
            action="https://formsubmit.co/54f39f21075c92c03552d96247291da0"
            method="POST"
          >
            <input
              className={styles.input}
              type="text"
              placeholder="NAME"
              {...register("name", {
                required: true,
                maxLength: 100,
              })}
            />
            {errors.name && (
              <p className={styles.paragraph}>
                {errors.name.type === "required" && "This field is required."}
                {errors.name.type === "maxLength" && "Max length is 100 char."}
              </p>
            )}

            <input
              className={styles.input}
              type="text"
              placeholder="EMAIL"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {errors.email && (
              <p className={styles.paragraph}>
                {errors.email.type === "required" && "This field is required."}
                {errors.email.type === "pattern" && "Invalid email address."}
              </p>
            )}

            <textarea
              className={styles.input}
              name="message"
              placeholder="MESSAGE"
              rows="4"
              cols="50"
              {...register("message", {
                required: true,
                maxLength: 2000,
              })}
            />
            {errors.message && (
              <p className={styles.paragraphRound}>
                {errors.message.type === "required" &&
                  "This field is required."}
                {errors.message.type === "maxLength" &&
                  "Max length is 2000 char."}
              </p>
            )}

            <button
              className={styles.submit}
              type="submit"
            >
              Contact Us
            </button>
          </form>
      </div>
    </section>
  );
};

export default Contact;
