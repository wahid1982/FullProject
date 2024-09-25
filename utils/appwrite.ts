import { mockUser, mockPosts, baseUrl } from "./mockData";
import { saveSessionData,getUserId} from "./session";


export async function signIn(data: { email: string; password: string }) {
  const { email, password } = data;
 // const deviceId = DeviceInfo.getUniqueId();

  try {
    console.log("Signing in with:", { email });
    // Prepare the API endpoint with query parameters
    const endpoint = `${baseUrl}/api/auth/login?Username=${encodeURIComponent(
      email
    )}&Password=${encodeURIComponent(password)}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type for the request
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      // Handle different HTTP status codes
      if (response.status === 401) {
        throw new Error("Invalid credentials. Please check your email and password.");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    // Parse the JSON response
    const data = await response.json();

    if(data.Success==true)
    {
      saveSessionData(
        data.User.ID,
        data.User.Name,
        data.User.Email,
        data.User.Logo,
        data.User.Code,
        data.User.Full_address,
        data.User.Phone,
        data.User.CrNo,
        data.User.Activity,
        data.User.createDate
        
      );

      return true;

    }

    if(data.Success==false)
      {
    
        return false;
  
      }

    
  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

    // Display the error message in the alert
    alert(`Error signing in: ${errorMessage}`);
    
    // Optionally, you can log the error message to the console for debugging
    console.error("Error signing in:", errorMessage);
    
    // Rethrow the error if you want the caller to handle it further
    throw new Error(errorMessage);
  }
}


export async function MeetingRoomBooking(data: { Dateavailable: string; RoomId: string; TimeId: string  }) {
  const { Dateavailable, RoomId,TimeId } = data;
 // const deviceId = DeviceInfo.getUniqueId();
 const CompId = await getUserId();
  try {  

    const queryParams = new URLSearchParams({
      bookedDate: Dateavailable,
      RoomID: RoomId,
      TimeID: TimeId,
    });
  
    if (CompId) {
      queryParams.append("Comp_Id", CompId);
    }

    // Prepare the API endpoint with query parameters
    const endpoint = `${baseUrl}/api/auth/BookMeetingRooms?${queryParams.toString()}`;
   
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      // Handle different HTTP status codes
      if (response.status === 401) {
        throw new Error("Invalid credentials. Please check your email and password.");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    // Parse the JSON response
    const data = await response.json();
      return data;

    
    
  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

    // Display the error message in the alert
   // alert(`Error signing in: ${errorMessage}`);
    
    // Optionally, you can log the error message to the console for debugging
    console.error("Error signing inxx:", errorMessage);
    
    // Rethrow the error if you want the caller to handle it further
    throw new Error(errorMessage);
  }
}



export async function MeetingRoomBooked() {
 
 // const deviceId = DeviceInfo.getUniqueId();
 const CompId = await getUserId();
  try {  

    const queryParams = new URLSearchParams();


    if (CompId) {
      queryParams.append("Comp_Id", CompId);
    }

    // Prepare the API endpoint with query parameters
    const endpoint = `${baseUrl}/api/auth/MeetingRoomBooked?${queryParams.toString()}`;
   
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      // Handle different HTTP status codes
      if (response.status === 401) {
        throw new Error("Invalid credentials. Please check your email and password.");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    // Parse the JSON response
    const data = await response.json();

    // Ensure data is an array
    if (Array.isArray(data)) {
      return data;
    } else {
      throw new Error("Unexpected response format: Data is not an array.");
    }
    
    
  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

    // Display the error message in the alert
   // alert(`Error signing in: ${errorMessage}`);
    
    // Optionally, you can log the error message to the console for debugging
    console.error("Error signing inxx:", errorMessage);
    
    // Rethrow the error if you want the caller to handle it further
    throw new Error(errorMessage);
  }
}
export async function ListMeetingRoom() { 
 
    const endpoint = `${baseUrl}/api/auth/MeetingRoom`;
     return endpoint;
  
     
}

export async function CalendarTimmer() { 
 
  const endpoint = `${baseUrl}/api/auth/CalendarTimmer`;
   return endpoint;

   
}

export async function ListOfContractData() {
 
  // const deviceId = DeviceInfo.getUniqueId();
  const CompId = await getUserId();
   try {  
 
     const queryParams = new URLSearchParams();
 
 
     if (CompId) {
       queryParams.append("Comp_Id", CompId);
     }
 
     // Prepare the API endpoint with query parameters
     const endpoint = `${baseUrl}/api/auth/ListOfContract?${queryParams.toString()}`;
    
     const response = await fetch(endpoint, {
       method: "POST",
       headers: {
         "Content-Type": "application/json", 
       },
     });
 
     // Check if the request was successful
     if (!response.ok) {
       // Handle different HTTP status codes
       if (response.status === 401) {
         throw new Error("Invalid credentials. Please check your email and password.");
       } else {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }
     }
 
     // Parse the JSON response
     const data = await response.json();
 
     // Ensure data is an array
     if (Array.isArray(data)) {
       return data;
     } else {
       throw new Error("Unexpected response format: Data is not an array.");
     }
     
     
   } catch (error) {
     // Handle errors
     const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

     console.error("Error signing inxx:", errorMessage);

     throw new Error(errorMessage);
   }
 }

 export async function fetchPriorities()
 {
  const endpoint = `${baseUrl}/api/auth/Priority`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST', // Specifies the request method as POST
      headers: {
        'Content-Type': 'application/json', // Sends the request as JSON
      },
      body: JSON.stringify({
        // Add any data you want to send in the body of the POST request here, if needed
        // If no data is required for the request, you can omit this body section or leave it empty
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Parse the response as JSON
    return data;
  } catch (error) {
    console.error('Error fetching priorities:', error);
    throw error; // Re-throw the error for higher-level error handling
  }
 }
 export async function fetchCategoryByTypes(selectedCategory: String)
 {


try {  

  const queryParams = new URLSearchParams();


  if (selectedCategory) {
    
    queryParams.append("Id", selectedCategory.toString());
  }

  // Prepare the API endpoint with query parameters
  const endpoint = `${baseUrl}/api/auth/RequestCatgories?${queryParams.toString()}`;
 
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
  });

  // Check if the request was successful
  if (!response.ok) {
    // Handle different HTTP status codes
    if (response.status === 401) {
      throw new Error("Invalid credentials. Please check your email and password.");
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  }

  // Parse the JSON response
  const data = await response.json();

  // Ensure data is an array
  if (Array.isArray(data)) {
    return data;
  } else {
    throw new Error("Unexpected response format: Data is not an array.");
  }
  
  
} catch (error) {
  // Handle errors
  const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
  console.error("Error signing inxx:", errorMessage);  
  throw new Error(errorMessage);
}

 }


 export async function fetchRequestType() 
 {
  const endpoint = `${baseUrl}/api/auth/RequestType`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST', // Specifies the request method as POST
      headers: {
        'Content-Type': 'application/json', // Sends the request as JSON
      },
      body: JSON.stringify({
        // Add any data you want to send in the body of the POST request here
        // If no data is needed, you can omit the `body` field
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Parse the response as JSON
    return data;
  } catch (error) {
    console.error('Error fetching request types:', error);
    throw error; // Re-throw the error for higher-level error handling
  }
 }
 export async function submitRequest(data: {priorityId: String; typeId: String; categoryId: String; Title: String ;Message: String})
 {
  const { priorityId, typeId,categoryId,Title,Message } = data;

  
  const CompId = await getUserId();

  try {  

    const queryParams = new URLSearchParams({});
  
    if (CompId) {
      // Only append parameters if they are defined
      if (priorityId !== undefined) {
        queryParams.append("Priority_ID", priorityId.toString());
      }
      if (categoryId !== undefined) {
        queryParams.append("Cat_ID", categoryId.toString());
      }
      if (Title !== undefined) {
        queryParams.append("Title", Title.toString());
      }
      if (Message !== undefined) {
        queryParams.append("Message", Message.toString());
      }
    
      // Append the Com_ID parameter
      queryParams.append("Com_ID", CompId);
    }

    // Prepare the API endpoint with query parameters
    const endpoint = `${baseUrl}/api/auth/SaveRequest?${queryParams.toString()}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      // Handle different HTTP status codes
      if (response.status === 401) {
        throw new Error("Invalid credentials. Please check your email and password.");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    // Parse the JSON response
    const data = await response.json();
      return data;

    
    
  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

    // Display the error message in the alert
   // alert(`Error signing in: ${errorMessage}`);
    
    // Optionally, you can log the error message to the console for debugging
    console.error("Error signing inxx:", errorMessage);
    
    // Rethrow the error if you want the caller to handle it further
    throw new Error(errorMessage);
  }


 }


 export async function GetInvoiceListView() {
 
  // const deviceId = DeviceInfo.getUniqueId();
  const CompId = await getUserId();
   try {  
 
     const queryParams = new URLSearchParams();
 
 
     if (CompId) {
       queryParams.append("CompId", CompId);
     }
 
     // Prepare the API endpoint with query parameters
     const endpoint = `${baseUrl}/api/auth/InvoicesView?${queryParams.toString()}`;
    
     const response = await fetch(endpoint, {
       method: "POST",
       headers: {
         "Content-Type": "application/json", 
       },
     });
 
     // Check if the request was successful
     if (!response.ok) {
       // Handle different HTTP status codes
       if (response.status === 401) {
         throw new Error("Invalid credentials. Please check your email and password.");
       } else {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }
     }
 
     // Parse the JSON response
     const data = await response.json();
 
     // Ensure data is an array
     if (Array.isArray(data)) {
       return data;
     } else {
       throw new Error("Unexpected response format: Data is not an array.");
     }
     
     
   } catch (error) {
     // Handle errors
     const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

     console.error("Error signing inxx:", errorMessage);

     throw new Error(errorMessage);
   }
 }
 

 export async function GetInvoiceMainView(data: { InvoiceID: string; }) {
  const {InvoiceID } = data;
  // const deviceId = DeviceInfo.getUniqueId();
  
   try {  
 
     const queryParams = new URLSearchParams();
 
 
     if (InvoiceID) {
       queryParams.append("Id", InvoiceID);
     }
 
     // Prepare the API endpoint with query parameters
     const endpoint = `${baseUrl}/api/auth/Invoice?${queryParams.toString()}`;

     const response = await fetch(endpoint, {
       method: "POST",
       headers: {
         "Content-Type": "application/json", 
       },
     });
 
     // Check if the request was successful
     if (!response.ok) {
       // Handle different HTTP status codes
       if (response.status === 401) {
         throw new Error("Invalid credentials. Please check your email and password.");
       } else {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }
     }
 
     // Parse the JSON response
     const data = await response.json();
 
     // Ensure data is an array
     if (Array.isArray(data)) {
       return data;
     } else {
       throw new Error("Unexpected response format: Data is not an array.");
     }
     
     
   } catch (error) {
     // Handle errors
     const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

     console.error("Error signing inxx:", errorMessage);

     throw new Error(errorMessage);
   }
 }


 export async function GetInvoiceDetailsView(data: { InvoiceID: string; }) {
  const {InvoiceID } = data;
  // const deviceId = DeviceInfo.getUniqueId();
  
   try {  
 
     const queryParams = new URLSearchParams();
 
 
     if (InvoiceID) {
       queryParams.append("InvId", InvoiceID);
     }
 
     // Prepare the API endpoint with query parameters
     const endpoint = `${baseUrl}/api/auth/InvoicesDetails?${queryParams.toString()}`;

     const response = await fetch(endpoint, {
       method: "POST",
       headers: {
         "Content-Type": "application/json", 
       },
     });
 
     // Check if the request was successful
     if (!response.ok) {
       // Handle different HTTP status codes
       if (response.status === 401) {
         throw new Error("Invalid credentials. Please check your email and password.");
       } else {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }
     }
 
     // Parse the JSON response
     const data = await response.json();
 
     // Ensure data is an array
     if (Array.isArray(data)) {
       return data;
     } else {
       throw new Error("Unexpected response format: Data is not an array.");
     }
     
     
   } catch (error) {
     // Handle errors
     const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

     console.error("Error signing inxx:", errorMessage);

     throw new Error(errorMessage);
   }
 }