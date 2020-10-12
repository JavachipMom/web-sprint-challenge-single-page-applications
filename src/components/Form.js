import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";

const Form = (props) => {
  const defaultState = {
    name: "",
    size: "",
    instructions: "",
  };

  const [formState, setFormState] = useState(defaultState);
  const [post, setPost] = useState([]);
  const [errors, setErrors] = useState({ ...defaultState, terms: "" });

  let formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Please enter your name.")
      .min(2, "Name must be at least 2 characters in length"),
  });

  const inputChange = (e) => {
    e.persist();

    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })

      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormState({
      ...formState,
      [e.target.name]: value,
    });

    if (e.target.name === "name") {
      inputChange(e);
    }
  };

  const submitData = (e) => {
    e.preventDefault();
    console.log("Data was submitted");

    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        setPost(res.data);
        console.log("Successful data: ", res.data);
      })
      .catch((err) => console.log("Your error is here ", err.response));
  };

  return (
    <div className="form">
      <form onSubmit={submitData}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className="nameField"
          />
          {errors.name.length > 0 ? <p>{errors.name}</p> : null}
        </label>

        <label>
          Pizza Size:
          <select id="size" name="size" onChange={handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </label>
        <label>
          Toppings:
          <ul className="topping-list">
            <li>
              <input
                name="sausage"
                type="checkbox"
                onChange={handleChange}
                className="sausage-topping"
              />
              Sausage
            </li>
            <li>
              <input
                name="pineapple"
                type="checkbox"
                onChange={handleChange}
                className="pineapple-topping"
              />
              Pineapple
            </li>
            <li>
              <input
                name="pepperoni"
                type="checkbox"
                onChange={handleChange}
                className="pepperoni-topping"
              />
              Pepperoni
            </li>
            <li>
              <input
                name="olives"
                type="checkbox"
                onChange={handleChange}
                className="olives-topping"
              />
              Olives
            </li>
          </ul>
        </label>
        <label>
          Special Instructions:
          <input
            type="text"
            name="instructions"
            value={formState.instructions}
            onChange={handleChange}
          />
        </label>

        <button>Add To Order</button>
      </form>
    </div>
  );
};

export default Form;
