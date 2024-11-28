import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectDetails.css";
import axios from "axios";
import StripeCheckOut from "react-stripe-checkout";

async function makePayment(token, project) {
  project.price = 1000;
  const body = {
    token,
    project,
  };

  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await fetch(`http://localhost:80/api/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Payment successful!");
    } else {
      alert("Payment failed: " + result.message);
    }
  } catch (error) {
    console.error("Payment Error:", error);
    alert("Something went wrong!");
  }
}

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:80/api/projects/${id}`, {
        withCredentials: true,
      })
      .then((res) => setProject(res.data.data))
      .catch((err) => console.log("Error: ", err));
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-details-container">
      <div className="project-details-information">
        <div className="project-details-header">
          <h4 className="project-details-title">{project.title}</h4>
          <p className="project-details-description">{project.description}</p>
        </div>
        <div className="project-details-content">
          <div className="project-details-image">
            <img src={project.image} alt={project.title} />
          </div>
          <div className="project-details-right">
            <div className="green-line"></div>
            <div className="funds-required">
              ${project.investmentGoal?.toLocaleString("en-US")}
            </div>
            <div className="funds-collected">
              Funds Collected as of today: $
              {project.fundsRaised?.toLocaleString("en-US")}
            </div>
            <div className="project-details-creator">
              <div className="user-profile">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>
              </div>
              <div className="user-name">{project?.creator?.name}</div>
            </div>
            <div className="project-details-category">
              <i>Category: {project.category}</i>
            </div>
            <div
              className="back-project-button"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "3px",
              }}
            >
              <StripeCheckOut
                stripeKey="pk_test_51PvBFe05I4IB0TZI9T7rJ0D9nLpp7DlNhRZeGmKqc0wYyVByjV4j3tZbIKh3UMq8rZf9EJGmKf5O0d5JEkjiXvgo00dPiTi6Z9"
                token={(token) => makePayment(token, project)}
                name={project?.title}
                amount={100000} // Adjust to project.investmentGoal * 100 if dynamic
                currency="PKR"
                label="Invest Now"
                description={`Invest in ${project?.title}`}
                image={project.image}
              >
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "white",
                    fontSize: "1.1rem",
                  }}
                >
                  Back this project
                </button>
              </StripeCheckOut>
            </div>
          </div>
        </div>
        <div className="related-projects mb-5">
          <h4 className="mt-5 ms-3">Related Projects</h4>
          {/* {get all the projects of the same category only 3 projects not more than that} */}
        </div>
      </div>
    </div>
  );
}
