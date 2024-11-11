import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import process from 'process'; // Import the 'process' object from the 'process' module

// Form component for creating or updating employee records. (Create/Edit Employee Screen)

const API_URL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:5050'; // API URL

export default function RecordForm() {
  // Manage form data and record status.
  const [form, setForm] = useState({
    f_id:"",

    f_Image:"",
  
    f_Name:"",
  
    f_Email:"",
  
    f_Mobile:"",
  
    f_Designation:"",
  
    f_Gender:"",
  
    f_Course:"",
  
    f_Createddate:"",
  });
  const [isNew, setIsNew] = useState(true); // Flag to check if it's a new record or existing
  const params = useParams();         // Stores the route parameters, specifically the id of the record.
  const navigate = useNavigate();     // A function to navigate between routes

    // Makes a GET request to fetch the record with the given id.
    // If successful, it updates the form with the fetched record.
    // If the record doesn't exist, it navigates back to the home page.
    // Check if the route has an ID parameter.
    // Attempt to get the id from params and convert it to a string, or if it doesn't exist or undefined, set id to undefined.
      
      

// useEffect to fetch an existing record when the component mounts, if an id is provided in the URL. 
    useEffect(() => {
      async function fetchData() {
        const id = params.f_id?.toString() || undefined; // get the id from the URL params
        if(!id) return;   //if id is undefined exit the fetchData function early without making fetch request.
        setIsNew(false); // and set isNew to false.
        // Makes a GET request to fetch the record with the given id.
        const response = await fetch(`${API_URL}/record/${id}`);
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        // Parse the JSON response
          const record = await response.json();
          // If the record doesn't exist, navigate back to the home page.
          if (!record) {
            console.warn(`Record with id ${id} not found`);
            navigate("/");
            return;
          }

        setForm(record); // Set the form state with fetched record data
    } // end of fetchData()
    fetchData(); // Call the fetchData function
    return; 
  }, [params.f_id, navigate]); // trigger the effect when the id changes or when the navigate function changes.



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
    try {
      let response; //response from the API request.
      
      // API Request: Makes a POST request to create a new record if isNew is true.
      if (isNew) {
        // fetch request to create a new record
        response = await fetch(`${API_URL}/record`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } 

      // Makes a PATCH request to update an existing record if isNew is false.
      else {
        response = await fetch(`${API_URL}/record/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {   // Error Handling
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred adding or updating a record: ', error);
      alert('A problem occurred adding or updating a record: ', error);
    }     
    // Cleanup: Clears the form after submission.
    finally {
      // Clear the form and navigate back to home page
      setForm({ f_id: "", f_Image: "", f_Name: "",  f_Email: "", f_Mobile: "", f_Designation: "", f_Gender: "", f_Course: "", f_Createddate: ""});
      navigate("/"); // Navigates back to the home page.
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
      <h3 className="text-lg font-semibold p-4">Create/Update Employee Record</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Employee Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be visible to Employee 
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">

          <div className="sm:col-span-4">
              <label
                htmlFor="f_Name"
                className="block text-sm font-medium leading-6 text-slate-900">
                Name          
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="f_Name"
                    id="f_Name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="First Last"
                    value={form.f_Name}
                    onChange={(e) => updateForm({ f_Name: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="f_Email"
                className="block text-sm font-medium leading-6 text-slate-900">
                Email          
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="f_Email"
                    id="f_Email"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Email"
                    value={form.f_Email}
                    onChange={(e) => updateForm({ f_Email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="f_Mobile"
                className="block text-sm font-medium leading-6 text-slate-900">
                Mobile Number          
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="f_Mobile"
                    id="f_Mobile"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Mobile Number"
                    value={form.f_Mobile}
                    onChange={(e) => updateForm({ f_Mobile: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="f_Image"
                className="block text-sm font-medium leading-6 text-slate-900">
                Image
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="file"
                    accept=".png,.jpg"
                    name="f_Image"
                    id="f_Image"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Employee Image"
                    value={form.f_Image}
                    onChange={(e) => updateForm({ f_Image: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
            <label
                htmlFor="f_Gender"
                className="block text-sm font-medium leading-6 text-slate-900">
                Gender
              </label>
              <fieldset className="mt-4">
                <legend className="sr-only">Position Options</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      id="f_Male"
                      name="f_Male"
                      type="radio"
                      value="Male"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.f_Gender === "Male"}
                      onChange={(e) => updateForm({ f_Gender: e.target.value })} />
                    <label
                      htmlFor="positionIntern"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4">
                      Male
                    </label>
                    <input
                      id="f_Female"
                      name="f_Female"
                      type="radio"
                      value="Female"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.f_Gender === "Female"}
                      onChange={(e) => updateForm({ f_Gender: e.target.value })}
                    />
                    <label
                      htmlFor="f_Female"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4">
                      Female
                    </label>
                  </div>
                </div>
              </fieldset>              
            </div>

            <div>
              <fieldset className="mt-4">
    <legend className="sr-only">Designation Options</legend>
    <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
      <div className="flex items-center">
        <label htmlFor="f_Designation" className="block text-sm font-medium leading-6 text-slate-900 mr-4">
          Designation
        </label>
        <select
          id="f_Designation"
          name="f_Designation"
          className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-slate-600 focus:border-slate-600 sm:text-sm rounded-md"
          value={form.f_Designation}
          onChange={(e) => updateForm({ f_Designation: e.target.value })}
        >
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>
    </div>
  </fieldset>              
</div>
<div>
<label htmlFor="f_Designation" className="block text-sm font-medium leading-6 text-slate-900 mr-4">
          Course
        </label>
  <fieldset className="mt-4">
    <legend className="sr-only">Course Options</legend>
    <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
      <div className="flex items-center">
        <div className="flex items-center">
          <input
            id="f_MCA"
            name="f_MCA"
            type="checkbox"
            value="MCA"
            className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
            // checked={form.f_Course.includes("MCA")}
            onChange={(e) => updateForm({ f_Course: e.target.value(e) })} />
          <label
            htmlFor="f_MCA"
            className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4">
            MCA
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="f_BCA"
            name="f_BCA"
            type="checkbox"
            value="BCA"
            className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
            // checked={form.f_Course.includes("BCA")}
            onChange={(e) => updateForm({ f_Course: e.target.value })} />
          <label
            htmlFor="f_BCA"
            className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4">
            BCA
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="f_BSC"
            name="f_BSC"
            type="checkbox"
            value="BSC"
            className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
            // checked={form.f_Course.includes("BSC")}
            onChange={(e) => updateForm({ f_Course: e.target.value })} />
          <label
            htmlFor="f_BSC"
            className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4">
            BSC
          </label>
        </div>
      </div>
    </div>
  </fieldset>              
</div>
          </div> {/* End of grid */}
        </div> {/** End of bigger grid */}
        
        {/* save button */}
        <input
          type="submit"
          value="Save Employee Record"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />

      </form>
    </>
  );
}