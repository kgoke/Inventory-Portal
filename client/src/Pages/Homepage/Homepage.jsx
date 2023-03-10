import React from "react";
import { ReactComponent as ReactLogo } from "../../images/homephoto.svg";
import "./Homepage.css";

function Homepage() {
  return (
    <div className="home-page">
      <section>
      <h1>Welcome to Inventory-Portal</h1>
      <br/>
      <p>
        Welcome to Inventory-Portal, a webapp designed to act as a
        contact point between a supplying company and its vendors.
      </p>
      <br/>
      <p>
        Our app is
        built using the latest in web development technologies such as ReactJS,
        NodeJS, ExpressJS, and MySQL, ensuring a seamless user experience for
        both the suppliers and vendors.
      </p>
      <br/>
      <p>
        The app allows vendors to view all available products at their
        fingertips, with the ability to create a personalized shopping cart and
        generate a bill in a matter of clicks. On the other hand, the supplying
        company has access to admin privileges, including the ability to delete
        products, add new products, and even delete users.
      </p>
      <br/>
      <p>
        In addition, the supplying company also has access to a comprehensive
        dashboard that provides valuable insights into their stock, such as how
        many products they have and the total cost of all items. With this
        information, they can make informed decisions that will positively
        impact their business.
      </p>
      </section>
      <ReactLogo className="logo" />
    </div>
  );
}

export default Homepage;
