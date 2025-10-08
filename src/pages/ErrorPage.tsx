import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
    
    const error = useRouteError();

    let title = "An Error Occurred!";
    let message = "Something went wrong!";

    if (isRouteErrorResponse(error)) {
        // error: RouteErrorResponse
        if (error.status === 404) {
          title = "Not Found 404";
          message = "Could not find resource or page.";
        } else if (error.status === 500) {
          // data string ya da obje olabilir; güvenli oku
          message =
            typeof error.data === "string"
              ? error.data
              : (error.data as { message?: string })?.message ??
                error.statusText ??
                "Internal server error";
        } else {
          message = error.statusText || message;
        }
      } else if (error instanceof Error) {
        // Loader/Action veya komponent içinde throw edilen klasik Error
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }

      

    return (
        
            <div className="App">
              <h1>{title}</h1>
              <p>{message}</p>
              <a href="/">Home Page</a>
              
          </div>
        
       
    )
}