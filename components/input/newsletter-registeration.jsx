'use client'

import { useRef } from 'react';
import classes from './newsletter-registeration.module.css';

function NewsletterRegistration() {

  const enteredEmail = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const  email = enteredEmail.current.value;

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    fetch('/api/register', {
      method: 'POST',
      body : JSON.stringify({email : email}),
      headers : {
        "content-type" : "application/json"
      }
    }).then(res => res.json())
    .then(data => console.log(data));
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={enteredEmail}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;