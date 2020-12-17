import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import schema from '@client/helpers/schema/messages';
import { createMessage } from '@client/helpers/api/messages';
import {
  errors as serverErrors, statusCodes, alertSuccessMessage, routes,
} from '@client/helpers/constants';

const { OK } = statusCodes;
const { SERVER_CONNECTION } = serverErrors;
const { FAQ } = routes;

class Contact extends Component {
  constructor() {
    super();

    this.state = {
      alert: {
        status: 0,
        message: '',
      },
    };
  }

  componentDidMount = () => {
    document.title = 'Coding Blog | Kontakt';
  };

  validation = (values) => {
    const { error } = schema.validate(values, { abortEarly: false });

    return error?.details.reduce((prev, { context, message }) => {
      const errors = { ...prev };
      errors[context.label] = message;

      return errors;
    }, {});
  }

  sendForm = async (value, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    try {
      const { status } = await createMessage(value);

      if (status === OK) {
        this.setState({
          alert: {
            status,
            message: alertSuccessMessage,
          },
        }, () => {
          setSubmitting(false);
          resetForm();
        });
      }
    } catch ({ request = {}, response = {} }) {
      const { status } = request;
      const { data } = response;
      const message = status ? (data?.message || data) : SERVER_CONNECTION;

      this.setState({
        alert: { status, message },
      }, () => {
        setSubmitting(false);
      });
    }
  };

  render = () => {
    const { sendForm, validation } = this;
    const { alert = {} } = this.state;
    const { status = 0, message = '' } = alert;
    const fieldClass = (className, error, touched) => `${className}${error && touched ? ' invalid' : ''}${!error && touched ? ' valid' : ''}`;

    return (
      <section className="contact-page container py-5">
        <header className="text-center">
          <h2 className="font-weight-bold text-uppercase text-primary h3 mb-3">
            Masz pytanie? Napisz do nas
          </h2>
        </header>
        <article>
          <p className="text-center mb-5">
            Zanim jednak napiszesz do nas, upewnij się, że Twoje pytanie nie zostało już zadane
            przez kogoś innego a jego odpowiedź nie znajduje się na{' '}
            <Link to={FAQ} title="Przejdź do strony">
              tej stronie
            </Link>
            . Jeżeli nie udało Ci się znaleźć odpowiedzi na nurtujące Cię pytania, skorzystaj z
            poniższego formularza.
          </p>
          <Formik
            initialValues={{
              name: '', email: '', subject: '', content: '', terms_accepted: false,
            }}
            validate={validation}
            onSubmit={sendForm}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="form-row">
                  <div className="form-group col-12 col-md-6">
                    <label htmlFor="name">Imię</label>
                    <Field
                      type="text"
                      className={fieldClass('form-control', errors.name, touched.name)}
                      id="name"
                      name="name"
                      placeholder="Jak masz na imię?"
                    />
                    <ErrorMessage component="div" name="name" className="invalid-feedback" />
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      className={fieldClass('form-control', errors.email, touched.email)}
                      id="email"
                      name="email"
                      placeholder="Jaki jest Twój email?"
                    />
                    <ErrorMessage component="div" name="email" className="invalid-feedback" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Temat</label>
                  <Field
                    type="text"
                    className={fieldClass('form-control', errors.subject, touched.subject)}
                    id="subject"
                    placeholder="Jaki jest temat wiadomość?"
                    name="subject"
                  />
                  <ErrorMessage component="div" name="subject" className="invalid-feedback" />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Treść</label>
                  <Field
                    as="textarea"
                    className={fieldClass('form-control no-resize', errors.content, touched.content)}
                    id="content"
                    rows="4"
                    placeholder="O co chcesz zapytać?"
                    name="content"
                    aria-describedby="contentHelp"
                  />
                  <ErrorMessage component="div" name="content" className="invalid-feedback" />
                </div>
                <div className="form-group form-check custom-control custom-checkbox mb-0">
                  <Field
                    type="checkbox"
                    className={fieldClass('form-check-input custom-control-input', errors.terms_accepted, touched.terms_accepted)}
                    id="terms_accepted"
                    name="terms_accepted"
                  />
                  <label className="form-check-label custom-control-label" htmlFor="terms_accepted">
                    Zanim wyślesz wiadomość musisz potwierdzić, że zapoznałeś/zapoznałaś się z{' '}
                    <Link
                      to="/regulamin"
                      title="Przejdź do regulaminu"
                      className="pointer-events-all"
                    >
                      regulaminem
                    </Link>{' '}
                    i akceptujesz jego warunki.
                  </label>
                  <ErrorMessage component="div" name="terms_accepted" className="invalid-feedback text-center" />
                </div>
                <div className="form-group text-center mb-0">
                  <button
                    type="submit"
                    className="contact-page__button btn btn-primary"
                    title={isSubmitting ? 'Wysyłanie wiadomości' : 'Wyślij wiadomość'}
                    disabled={isSubmitting}
                  >
                    <span className="mr-2">
                      {isSubmitting ? 'Wysyłanie' : 'Wyślij'}
                    </span>
                    <FontAwesomeIcon
                      icon={isSubmitting ? faCircleNotch : faPaperPlane}
                      spin={isSubmitting}
                    />
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {(message && (
            <div className={`alert alert-${status === OK ? 'success' : 'danger'} mt-3 mb-0`} role="alert">
              {message}
            </div>
          ))}
        </article>
      </section>
    );
  }
}

export default Contact;
