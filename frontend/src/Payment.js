import StripeCheckOut from "react-stripe-checkout";

function Payment() {
  // Write original project name here(Dynamically)
  const projectName = "Devsinc";
  // Write original price that user wants to invest here. Store price that user wants to invest in project in state and then use here
  const priceToInvest = 300;
  // Project image url comes here.(Saved on cloudinary)
  const projectImageURL =
    "https://res.cloudinary.com/dy6ixoi99/image/upload/v1732519761/UpStarters/hrii4rjghe096yw0se7f.jpg";

  const project = {
    name: projectName,
    price: priceToInvest,
  };

  async function makePayment(token) {
    const body = {
      token,
      project,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const result = await fetch(`${process.env.REACT_APP_BACKENDURL}/api/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    return result;
  }

  return (
    <div>
      <StripeCheckOut
        stripeKey="pk_test_51PvBFe05I4IB0TZI9T7rJ0D9nLpp7DlNhRZeGmKqc0wYyVByjV4j3tZbIKh3UMq8rZf9EJGmKf5O0d5JEkjiXvgo00dPiTi6Z9"
        token={makePayment}
        name={projectName}
        amount={priceToInvest * 100}
        image={projectImageURL}
        currency="PKR"
        label="Invest Now"
        description={`Invest ${priceToInvest} in ${projectName}`}
      >
        <button>Invest Now</button>
      </StripeCheckOut>
    </div>
  );
}

export default Payment;
