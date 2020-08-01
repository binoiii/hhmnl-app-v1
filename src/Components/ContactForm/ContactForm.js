import React, { useState, useEffect } from "react";
import "./ContactForm.css";
const ContactForm = ({ exitContactForm }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    document.addEventListener("keydown", exitContactForm);
    return () => {
      document.removeEventListener("keydown", exitContactForm);
    };
  });

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...userData }),
    }).catch((error) => alert(error));

    e.preventDefault();
  };

  return (
    <div className="Contact__cont">
      <form onSubmit={handleSubmit}>
        <h3>let's collaborate</h3>
        <div className="NameEmail__cont">
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email Address"
          />
        </div>
        <div className="Message_cont">
          <textarea
            type="text"
            name="message"
            value={userData.message}
            onChange={handleChange}
            placeholder="Send us your thoughts"
          />
        </div>
        <div className="Buttons__cont">
          <button type="submit">Send</button>
          <button type="button" onClick={exitContactForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
