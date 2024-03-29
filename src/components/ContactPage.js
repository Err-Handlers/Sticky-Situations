import swal from "sweetalert";
import { useState } from "react";

const ContactPage = ({ navigate }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");

  const contactHandler = async (event) => {
    event.preventDefault();

    setFirstName("");
    setLastName("");
    setEmail("");
    setSelectedOption("");
    setMessage("");
    swal({
      text: "Thank you for contacting us!",
    });
    navigate("/products");
  };
  return (
    <div className="container">
      <div className=" text-center mt-5 ">
        <h1 className="contactTitle">CONTACT US</h1>
      </div>
      <div className="row">
        <div className="col-lg-7 mx-auto">
          <div className="card mt-2 mx-auto p-4 bg-light">
            <div className="card-body bg-light">
              <div className="inner-container">
                <form onSubmit={contactHandler} id="contact-form" role="form">
                  <div className="controls">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="form_name">First name</label>
                          <input
                            id="form_name"
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="First Name"
                            required="required"
                            data-error="Firstname is required."
                            onChange={(event) =>
                              setFirstName(event.target.value)
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="form_lastname">Last Name</label>
                          <input
                            id="form_lastname"
                            type="text"
                            name="surname"
                            className="form-control"
                            placeholder="Last Name"
                            required="required"
                            data-error="Lastname is required."
                            onChange={(event) =>
                              setLastName(event.target.value)
                            }
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="form_email">Email</label>
                          <input
                            id="form_email"
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            required="required"
                            data-error="Valid email is required."
                            onChange={(event) => setEmail(event.target.value)}
                          ></input>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="form_need">
                            Specify your request{" "}
                          </label>
                          <select
                            id="form_need"
                            name="need"
                            className="form-control"
                            required="required"
                            data-error="Please specify your need."
                            onChange={(event) =>
                              setSelectedOption(event.target.value)
                            }
                          >
                            <option value="" selected disabled>
                              --Select Your Request--
                            </option>
                            <option>General Question</option>
                            <option>Request a Sticker</option>
                            <option>Request Order Status</option>
                            <option>Leave Feedback</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="form_message">Message</label>
                          <textarea
                            id="form_message"
                            name="message"
                            className="form-control"
                            placeholder="Message"
                            rows="4"
                            required="required"
                            data-error="Please, leave us a message."
                            onChange={(event) => setMessage(event.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-md-12 message-btn-container">
                        <input
                          type="submit"
                          className="contact-us-btn"
                          value="Send Message"
                        ></input>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
