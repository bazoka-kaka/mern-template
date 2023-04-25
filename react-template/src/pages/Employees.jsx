import { useEffect, useState } from "react";
import axios from "../api/axios";
import useRefreshToken from "../hooks/useRefreshToken";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEmployees = async () => {
      try {
        const response = await axios.get("/employees", {
          signal: controller.signal,
        });
        console.log(response?.data);
        isMounted && setEmployees(response.data);
      } catch (err) {
        if (err?.message !== "canceled") console.error(err?.message);
      }
    };

    getEmployees();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h1>Employees List</h1>
      {employees?.length ? (
        <ul>
          {employees?.map((emp, i) => (
            <li key={i}>
              {emp.firstname} {emp.lastname}
            </li>
          ))}
        </ul>
      ) : (
        <p>No employees found</p>
      )}
      <button onClick={refresh}>Refresh</button>
    </div>
  );
};

export default Employees;
