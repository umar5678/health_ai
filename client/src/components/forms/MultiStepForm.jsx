import React, { useState } from "react";

const MultiStepForm = () => {
  const [steps, setStep] = useState({
    stepsItems: ["Profile", "Contact", "Identity", "Passport"],
    currentStep: 1, // Start at step 1
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    // ... other form fields
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    if (steps.currentStep < steps.stepsItems.length) {
      setStep({ ...steps, currentStep: steps.currentStep + 1 });
    }
  };

  const prevStep = () => {
    if (steps.currentStep > 1) {
      setStep({ ...steps, currentStep: steps.currentStep - 1 });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form Submitted Successfully!");
  };

  const renderStep = () => {
    switch (steps.currentStep) {
      case 1:
        return (
          <Profile formData={formData} handleInputChange={handleInputChange} />
        );
      case 2:
        return (
          <Contact formData={formData} handleInputChange={handleInputChange} />
        );
      case 3:
        return (
          <Identity formData={formData} handleInputChange={handleInputChange} />
        );
      case 4:
        return (
          <Passport formData={formData} handleInputChange={handleInputChange} />
        );
      default:
        return <Confirmation formData={formData} />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-0">
      <ul
        aria-label="Steps"
        className="items-center text-gray-600 font-medium md:flex"
      >
        {steps.stepsItems.map((item, idx) => (
          <li
            key={idx}
            aria-current={steps.currentStep === idx + 1 ? "step" : false}
            className="flex-1 last:flex-none flex gap-x-2 md:items-center"
          >
            <div className="flex items-center flex-col gap-x-2">
              <div
                className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${
                  steps.currentStep > idx + 1
                    ? "bg-indigo-600 border-indigo-600"
                    : "" || steps.currentStep === idx + 1
                    ? "border-indigo-600"
                    : ""
                }`}
              >
                <span
                  className={` ${
                    steps.currentStep > idx + 1
                      ? "hidden"
                      : "" || steps.currentStep === idx + 1
                      ? "text-indigo-600"
                      : ""
                  }`}
                >
                  {idx + 1}
                </span>
                {steps.currentStep > idx + 1 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : null}{" "}
                {/* Use null instead of "" for better JSX */}
              </div>
              <hr
                className={`h-12 border md:hidden ${
                  idx + 1 === steps.stepsItems.length
                    ? "hidden"
                    : "" || steps.currentStep > idx + 1
                    ? "border-indigo-600"
                    : ""
                }`}
              />
            </div>
            <div className="h-8 flex items-center md:h-auto">
              <h3
                className={`text-sm ${
                  steps.currentStep === idx + 1 ? "text-indigo-600" : ""
                }`}
              >
                {item}
              </h3>
            </div>
            <hr
              className={`hidden mr-2 w-full border md:block ${
                idx + 1 === steps.stepsItems.length
                  ? "hidden"
                  : "" || steps.currentStep > idx + 1
                  ? "border-indigo-600"
                  : ""
              }`}
            />
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        {renderStep()}

        <div className="buttons mt-4">
          {steps.currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="mr-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Previous
            </button>
          )}
          {steps.currentStep < steps.stepsItems.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const Profile = ({ formData, handleInputChange }) => (
  <div>
    <h2>Profile</h2>
    <input
      type="text"
      name="firstName"
      placeholder="First Name"
      value={formData.firstName}
      onChange={handleInputChange}
      required
    />
    <input
      type="text"
      name="lastName"
      placeholder="Last Name"
      value={formData.lastName}
      onChange={handleInputChange}
      required
    />
    {/* ... other profile fields */}
  </div>
);

const Contact = ({ formData, handleInputChange }) => (
  <div>
    <h2>Contact</h2>
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleInputChange}
      required
    />
    <input
      type="text"
      name="address"
      placeholder="Address"
      value={formData.address}
      onChange={handleInputChange}
      required
    />
    {/* ... other contact fields */}
  </div>
);

const Identity = ({ formData, handleInputChange }) => (
  <div>
    <h2>Identity</h2>
    {/* ... identity fields */}
    <input
      type="text"
      name="city"
      placeholder="City"
      value={formData.city}
      onChange={handleInputChange}
      required
    />
    <input
      type="text"
      name="zip"
      placeholder="Zip Code"
      value={formData.zip}
      onChange={handleInputChange}
      required
    />
  </div>
);

const Passport = ({ formData, handleInputChange }) => (
  <div>
    <h2>Passport</h2>
    {/* ... passport fields */}
  </div>
);

const Confirmation = ({ formData }) => (
  <div>
    <h2>Confirmation</h2>
    <pre>{JSON.stringify(formData, null, 2)}</pre>
  </div>
);

export default MultiStepForm;
