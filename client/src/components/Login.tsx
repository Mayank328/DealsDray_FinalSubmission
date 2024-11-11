import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import process from 'process'; // Import the 'process' object from the 'process' module
import React from "react";

// Form component for creating or updating employee records. (Create/Edit Employee Screen)

const API_URL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:5050'; // API URL

export default function Login() {
  localStorage.removeItem('dealsdray_employee_username');
  // Manage form data and record status.
  const [form, setForm] = useState({
    userName: "",
    Pwd: ""
  });
  const navigate = useNavigate();     // A function to navigate between routes

    // Makes a GET request to fetch the record with the given id.
    // If successful, it updates the form with the fetched record.
    // If the record doesn't exist, it navigates back to the home page.
    // Check if the route has an ID parameter.
    // Attempt to get the id from params and convert it to a string, or if it doesn't exist or undefined, set id to undefined.
      
// Updates the state with the new value,
// ensuring the form state reflects the user's input.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }



  // Handles form submission by either creating a new record or updating an existing one.
  // When either a POST or PATCH request is sent to the URL, fetch will either add a new record to the database or update an existing record in the database.
  
  // The onSubmit function is an async function that takes an event object as an argument.
  async function onSubmit(e) {
    e.preventDefault(); // Prevents the default form submission behavior, which would cause a page reload.
    // Prepare Data: The current form state is copied into a variable named person.
    const person = { ...form };

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var specialCharacterPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    // Validate email
    if (!emailPattern.test(person.userName)) {
       alert('Please enter a valid email address.');
        return;
    }

    var password = person.Pwd;
    // Validate password
    if (password.length < 6 || !specialCharacterPattern.test(password)) {
       alert('Password must be at least 6 characters long and contain at least one special character, atleast one number and atleast one capital letter.');
        return;
    }
    try {
      let response; //response from the API request.

      // Makes a PATCH request to update an existing record if isNew is false.
        response = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });

      if (!response.ok) {   // Error Handling
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        alert(response.statusText)
      }
      else{
        localStorage.setItem('dealsdray_employee_username',person.userName);
        setForm({ userName: "", Pwd: ""});
        // navigate("/view");
        navigate("/dashboard")
      }
    } catch (error) {
      console.error('A problem occurred while logging in ', error);
      setForm({ userName: "", Pwd: ""});
      navigate("/"); // Navigates back to the login page.

    }     
  }





  // Renders the form to capture employee information.
  // Title: Displays a title for the form.
  // Employee Info: Displays a section title and description for employee information.
  // Form Fields:
  // Name: Input field for the employee's name.
  // Position: Input field for the employee's position.
  // Level: Radio buttons to select the employee's level (Intern, Junior, Senior).
  // Submit Button: A button to save the employee record.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Login</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Admin Login
            </h2>

          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="userName"
                className="block text-sm font-medium leading-6 text-slate-900">
                User Name          
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                 
                  {/* onChange is react prop that get triggered when input value changes. 
                  It calls the updateForm function with the new value of the input element that trigger the event.
                  'name' is set to the current value of the input field.*/}
                  <input
                    type="text"
                    required
                    name="userName"
                    id="userName"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Email"
                    // value={form.username}
                    onChange={(e) => updateForm({ userName: e.target.value })}
                  />

                </div>
              </div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-slate-900">
                Password         
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                 
                  {/* onChange is react prop that get triggered when input value changes. 
                  It calls the updateForm function with the new value of the input element that trigger the event.
                  'name' is set to the current value of the input field.*/}
                  <input
                    type="text"
                    required
                    name="Pwd"
                    id="Pwd"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Password"
                    // value={form.pwd}
                    onChange={(e) => updateForm({ Pwd: e.target.value })}
                  />

                </div>
              </div>
            </div>

          </div> {/* End of grid */}
        </div> {/** End of bigger grid */}
        
        {/* save button */}
        <center>
        <input
          type="submit"
          value="Login"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
         </center>
      </form>
    </>
  );
}