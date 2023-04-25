import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEmployees = async () => {
      try {
        const response = await axiosPrivate.get("/employees", {
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
  }, [axiosPrivate]);

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
      <button>Logout</button>
    </div>
  );
};

export default Employees;
