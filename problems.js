const PROBLEMS = [
  {
    id: 1,
    title: "Find Duplicate Emails",
    difficulty: "Easy",
    category: "Aggregation",
    companies: ["Google", "Amazon"],
    acceptance: 72,
    tags: ["GROUP BY", "HAVING", "COUNT"],
    description: `<h3>Table: <code>Person</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>id</td><td>int</td></tr>
<tr><td>email</td><td>varchar</td></tr>
</table>
<p><code>id</code> is the primary key for this table.</p>
<p>Write a query to find all duplicate emails in the <code>Person</code> table.</p>
<p><strong>Example:</strong></p>
<table>
<tr><th>id</th><th>email</th></tr>
<tr><td>1</td><td>a@example.com</td></tr>
<tr><td>2</td><td>b@example.com</td></tr>
<tr><td>3</td><td>a@example.com</td></tr>
</table>
<p><strong>Expected Output:</strong></p>
<table>
<tr><th>email</th></tr>
<tr><td>a@example.com</td></tr>
</table>`,
    starter: "",
    solution: `SELECT email
FROM Person
GROUP BY email
HAVING COUNT(*) > 1;`,
    hint: "Group the rows by email and use HAVING to filter groups with more than one occurrence."
  },
  {
    id: 2,
    title: "Second Highest Salary",
    difficulty: "Easy",
    category: "Subquery",
    companies: ["Amazon", "Facebook", "Apple"],
    acceptance: 65,
    tags: ["DISTINCT", "ORDER BY", "LIMIT", "OFFSET"],
    description: `<h3>Table: <code>Employee</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>id</td><td>int</td></tr>
<tr><td>salary</td><td>int</td></tr>
</table>
<p><code>id</code> is the primary key for this table.</p>
<p>Write a query to find the second highest distinct salary from the <code>Employee</code> table. If there is no second highest salary, return <code>NULL</code>.</p>
<p><strong>Example:</strong></p>
<table>
<tr><th>id</th><th>salary</th></tr>
<tr><td>1</td><td>100</td></tr>
<tr><td>2</td><td>200</td></tr>
<tr><td>3</td><td>300</td></tr>
</table>
<p><strong>Expected Output:</strong></p>
<table>
<tr><th>second_highest_salary</th></tr>
<tr><td>200</td></tr>
</table>`,
    starter: "",
    solution: `SELECT MAX(salary) AS second_highest_salary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);`,
    hint: "Find the maximum salary that is less than the overall maximum salary."
  },
  {
    id: 3,
    title: "Customers Who Never Order",
    difficulty: "Easy",
    category: "Joins",
    companies: ["Amazon", "Netflix"],
    acceptance: 74,
    tags: ["LEFT JOIN", "NULL", "IS NULL"],
    description: `<h3>Table: <code>Customers</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
</table>
<p><code>id</code> is the primary key for this table.</p>
<h3>Table: <code>Orders</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>id</td><td>int</td></tr>
<tr><td>customer_id</td><td>int</td></tr>
</table>
<p><code>id</code> is the primary key for this table. <code>customer_id</code> is a foreign key referencing <code>Customers.id</code>.</p>
<p>Write a query to find all customers who have never placed an order.</p>
<p><strong>Expected Output columns:</strong> <code>name</code></p>`,
    starter: "",
    solution: `SELECT c.name
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customer_id
WHERE o.id IS NULL;`,
    hint: "Use a LEFT JOIN from Customers to Orders and filter where the Orders side is NULL."
  },
  {
    id: 4,
    title: "Employees Earning More Than Their Managers",
    difficulty: "Medium",
    category: "Joins",
    companies: ["Google", "Microsoft"],
    acceptance: 71,
    tags: ["SELF JOIN", "WHERE"],
    description: `<h3>Table: <code>Employee</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>salary</td><td>int</td></tr>
<tr><td>manager_id</td><td>int</td></tr>
</table>
<p><code>id</code> is the primary key for this table. <code>manager_id</code> references <code>id</code> in the same table.</p>
<p>Write a query to find employees who earn more than their managers. Return the employee's name.</p>
<p><strong>Expected Output columns:</strong> <code>employee</code></p>`,
    starter: "",
    solution: `SELECT e.name AS employee
FROM Employee e
JOIN Employee m ON e.manager_id = m.id
WHERE e.salary > m.salary;`,
    hint: "Join the Employee table to itself by matching the employee's manager_id to the manager's id."
  },
  {
    id: 5,
    title: "Total Revenue Per Product",
    difficulty: "Beginner",
    category: "Aggregation",
    companies: ["Shopify", "Amazon"],
    acceptance: 78,
    tags: ["SUM", "GROUP BY", "JOIN"],
    description: `<h3>Table: <code>Products</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>product_id</td><td>int</td></tr>
<tr><td>product_name</td><td>varchar</td></tr>
</table>
<p><code>product_id</code> is the primary key for this table.</p>
<h3>Table: <code>Sales</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>sale_id</td><td>int</td></tr>
<tr><td>product_id</td><td>int</td></tr>
<tr><td>quantity</td><td>int</td></tr>
<tr><td>price</td><td>numeric</td></tr>
</table>
<p><code>sale_id</code> is the primary key. <code>product_id</code> references <code>Products.product_id</code>.</p>
<p>Write a query to find the total revenue (<code>quantity * price</code>) for each product. Order the results by total revenue descending.</p>
<p><strong>Expected Output columns:</strong> <code>product_name</code>, <code>total_revenue</code></p>`,
    starter: "",
    solution: `SELECT p.product_name, SUM(s.quantity * s.price) AS total_revenue
FROM Products p
JOIN Sales s ON p.product_id = s.product_id
GROUP BY p.product_name
ORDER BY total_revenue DESC;`,
    hint: "Join the two tables, then GROUP BY product name and SUM the quantity times price."
  },
  {
    id: 6,
    title: "Top 3 Highest Paid Employees",
    difficulty: "Medium",
    category: "Subquery",
    companies: ["Meta", "Stripe"],
    acceptance: 69,
    tags: ["ORDER BY", "LIMIT", "DISTINCT", "IN"],
    description: `<h3>Table: <code>Employees</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>department</td><td>varchar</td></tr>
<tr><td>salary</td><td>int</td></tr>
</table>
<p><code>id</code> is the primary key for this table.</p>
<p>Write a query to return the top 3 highest paid employees. If there are ties, return all employees with those salaries.</p>
<p><strong>Expected Output columns:</strong> <code>name</code>, <code>salary</code></p>`,
    starter: "",
    solution: `SELECT name, salary
FROM Employees
WHERE salary IN (
  SELECT DISTINCT salary FROM Employees ORDER BY salary DESC LIMIT 3
)
ORDER BY salary DESC;`,
    hint: "First find the top 3 distinct salaries using a subquery, then select all employees whose salary is in that set."
  },
  {
    id: 7,
    title: "Count Users by Country",
    difficulty: "Beginner",
    category: "Aggregation",
    companies: ["Uber", "Airbnb"],
    acceptance: 82,
    tags: ["COUNT", "GROUP BY", "ORDER BY"],
    description: `<h3>Table: <code>Users</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>user_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>country</td><td>varchar</td></tr>
<tr><td>signup_date</td><td>date</td></tr>
</table>
<p><code>user_id</code> is the primary key for this table.</p>
<p>Write a query to count the number of users in each country. Order the results by user count descending.</p>
<p><strong>Expected Output columns:</strong> <code>country</code>, <code>user_count</code></p>`,
    starter: "",
    solution: `SELECT country, COUNT(*) AS user_count
FROM Users
GROUP BY country
ORDER BY user_count DESC;`,
    hint: "Use GROUP BY on country and COUNT(*) to get the totals."
  },
  {
    id: 8,
    title: "Find Gmail Users",
    difficulty: "Beginner",
    category: "String Functions",
    companies: ["Google", "Salesforce"],
    acceptance: 79,
    tags: ["LIKE", "WHERE", "String Matching"],
    description: `<h3>Table: <code>Users</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>user_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>email</td><td>varchar</td></tr>
</table>
<p><code>user_id</code> is the primary key for this table.</p>
<p>Write a query to find all users whose email address ends with <code>@gmail.com</code>. Return the name and email, ordered by name ascending.</p>
<p><strong>Expected Output columns:</strong> <code>name</code>, <code>email</code></p>`,
    starter: "",
    solution: `SELECT name, email
FROM Users
WHERE email LIKE '%@gmail.com'
ORDER BY name ASC;`,
    hint: "Use the LIKE operator with a wildcard (%) before the domain to match emails ending with @gmail.com."
  },
  {
    id: 9,
    title: "Average Order Value",
    difficulty: "Easy",
    category: "Aggregation",
    companies: ["Shopify", "DoorDash"],
    acceptance: 77,
    tags: ["AVG", "ROUND", "GROUP BY", "HAVING"],
    description: `<h3>Table: <code>Orders</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>order_id</td><td>int</td></tr>
<tr><td>customer_id</td><td>int</td></tr>
<tr><td>order_date</td><td>date</td></tr>
<tr><td>total_amount</td><td>numeric</td></tr>
</table>
<p><code>order_id</code> is the primary key for this table.</p>
<p>Write a query to find the average order value per customer. Round the result to 2 decimal places. Only include customers with more than 2 orders.</p>
<p><strong>Expected Output columns:</strong> <code>customer_id</code>, <code>avg_order_value</code></p>`,
    starter: "",
    solution: `SELECT customer_id, ROUND(AVG(total_amount), 2) AS avg_order_value
FROM Orders
GROUP BY customer_id
HAVING COUNT(*) > 2;`,
    hint: "Group by customer_id, use AVG and ROUND, then filter with HAVING on the count of orders."
  },
  {
    id: 10,
    title: "Products Never Sold",
    difficulty: "Easy",
    category: "Joins",
    companies: ["Amazon", "Walmart"],
    acceptance: 73,
    tags: ["LEFT JOIN", "IS NULL"],
    description: `<h3>Table: <code>Products</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>product_id</td><td>int</td></tr>
<tr><td>product_name</td><td>varchar</td></tr>
<tr><td>price</td><td>numeric</td></tr>
</table>
<p><code>product_id</code> is the primary key for this table.</p>
<h3>Table: <code>Sales</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>sale_id</td><td>int</td></tr>
<tr><td>product_id</td><td>int</td></tr>
<tr><td>sale_date</td><td>date</td></tr>
</table>
<p><code>sale_id</code> is the primary key. <code>product_id</code> references <code>Products.product_id</code>.</p>
<p>Write a query to find all products that have never been sold.</p>
<p><strong>Expected Output columns:</strong> <code>product_name</code>, <code>price</code></p>`,
    starter: "",
    solution: `SELECT p.product_name, p.price
FROM Products p
LEFT JOIN Sales s ON p.product_id = s.product_id
WHERE s.sale_id IS NULL;`,
    hint: "LEFT JOIN Products to Sales and filter where the Sales side is NULL."
  },
  {
    id: 11,
    title: "Employees in Multiple Departments",
    difficulty: "Easy",
    category: "Aggregation",
    companies: ["Microsoft", "Oracle"],
    acceptance: 70,
    tags: ["GROUP BY", "HAVING", "COUNT", "DISTINCT"],
    description: `<h3>Table: <code>Assignments</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>employee_id</td><td>int</td></tr>
<tr><td>employee_name</td><td>varchar</td></tr>
<tr><td>department</td><td>varchar</td></tr>
</table>
<p>There is no primary key; an employee can appear in multiple departments.</p>
<p>Write a query to find employees who are assigned to more than one department.</p>
<p><strong>Expected Output columns:</strong> <code>employee_name</code>, <code>department_count</code></p>`,
    starter: "",
    solution: `SELECT employee_name, COUNT(DISTINCT department) AS department_count
FROM Assignments
GROUP BY employee_id, employee_name
HAVING COUNT(DISTINCT department) > 1;`,
    hint: "Group by employee and count the distinct departments. Use HAVING to filter for more than one."
  },
  {
    id: 12,
    title: "Orders in a Date Range",
    difficulty: "Beginner",
    category: "Date Functions",
    companies: ["Stripe", "Square"],
    acceptance: 81,
    tags: ["BETWEEN", "DATE", "WHERE"],
    description: `<h3>Table: <code>Orders</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>order_id</td><td>int</td></tr>
<tr><td>customer_name</td><td>varchar</td></tr>
<tr><td>order_date</td><td>date</td></tr>
<tr><td>amount</td><td>numeric</td></tr>
</table>
<p><code>order_id</code> is the primary key for this table.</p>
<p>Write a query to find all orders placed between January 1, 2024 and March 31, 2024 (inclusive). Order by order date ascending.</p>
<p><strong>Expected Output columns:</strong> <code>order_id</code>, <code>customer_name</code>, <code>order_date</code>, <code>amount</code></p>`,
    starter: "",
    solution: `SELECT order_id, customer_name, order_date, amount
FROM Orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-03-31'
ORDER BY order_date ASC;`,
    hint: "Use the BETWEEN operator to filter the order_date column for the given date range."
  },
  {
    id: 13,
    title: "Combine Active and Inactive Users",
    difficulty: "Easy",
    category: "Set Operations",
    companies: ["LinkedIn", "Twitter"],
    acceptance: 75,
    tags: ["UNION", "SELECT"],
    description: `<h3>Table: <code>ActiveUsers</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>user_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>email</td><td>varchar</td></tr>
</table>
<h3>Table: <code>InactiveUsers</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>user_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>email</td><td>varchar</td></tr>
</table>
<p>Write a query to combine all users from both tables into a single result set with no duplicates. Include a column <code>status</code> indicating <code>'Active'</code> or <code>'Inactive'</code>.</p>
<p><strong>Expected Output columns:</strong> <code>user_id</code>, <code>name</code>, <code>email</code>, <code>status</code></p>`,
    starter: "",
    solution: `SELECT user_id, name, email, 'Active' AS status
FROM ActiveUsers
UNION
SELECT user_id, name, email, 'Inactive' AS status
FROM InactiveUsers;`,
    hint: "Use UNION to combine two SELECT statements, adding a literal string column for the status."
  },
  {
    id: 14,
    title: "Handle NULL Commissions",
    difficulty: "Easy",
    category: "Aggregation",
    companies: ["Salesforce", "HubSpot"],
    acceptance: 76,
    tags: ["COALESCE", "NULL", "SUM"],
    description: `<h3>Table: <code>Sales_Reps</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>rep_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>base_salary</td><td>numeric</td></tr>
<tr><td>commission</td><td>numeric</td></tr>
</table>
<p><code>rep_id</code> is the primary key. The <code>commission</code> column can be <code>NULL</code> if the rep has no commission.</p>
<p>Write a query to compute each rep's total compensation (<code>base_salary + commission</code>). If commission is NULL, treat it as 0.</p>
<p><strong>Expected Output columns:</strong> <code>name</code>, <code>total_compensation</code></p>`,
    starter: "",
    solution: `SELECT name, base_salary + COALESCE(commission, 0) AS total_compensation
FROM Sales_Reps;`,
    hint: "Use COALESCE to replace NULL commission values with 0 before adding to base_salary."
  },
  {
    id: 15,
    title: "Classify Employees by Salary",
    difficulty: "Easy",
    category: "CASE/Pivot",
    companies: ["Apple", "Netflix"],
    acceptance: 74,
    tags: ["CASE WHEN", "Conditional Logic"],
    description: `<h3>Table: <code>Employees</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>salary</td><td>int</td></tr>
</table>
<p><code>id</code> is the primary key for this table.</p>
<p>Write a query to classify each employee into a salary bracket:</p>
<ul>
<li><code>'High'</code> if salary &gt;= 100000</li>
<li><code>'Medium'</code> if salary &gt;= 50000 and salary &lt; 100000</li>
<li><code>'Low'</code> if salary &lt; 50000</li>
</ul>
<p><strong>Expected Output columns:</strong> <code>name</code>, <code>salary</code>, <code>salary_bracket</code></p>`,
    starter: "",
    solution: `SELECT name, salary,
  CASE
    WHEN salary >= 100000 THEN 'High'
    WHEN salary >= 50000 THEN 'Medium'
    ELSE 'Low'
  END AS salary_bracket
FROM Employees;`,
    hint: "Use a CASE WHEN expression to assign labels based on the salary value."
  },
  {
    id: 16,
    title: "Monthly Fare Totals",
    difficulty: "Easy",
    category: "Date Functions",
    companies: ["Uber", "Lyft"],
    acceptance: 79,
    tags: ["EXTRACT", "DATE_PART", "GROUP BY"],
    description: `<h3>Table: <code>Rides</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>ride_id</td><td>int</td></tr>
<tr><td>driver_id</td><td>int</td></tr>
<tr><td>ride_date</td><td>date</td></tr>
<tr><td>fare</td><td>numeric</td></tr>
</table>
<p><code>ride_id</code> is the primary key for this table.</p>
<p>Write a query to find the total fare collected per month in 2024. Return the month number and total fare, ordered by month.</p>
<p><strong>Expected Output columns:</strong> <code>month</code>, <code>total_fare</code></p>`,
    starter: "",
    solution: `SELECT EXTRACT(MONTH FROM ride_date) AS month, SUM(fare) AS total_fare
FROM Rides
WHERE EXTRACT(YEAR FROM ride_date) = 2024
GROUP BY EXTRACT(MONTH FROM ride_date)
ORDER BY month;`,
    hint: "Use EXTRACT(MONTH FROM ...) and EXTRACT(YEAR FROM ...) to isolate month and year components from the date."
  },
  {
    id: 17,
    title: "Distinct Job Titles",
    difficulty: "Beginner",
    category: "Aggregation",
    companies: ["LinkedIn", "Indeed"],
    acceptance: 82,
    tags: ["DISTINCT", "ORDER BY"],
    description: `<h3>Table: <code>Employees</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>job_title</td><td>varchar</td></tr>
<tr><td>department</td><td>varchar</td></tr>
</table>
<p><code>id</code> is the primary key for this table.</p>
<p>Write a query to find all distinct job titles in the company, ordered alphabetically.</p>
<p><strong>Expected Output columns:</strong> <code>job_title</code></p>`,
    starter: "",
    solution: `SELECT DISTINCT job_title
FROM Employees
ORDER BY job_title ASC;`,
    hint: "Use SELECT DISTINCT to eliminate duplicate job titles from the result."
  },
  {
    id: 18,
    title: "Customers with Orders Over $500",
    difficulty: "Beginner",
    category: "Joins",
    companies: ["Amazon", "Shopify"],
    acceptance: 73,
    tags: ["JOIN", "WHERE", "DISTINCT"],
    description: `<h3>Table: <code>Customers</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>customer_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>city</td><td>varchar</td></tr>
</table>
<p><code>customer_id</code> is the primary key.</p>
<h3>Table: <code>Orders</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>order_id</td><td>int</td></tr>
<tr><td>customer_id</td><td>int</td></tr>
<tr><td>amount</td><td>numeric</td></tr>
</table>
<p><code>order_id</code> is the primary key.</p>
<p>Write a query to find distinct customer names who have placed at least one order with an amount greater than 500. Order by name.</p>
<p><strong>Expected Output columns:</strong> <code>name</code></p>`,
    starter: "",
    solution: `SELECT DISTINCT c.name
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
WHERE o.amount > 500
ORDER BY c.name;`,
    hint: "Join the tables on customer_id, filter with WHERE for amount > 500, and use DISTINCT to avoid duplicates."
  },
  {
    id: 19,
    title: "Employees Not in Engineering",
    difficulty: "Easy",
    category: "Subquery",
    companies: ["Google", "Meta"],
    acceptance: 77,
    tags: ["NOT IN", "Subquery", "WHERE"],
    description: `<h3>Table: <code>Employees</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>department_id</td><td>int</td></tr>
</table>
<p><code>id</code> is the primary key.</p>
<h3>Table: <code>Departments</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>department_id</td><td>int</td></tr>
<tr><td>department_name</td><td>varchar</td></tr>
</table>
<p><code>department_id</code> is the primary key.</p>
<p>Write a query to find all employees who do <strong>not</strong> belong to the <code>'Engineering'</code> department.</p>
<p><strong>Expected Output columns:</strong> <code>name</code></p>`,
    starter: "",
    solution: `SELECT name
FROM Employees
WHERE department_id NOT IN (
  SELECT department_id FROM Departments WHERE department_name = 'Engineering'
);`,
    hint: "Use a subquery to get the department_id for Engineering, then use NOT IN to exclude those employees."
  },
  {
    id: 20,
    title: "Max and Min Salary by Department",
    difficulty: "Beginner",
    category: "Aggregation",
    companies: ["Oracle", "SAP"],
    acceptance: 80,
    tags: ["MAX", "MIN", "GROUP BY"],
    description: `<h3>Table: <code>Employees</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>department</td><td>varchar</td></tr>
<tr><td>salary</td><td>int</td></tr>
</table>
<p><code>id</code> is the primary key for this table.</p>
<p>Write a query to return the maximum and minimum salary for each department.</p>
<p><strong>Expected Output columns:</strong> <code>department</code>, <code>max_salary</code>, <code>min_salary</code></p>`,
    starter: "",
    solution: `SELECT department, MAX(salary) AS max_salary, MIN(salary) AS min_salary
FROM Employees
GROUP BY department;`,
    hint: "Group by department and use the MAX and MIN aggregate functions on salary."
  },
  {
    id: 21,
    title: "Case-Insensitive City Search",
    difficulty: "Beginner",
    category: "String Functions",
    companies: ["Airbnb", "Booking.com"],
    acceptance: 78,
    tags: ["ILIKE", "LOWER", "String Matching"],
    description: `<h3>Table: <code>Hotels</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>hotel_id</td><td>int</td></tr>
<tr><td>hotel_name</td><td>varchar</td></tr>
<tr><td>city</td><td>varchar</td></tr>
<tr><td>rating</td><td>numeric</td></tr>
</table>
<p><code>hotel_id</code> is the primary key.</p>
<p>Write a query to find all hotels in cities that contain the word <code>'new'</code> (case-insensitive). Order by rating descending.</p>
<p><strong>Expected Output columns:</strong> <code>hotel_name</code>, <code>city</code>, <code>rating</code></p>`,
    starter: "",
    solution: `SELECT hotel_name, city, rating
FROM Hotels
WHERE city ILIKE '%new%'
ORDER BY rating DESC;`,
    hint: "In PostgreSQL, use ILIKE for case-insensitive pattern matching with wildcards."
  },
  {
    id: 22,
    title: "Orders with Customer Details",
    difficulty: "Beginner",
    category: "Joins",
    companies: ["Stripe", "PayPal"],
    acceptance: 81,
    tags: ["INNER JOIN", "String Concatenation"],
    description: `<h3>Table: <code>Customers</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>customer_id</td><td>int</td></tr>
<tr><td>first_name</td><td>varchar</td></tr>
<tr><td>last_name</td><td>varchar</td></tr>
<tr><td>email</td><td>varchar</td></tr>
</table>
<h3>Table: <code>Orders</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>order_id</td><td>int</td></tr>
<tr><td>customer_id</td><td>int</td></tr>
<tr><td>order_date</td><td>date</td></tr>
<tr><td>total</td><td>numeric</td></tr>
</table>
<p>Write a query to list all orders along with the customer's full name (first + last) and email. Order by order_date descending.</p>
<p><strong>Expected Output columns:</strong> <code>order_id</code>, <code>full_name</code>, <code>email</code>, <code>order_date</code>, <code>total</code></p>`,
    starter: "",
    solution: `SELECT o.order_id,
       c.first_name || ' ' || c.last_name AS full_name,
       c.email,
       o.order_date,
       o.total
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
ORDER BY o.order_date DESC;`,
    hint: "Use the || operator in PostgreSQL to concatenate first_name, a space, and last_name."
  },
  {
    id: 23,
    title: "Users Who Signed Up This Year",
    difficulty: "Easy",
    category: "Date Functions",
    companies: ["Spotify", "Discord"],
    acceptance: 79,
    tags: ["EXTRACT", "DATE", "WHERE"],
    description: `<h3>Table: <code>Users</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>user_id</td><td>int</td></tr>
<tr><td>username</td><td>varchar</td></tr>
<tr><td>signup_date</td><td>date</td></tr>
<tr><td>plan</td><td>varchar</td></tr>
</table>
<p><code>user_id</code> is the primary key.</p>
<p>Write a query to find all users who signed up in the current year. Return user_id, username, and signup_date ordered by signup_date.</p>
<p><strong>Expected Output columns:</strong> <code>user_id</code>, <code>username</code>, <code>signup_date</code></p>`,
    starter: "",
    solution: `SELECT user_id, username, signup_date
FROM Users
WHERE EXTRACT(YEAR FROM signup_date) = EXTRACT(YEAR FROM CURRENT_DATE)
ORDER BY signup_date;`,
    hint: "Use EXTRACT(YEAR FROM ...) on both the signup_date and CURRENT_DATE to compare years."
  },
  {
    id: 24,
    title: "Products in Price Range",
    difficulty: "Beginner",
    category: "Aggregation",
    companies: ["eBay", "Walmart"],
    acceptance: 82,
    tags: ["BETWEEN", "WHERE", "ORDER BY"],
    description: `<h3>Table: <code>Products</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>product_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>category</td><td>varchar</td></tr>
<tr><td>price</td><td>numeric</td></tr>
</table>
<p><code>product_id</code> is the primary key.</p>
<p>Write a query to find all products with a price between 25 and 100 (inclusive). Order by price ascending, then by name ascending.</p>
<p><strong>Expected Output columns:</strong> <code>name</code>, <code>category</code>, <code>price</code></p>`,
    starter: "",
    solution: `SELECT name, category, price
FROM Products
WHERE price BETWEEN 25 AND 100
ORDER BY price ASC, name ASC;`,
    hint: "Use BETWEEN to filter the price range and ORDER BY with multiple columns."
  },
  {
    id: 25,
    title: "Departments with No Employees",
    difficulty: "Medium",
    category: "EXISTS/NOT EXISTS",
    companies: ["Microsoft", "IBM"],
    acceptance: 69,
    tags: ["NOT EXISTS", "Subquery"],
    description: `<h3>Table: <code>Departments</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>dept_id</td><td>int</td></tr>
<tr><td>dept_name</td><td>varchar</td></tr>
</table>
<p><code>dept_id</code> is the primary key.</p>
<h3>Table: <code>Employees</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>emp_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>dept_id</td><td>int</td></tr>
</table>
<p><code>emp_id</code> is the primary key. <code>dept_id</code> references <code>Departments.dept_id</code>.</p>
<p>Write a query to find departments that have no employees assigned to them.</p>
<p><strong>Expected Output columns:</strong> <code>dept_name</code></p>`,
    starter: "",
    solution: `SELECT d.dept_name
FROM Departments d
WHERE NOT EXISTS (
  SELECT 1 FROM Employees e WHERE e.dept_id = d.dept_id
);`,
    hint: "Use NOT EXISTS with a correlated subquery that checks for employees in each department."
  },
  {
    id: 26,
    title: "Rank Employees by Salary",
    difficulty: "Medium",
    category: "Basic Window Functions",
    companies: ["Google", "Apple"],
    acceptance: 67,
    tags: ["RANK", "Window Functions", "ORDER BY"],
    description: `<h3>Table: <code>Employees</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>department</td><td>varchar</td></tr>
<tr><td>salary</td><td>int</td></tr>
</table>
<p><code>id</code> is the primary key for this table.</p>
<p>Write a query to rank employees within each department by salary (highest first). Use <code>RANK()</code>.</p>
<p><strong>Expected Output columns:</strong> <code>name</code>, <code>department</code>, <code>salary</code>, <code>salary_rank</code></p>`,
    starter: "",
    solution: `SELECT name, department, salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank
FROM Employees;`,
    hint: "Use the RANK() window function with PARTITION BY department and ORDER BY salary DESC."
  },
  {
    id: 27,
    title: "Number Each Row",
    difficulty: "Medium",
    category: "Basic Window Functions",
    companies: ["Meta", "Uber"],
    acceptance: 72,
    tags: ["ROW_NUMBER", "Window Functions"],
    description: `<h3>Table: <code>Students</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>student_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>score</td><td>int</td></tr>
</table>
<p><code>student_id</code> is the primary key for this table.</p>
<p>Write a query to assign a row number to each student ordered by score descending. In case of a tie, order by name ascending.</p>
<p><strong>Expected Output columns:</strong> <code>row_num</code>, <code>name</code>, <code>score</code></p>`,
    starter: "",
    solution: `SELECT ROW_NUMBER() OVER (ORDER BY score DESC, name ASC) AS row_num,
       name, score
FROM Students;`,
    hint: "Use ROW_NUMBER() with an ORDER BY clause that sorts by score descending, then name ascending."
  },
  {
    id: 28,
    title: "Uppercase User Names",
    difficulty: "Beginner",
    category: "String Functions",
    companies: ["Slack", "Zoom"],
    acceptance: 81,
    tags: ["UPPER", "LENGTH", "String Functions"],
    description: `<h3>Table: <code>Users</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>user_id</td><td>int</td></tr>
<tr><td>first_name</td><td>varchar</td></tr>
<tr><td>last_name</td><td>varchar</td></tr>
<tr><td>email</td><td>varchar</td></tr>
</table>
<p><code>user_id</code> is the primary key.</p>
<p>Write a query to return each user's name in uppercase along with the length of their email address. Order by email length descending.</p>
<p><strong>Expected Output columns:</strong> <code>upper_name</code>, <code>email_length</code></p>`,
    starter: "",
    solution: `SELECT UPPER(first_name || ' ' || last_name) AS upper_name,
       LENGTH(email) AS email_length
FROM Users
ORDER BY email_length DESC;`,
    hint: "Use UPPER() to convert to uppercase and LENGTH() to count characters in the email."
  },
  {
    id: 29,
    title: "Customers in Specific Cities",
    difficulty: "Beginner",
    category: "Aggregation",
    companies: ["DoorDash", "Instacart"],
    acceptance: 80,
    tags: ["IN", "WHERE", "ORDER BY"],
    description: `<h3>Table: <code>Customers</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>customer_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>city</td><td>varchar</td></tr>
<tr><td>total_spent</td><td>numeric</td></tr>
</table>
<p><code>customer_id</code> is the primary key.</p>
<p>Write a query to find all customers located in <code>'New York'</code>, <code>'Los Angeles'</code>, or <code>'Chicago'</code>. Order by total_spent descending.</p>
<p><strong>Expected Output columns:</strong> <code>name</code>, <code>city</code>, <code>total_spent</code></p>`,
    starter: "",
    solution: `SELECT name, city, total_spent
FROM Customers
WHERE city IN ('New York', 'Los Angeles', 'Chicago')
ORDER BY total_spent DESC;`,
    hint: "Use the IN operator to filter for multiple city values at once."
  },
  {
    id: 30,
    title: "Count Orders Per Status",
    difficulty: "Easy",
    category: "CASE/Pivot",
    companies: ["Shopify", "Etsy"],
    acceptance: 71,
    tags: ["CASE WHEN", "COUNT", "Pivot"],
    description: `<h3>Table: <code>Orders</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>order_id</td><td>int</td></tr>
<tr><td>customer_id</td><td>int</td></tr>
<tr><td>status</td><td>varchar</td></tr>
<tr><td>amount</td><td>numeric</td></tr>
</table>
<p><code>order_id</code> is the primary key. Status can be <code>'pending'</code>, <code>'shipped'</code>, or <code>'delivered'</code>.</p>
<p>Write a query to produce a single-row summary with the count of orders in each status as separate columns.</p>
<p><strong>Expected Output columns:</strong> <code>pending_count</code>, <code>shipped_count</code>, <code>delivered_count</code></p>`,
    starter: "",
    solution: `SELECT
  COUNT(CASE WHEN status = 'pending' THEN 1 END) AS pending_count,
  COUNT(CASE WHEN status = 'shipped' THEN 1 END) AS shipped_count,
  COUNT(CASE WHEN status = 'delivered' THEN 1 END) AS delivered_count
FROM Orders;`,
    hint: "Use CASE WHEN inside COUNT() to conditionally count rows for each status value."
  },
  {
    id: 31,
    title: "Employees Who Share a Birthday Month",
    difficulty: "Easy",
    category: "Date Functions",
    companies: ["Netflix", "Spotify"],
    acceptance: 68,
    tags: ["EXTRACT", "GROUP BY", "HAVING"],
    description: `<h3>Table: <code>Employees</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>birth_date</td><td>date</td></tr>
</table>
<p><code>id</code> is the primary key for this table.</p>
<p>Write a query to find all birth months that have more than one employee born in them. Return the month number and the count of employees.</p>
<p><strong>Expected Output columns:</strong> <code>birth_month</code>, <code>employee_count</code></p>`,
    starter: "",
    solution: `SELECT EXTRACT(MONTH FROM birth_date) AS birth_month,
       COUNT(*) AS employee_count
FROM Employees
GROUP BY EXTRACT(MONTH FROM birth_date)
HAVING COUNT(*) > 1
ORDER BY birth_month;`,
    hint: "Extract the month from birth_date, group by it, and use HAVING to filter months with more than one employee."
  },
  {
    id: 32,
    title: "Students with Above-Average Scores",
    difficulty: "Easy",
    category: "Subquery",
    companies: ["Coursera", "Chegg"],
    acceptance: 74,
    tags: ["Subquery", "AVG", "WHERE"],
    description: `<h3>Table: <code>Students</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>student_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>subject</td><td>varchar</td></tr>
<tr><td>score</td><td>int</td></tr>
</table>
<p><code>student_id</code> is the primary key.</p>
<p>Write a query to find all students whose score is above the overall average score. Order by score descending.</p>
<p><strong>Expected Output columns:</strong> <code>name</code>, <code>score</code></p>`,
    starter: "",
    solution: `SELECT name, score
FROM Students
WHERE score > (SELECT AVG(score) FROM Students)
ORDER BY score DESC;`,
    hint: "Use a subquery to compute the average score, then compare each student's score against it."
  },
  {
    id: 33,
    title: "Customers Who Exist in Both Tables",
    difficulty: "Medium",
    category: "EXISTS/NOT EXISTS",
    companies: ["Stripe", "Square"],
    acceptance: 70,
    tags: ["EXISTS", "Correlated Subquery"],
    description: `<h3>Table: <code>OnlineCustomers</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>customer_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>email</td><td>varchar</td></tr>
</table>
<h3>Table: <code>InStoreCustomers</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>customer_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>phone</td><td>varchar</td></tr>
</table>
<p>Write a query to find all online customers who also appear in the in-store customers table (matching by <code>customer_id</code>).</p>
<p><strong>Expected Output columns:</strong> <code>customer_id</code>, <code>name</code>, <code>email</code></p>`,
    starter: "",
    solution: `SELECT o.customer_id, o.name, o.email
FROM OnlineCustomers o
WHERE EXISTS (
  SELECT 1 FROM InStoreCustomers i WHERE i.customer_id = o.customer_id
);`,
    hint: "Use EXISTS with a correlated subquery that matches customer_id between the two tables."
  },
  {
    id: 34,
    title: "Trim and Clean User Input",
    difficulty: "Beginner",
    category: "String Functions",
    companies: ["Twilio", "Zendesk"],
    acceptance: 76,
    tags: ["TRIM", "REPLACE", "String Functions"],
    description: `<h3>Table: <code>UserProfiles</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>profile_id</td><td>int</td></tr>
<tr><td>display_name</td><td>varchar</td></tr>
<tr><td>bio</td><td>text</td></tr>
</table>
<p><code>profile_id</code> is the primary key.</p>
<p>Write a query to return each profile with the display_name trimmed of leading and trailing whitespace and the bio with all double spaces replaced by single spaces.</p>
<p><strong>Expected Output columns:</strong> <code>profile_id</code>, <code>clean_name</code>, <code>clean_bio</code></p>`,
    starter: "",
    solution: `SELECT profile_id,
       TRIM(display_name) AS clean_name,
       REPLACE(bio, '  ', ' ') AS clean_bio
FROM UserProfiles;`,
    hint: "Use TRIM() to remove whitespace and REPLACE() to swap double spaces for single spaces."
  },
  {
    id: 35,
    title: "Recent Orders Only",
    difficulty: "Easy",
    category: "Date Functions",
    companies: ["DoorDash", "Grubhub"],
    acceptance: 78,
    tags: ["INTERVAL", "CURRENT_DATE", "WHERE"],
    description: `<h3>Table: <code>Orders</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>order_id</td><td>int</td></tr>
<tr><td>customer_id</td><td>int</td></tr>
<tr><td>order_date</td><td>date</td></tr>
<tr><td>total</td><td>numeric</td></tr>
</table>
<p><code>order_id</code> is the primary key.</p>
<p>Write a query to find all orders placed in the last 30 days. Order by order_date descending.</p>
<p><strong>Expected Output columns:</strong> <code>order_id</code>, <code>customer_id</code>, <code>order_date</code>, <code>total</code></p>`,
    starter: "",
    solution: `SELECT order_id, customer_id, order_date, total
FROM Orders
WHERE order_date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY order_date DESC;`,
    hint: "Use CURRENT_DATE minus an INTERVAL to compute the date 30 days ago."
  },
  {
    id: 36,
    title: "Union of Two Product Catalogs",
    difficulty: "Easy",
    category: "Set Operations",
    companies: ["Amazon", "eBay"],
    acceptance: 75,
    tags: ["UNION ALL", "Set Operations"],
    description: `<h3>Table: <code>USProducts</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>product_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>price</td><td>numeric</td></tr>
</table>
<h3>Table: <code>EUProducts</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>product_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>price</td><td>numeric</td></tr>
</table>
<p>Write a query to combine both product catalogs, keeping all rows including duplicates. Add a <code>region</code> column indicating the source.</p>
<p><strong>Expected Output columns:</strong> <code>product_id</code>, <code>name</code>, <code>price</code>, <code>region</code></p>`,
    starter: "",
    solution: `SELECT product_id, name, price, 'US' AS region
FROM USProducts
UNION ALL
SELECT product_id, name, price, 'EU' AS region
FROM EUProducts;`,
    hint: "Use UNION ALL (not UNION) to keep all rows including duplicates, and add a literal string column for region."
  },
  {
    id: 37,
    title: "Default Value for Missing Phone",
    difficulty: "Easy",
    category: "Aggregation",
    companies: ["Twilio", "RingCentral"],
    acceptance: 79,
    tags: ["COALESCE", "NULL Handling"],
    description: `<h3>Table: <code>Contacts</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>contact_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>phone</td><td>varchar</td></tr>
<tr><td>email</td><td>varchar</td></tr>
</table>
<p><code>contact_id</code> is the primary key. Both <code>phone</code> and <code>email</code> can be NULL.</p>
<p>Write a query to return each contact's name and their preferred contact method: use phone if available, otherwise email, otherwise <code>'No contact info'</code>.</p>
<p><strong>Expected Output columns:</strong> <code>name</code>, <code>contact_method</code></p>`,
    starter: "",
    solution: `SELECT name,
       COALESCE(phone, email, 'No contact info') AS contact_method
FROM Contacts;`,
    hint: "COALESCE returns the first non-NULL argument. Chain phone, email, and a default string."
  },
  {
    id: 38,
    title: "Percentage of Total Sales",
    difficulty: "Medium",
    category: "Subquery",
    companies: ["Shopify", "Stripe"],
    acceptance: 66,
    tags: ["Subquery", "ROUND", "Percentage"],
    description: `<h3>Table: <code>Sales</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>sale_id</td><td>int</td></tr>
<tr><td>product_name</td><td>varchar</td></tr>
<tr><td>amount</td><td>numeric</td></tr>
</table>
<p><code>sale_id</code> is the primary key.</p>
<p>Write a query to find the total sales amount per product and what percentage of overall sales each product represents. Round the percentage to 2 decimal places.</p>
<p><strong>Expected Output columns:</strong> <code>product_name</code>, <code>product_total</code>, <code>sales_percentage</code></p>`,
    starter: "",
    solution: `SELECT product_name,
       SUM(amount) AS product_total,
       ROUND(SUM(amount) * 100.0 / (SELECT SUM(amount) FROM Sales), 2) AS sales_percentage
FROM Sales
GROUP BY product_name
ORDER BY product_total DESC;`,
    hint: "Use a subquery to calculate the total of all sales, then divide each product's sum by it and multiply by 100."
  },
  {
    id: 39,
    title: "First Order Per Customer",
    difficulty: "Medium",
    category: "Basic Window Functions",
    companies: ["Amazon", "Instacart"],
    acceptance: 68,
    tags: ["ROW_NUMBER", "Window Functions", "Subquery"],
    description: `<h3>Table: <code>Orders</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>order_id</td><td>int</td></tr>
<tr><td>customer_id</td><td>int</td></tr>
<tr><td>order_date</td><td>date</td></tr>
<tr><td>total</td><td>numeric</td></tr>
</table>
<p><code>order_id</code> is the primary key.</p>
<p>Write a query to find each customer's first order (earliest order_date). If there are ties, pick the one with the smallest order_id.</p>
<p><strong>Expected Output columns:</strong> <code>customer_id</code>, <code>order_id</code>, <code>order_date</code>, <code>total</code></p>`,
    starter: "",
    solution: `SELECT customer_id, order_id, order_date, total
FROM (
  SELECT *,
         ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date ASC, order_id ASC) AS rn
  FROM Orders
) sub
WHERE rn = 1;`,
    hint: "Use ROW_NUMBER() partitioned by customer_id and ordered by order_date, then filter where row number equals 1."
  },
  {
    id: 40,
    title: "Extract Email Domain",
    difficulty: "Medium",
    category: "String Functions",
    companies: ["Google", "Yahoo"],
    acceptance: 73,
    tags: ["SUBSTRING", "POSITION", "String Functions"],
    description: `<h3>Table: <code>Users</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>user_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>email</td><td>varchar</td></tr>
</table>
<p><code>user_id</code> is the primary key.</p>
<p>Write a query to extract the domain from each user's email address (the part after the <code>@</code> symbol). Return the domain and the count of users per domain, ordered by count descending.</p>
<p><strong>Expected Output columns:</strong> <code>domain</code>, <code>user_count</code></p>`,
    starter: "",
    solution: `SELECT SUBSTRING(email FROM POSITION('@' IN email) + 1) AS domain,
       COUNT(*) AS user_count
FROM Users
GROUP BY domain
ORDER BY user_count DESC;`,
    hint: "Use POSITION to find the @ character and SUBSTRING to extract everything after it."
  },
  {
    id: 41,
    title: "Running Total of Sales",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Amazon", "Stripe", "Shopify"],
    acceptance: 52,
    tags: ["SUM", "OVER", "ORDER BY", "Window Functions"],
    description: `<h3>Table: <code>DailySales</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>sale_date</td><td>date</td></tr>
<tr><td>amount</td><td>numeric</td></tr>
</table>
<p><code>sale_date</code> is the primary key.</p>
<p>Write a query to compute a running total of sales ordered by <code>sale_date</code>. Return each row's date, daily amount, and the cumulative sum up to and including that date.</p>
<p><strong>Expected Output columns:</strong> <code>sale_date</code>, <code>amount</code>, <code>running_total</code></p>`,
    starter: "",
    solution: `SELECT sale_date,
       amount,
       SUM(amount) OVER (ORDER BY sale_date) AS running_total
FROM DailySales
ORDER BY sale_date;`,
    hint: "Use SUM() as a window function with ORDER BY inside the OVER clause to create a cumulative sum."
  },
  {
    id: 42,
    title: "Previous Month Revenue Comparison",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Meta", "Netflix", "Spotify"],
    acceptance: 46,
    tags: ["LAG", "Window Functions", "Date Functions"],
    description: `<h3>Table: <code>MonthlyRevenue</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>month</td><td>date</td></tr>
<tr><td>revenue</td><td>numeric</td></tr>
</table>
<p><code>month</code> is the primary key and always represents the first day of each month.</p>
<p>Write a query to show each month's revenue alongside the previous month's revenue and the difference between them.</p>
<p><strong>Expected Output columns:</strong> <code>month</code>, <code>revenue</code>, <code>prev_month_revenue</code>, <code>revenue_change</code></p>`,
    starter: "",
    solution: `SELECT month,
       revenue,
       LAG(revenue) OVER (ORDER BY month) AS prev_month_revenue,
       revenue - LAG(revenue) OVER (ORDER BY month) AS revenue_change
FROM MonthlyRevenue
ORDER BY month;`,
    hint: "LAG(column) OVER (ORDER BY ...) returns the value from the previous row. Subtract it from the current revenue."
  },
  {
    id: 43,
    title: "Dense Rank Salaries by Department",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Google", "Microsoft", "Bloomberg"],
    acceptance: 48,
    tags: ["DENSE_RANK", "Window Functions", "PARTITION BY"],
    description: `<h3>Table: <code>Employees</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>emp_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>department</td><td>varchar</td></tr>
<tr><td>salary</td><td>numeric</td></tr>
</table>
<p><code>emp_id</code> is the primary key.</p>
<p>Write a query to rank employees by salary within each department using <code>DENSE_RANK</code>. The highest salary should receive rank 1.</p>
<p><strong>Expected Output columns:</strong> <code>department</code>, <code>name</code>, <code>salary</code>, <code>salary_rank</code></p>`,
    starter: "",
    solution: `SELECT department,
       name,
       salary,
       DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank
FROM Employees
ORDER BY department, salary_rank;`,
    hint: "Use DENSE_RANK() with PARTITION BY department and ORDER BY salary DESC so ties share the same rank."
  },
  {
    id: 44,
    title: "Year-over-Year Growth Rate",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Meta", "Goldman Sachs", "JPMorgan"],
    acceptance: 42,
    tags: ["LAG", "Window Functions", "ROUND", "Growth"],
    description: `<h3>Table: <code>AnnualSales</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>year</td><td>int</td></tr>
<tr><td>total_sales</td><td>numeric</td></tr>
</table>
<p><code>year</code> is the primary key.</p>
<p>Write a query to calculate the year-over-year growth rate as a percentage, rounded to 2 decimal places. The first year should show <code>NULL</code> for growth rate.</p>
<p><strong>Expected Output columns:</strong> <code>year</code>, <code>total_sales</code>, <code>prev_year_sales</code>, <code>yoy_growth_pct</code></p>`,
    starter: "",
    solution: `SELECT year,
       total_sales,
       LAG(total_sales) OVER (ORDER BY year) AS prev_year_sales,
       ROUND(
         (total_sales - LAG(total_sales) OVER (ORDER BY year)) * 100.0
         / LAG(total_sales) OVER (ORDER BY year), 2
       ) AS yoy_growth_pct
FROM AnnualSales
ORDER BY year;`,
    hint: "Use LAG to get last year's sales, then compute (current - previous) / previous * 100 and round."
  },
  {
    id: 45,
    title: "3-Day Moving Average",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Netflix", "Robinhood", "Coinbase"],
    acceptance: 44,
    tags: ["AVG", "ROWS BETWEEN", "Window Functions"],
    description: `<h3>Table: <code>StockPrices</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>trade_date</td><td>date</td></tr>
<tr><td>closing_price</td><td>numeric</td></tr>
</table>
<p><code>trade_date</code> is the primary key.</p>
<p>Write a query to calculate a 3-day moving average of the closing price (current day and the two preceding days). Round to 2 decimal places. Only include rows where the full 3-day window is available.</p>
<p><strong>Expected Output columns:</strong> <code>trade_date</code>, <code>closing_price</code>, <code>moving_avg_3d</code></p>`,
    starter: "",
    solution: `SELECT trade_date,
       closing_price,
       ROUND(AVG(closing_price) OVER (
         ORDER BY trade_date
         ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ), 2) AS moving_avg_3d
FROM StockPrices
ORDER BY trade_date
OFFSET 2;`,
    hint: "Use AVG() OVER with ROWS BETWEEN 2 PRECEDING AND CURRENT ROW. Use OFFSET 2 to skip the first two incomplete windows."
  },
  {
    id: 46,
    title: "Revenue by Quarter Using CTE",
    difficulty: "Medium",
    category: "CTE",
    companies: ["Salesforce", "Snowflake", "Databricks"],
    acceptance: 54,
    tags: ["CTE", "DATE_TRUNC", "Aggregation"],
    description: `<h3>Table: <code>Transactions</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>txn_id</td><td>int</td></tr>
<tr><td>txn_date</td><td>date</td></tr>
<tr><td>amount</td><td>numeric</td></tr>
<tr><td>category</td><td>varchar</td></tr>
</table>
<p><code>txn_id</code> is the primary key.</p>
<p>Using a CTE, write a query that first computes the total revenue per quarter, then returns only quarters where total revenue exceeded 10000.</p>
<p><strong>Expected Output columns:</strong> <code>quarter</code>, <code>total_revenue</code></p>`,
    starter: "",
    solution: `WITH QuarterlyRevenue AS (
  SELECT DATE_TRUNC('quarter', txn_date) AS quarter,
         SUM(amount) AS total_revenue
  FROM Transactions
  GROUP BY DATE_TRUNC('quarter', txn_date)
)
SELECT quarter, total_revenue
FROM QuarterlyRevenue
WHERE total_revenue > 10000
ORDER BY quarter;`,
    hint: "Define a CTE that groups by DATE_TRUNC('quarter', txn_date) and sums the amount, then filter in the outer query."
  },
  {
    id: 47,
    title: "Multi-Step CTE: Top Customers per Category",
    difficulty: "Medium",
    category: "CTE",
    companies: ["Amazon", "Walmart", "Target"],
    acceptance: 40,
    tags: ["CTE", "ROW_NUMBER", "Multi-step"],
    description: `<h3>Table: <code>Orders</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>order_id</td><td>int</td></tr>
<tr><td>customer_id</td><td>int</td></tr>
<tr><td>category</td><td>varchar</td></tr>
<tr><td>amount</td><td>numeric</td></tr>
</table>
<p><code>order_id</code> is the primary key.</p>
<p>Using multiple CTEs, first compute total spending per customer per category, then rank customers within each category, and finally return only the top 3 spenders per category.</p>
<p><strong>Expected Output columns:</strong> <code>category</code>, <code>customer_id</code>, <code>total_spent</code>, <code>rank</code></p>`,
    starter: "",
    solution: `WITH CustomerCategorySpend AS (
  SELECT customer_id,
         category,
         SUM(amount) AS total_spent
  FROM Orders
  GROUP BY customer_id, category
),
RankedCustomers AS (
  SELECT category,
         customer_id,
         total_spent,
         ROW_NUMBER() OVER (PARTITION BY category ORDER BY total_spent DESC) AS rank
  FROM CustomerCategorySpend
)
SELECT category, customer_id, total_spent, rank
FROM RankedCustomers
WHERE rank <= 3
ORDER BY category, rank;`,
    hint: "Build two CTEs: one to aggregate spending, another to rank within each category. Filter rank <= 3 in the final SELECT."
  },
  {
    id: 48,
    title: "Manager-Employee Hierarchy",
    difficulty: "Medium",
    category: "Self Join",
    companies: ["Google", "Microsoft", "LinkedIn"],
    acceptance: 50,
    tags: ["Self Join", "LEFT JOIN"],
    description: `<h3>Table: <code>Employees</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>emp_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>manager_id</td><td>int</td></tr>
<tr><td>salary</td><td>numeric</td></tr>
</table>
<p><code>emp_id</code> is the primary key. <code>manager_id</code> references <code>emp_id</code> (NULL for the CEO).</p>
<p>Write a query to list every employee alongside their manager's name. Employees with no manager should show <code>NULL</code> for the manager name. Also include only employees who earn more than their manager.</p>
<p><strong>Expected Output columns:</strong> <code>employee_name</code>, <code>employee_salary</code>, <code>manager_name</code>, <code>manager_salary</code></p>`,
    starter: "",
    solution: `SELECT e.name AS employee_name,
       e.salary AS employee_salary,
       m.name AS manager_name,
       m.salary AS manager_salary
FROM Employees e
LEFT JOIN Employees m ON e.manager_id = m.emp_id
WHERE e.salary > m.salary
ORDER BY e.salary DESC;`,
    hint: "Self-join the Employees table to itself using manager_id = emp_id, then filter where the employee's salary exceeds the manager's."
  },
  {
    id: 49,
    title: "Find Employees in the Same Department",
    difficulty: "Medium",
    category: "Self Join",
    companies: ["Apple", "Uber", "Airbnb"],
    acceptance: 53,
    tags: ["Self Join", "DISTINCT"],
    description: `<h3>Table: <code>Employees</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>emp_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>department</td><td>varchar</td></tr>
</table>
<p><code>emp_id</code> is the primary key.</p>
<p>Write a query to find all pairs of employees who work in the same department. Each pair should appear only once (no duplicates, no self-pairs). Order by department, then by the first employee name.</p>
<p><strong>Expected Output columns:</strong> <code>department</code>, <code>employee1</code>, <code>employee2</code></p>`,
    starter: "",
    solution: `SELECT e1.department,
       e1.name AS employee1,
       e2.name AS employee2
FROM Employees e1
JOIN Employees e2
  ON e1.department = e2.department
  AND e1.emp_id < e2.emp_id
ORDER BY e1.department, e1.name;`,
    hint: "Self-join on department and use e1.emp_id < e2.emp_id to avoid duplicates and self-pairs."
  },
  {
    id: 50,
    title: "Employees Earning Above Department Average",
    difficulty: "Medium",
    category: "Correlated Subquery",
    companies: ["Meta", "Bloomberg", "Goldman Sachs"],
    acceptance: 47,
    tags: ["Correlated Subquery", "AVG", "Comparison"],
    description: `<h3>Table: <code>Employees</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>emp_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>department</td><td>varchar</td></tr>
<tr><td>salary</td><td>numeric</td></tr>
</table>
<p><code>emp_id</code> is the primary key.</p>
<p>Write a query using a correlated subquery to find employees whose salary is above the average salary of their own department.</p>
<p><strong>Expected Output columns:</strong> <code>name</code>, <code>department</code>, <code>salary</code>, <code>dept_avg_salary</code></p>`,
    starter: "",
    solution: `SELECT e.name,
       e.department,
       e.salary,
       (SELECT ROUND(AVG(e2.salary), 2)
        FROM Employees e2
        WHERE e2.department = e.department) AS dept_avg_salary
FROM Employees e
WHERE e.salary > (
  SELECT AVG(e2.salary)
  FROM Employees e2
  WHERE e2.department = e.department
)
ORDER BY e.department, e.salary DESC;`,
    hint: "In the WHERE clause, compare salary against a subquery that computes AVG(salary) filtered to the same department."
  },
  {
    id: 51,
    title: "Products with No Recent Orders",
    difficulty: "Medium",
    category: "Correlated Subquery",
    companies: ["Amazon", "Instacart", "DoorDash"],
    acceptance: 45,
    tags: ["NOT EXISTS", "Correlated Subquery", "Date Functions"],
    description: `<h3>Table: <code>Products</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>product_id</td><td>int</td></tr>
<tr><td>product_name</td><td>varchar</td></tr>
</table>
<p><code>product_id</code> is the primary key.</p>
<h3>Table: <code>OrderItems</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>order_item_id</td><td>int</td></tr>
<tr><td>product_id</td><td>int</td></tr>
<tr><td>order_date</td><td>date</td></tr>
</table>
<p><code>order_item_id</code> is the primary key.</p>
<p>Write a query to find all products that have not been ordered in the last 90 days (relative to the most recent order_date in the table). Use <code>NOT EXISTS</code>.</p>
<p><strong>Expected Output columns:</strong> <code>product_id</code>, <code>product_name</code></p>`,
    starter: "",
    solution: `SELECT p.product_id, p.product_name
FROM Products p
WHERE NOT EXISTS (
  SELECT 1
  FROM OrderItems oi
  WHERE oi.product_id = p.product_id
    AND oi.order_date >= (SELECT MAX(order_date) FROM OrderItems) - INTERVAL '90 days'
)
ORDER BY p.product_id;`,
    hint: "Use NOT EXISTS with a correlated subquery that checks if an order exists within the last 90 days for each product."
  },
  {
    id: 52,
    title: "Detect Gaps in Sequential IDs",
    difficulty: "Medium",
    category: "Gaps & Islands",
    companies: ["Uber", "Snap", "TikTok"],
    acceptance: 39,
    tags: ["LEAD", "Gaps & Islands", "Window Functions"],
    description: `<h3>Table: <code>Bookings</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>booking_id</td><td>int</td></tr>
<tr><td>guest_name</td><td>varchar</td></tr>
<tr><td>check_in</td><td>date</td></tr>
</table>
<p><code>booking_id</code> is the primary key. IDs are mostly sequential but some are missing (gaps).</p>
<p>Write a query to find the start and end of each gap in the booking_id sequence. A gap starts at <code>booking_id + 1</code> when the next booking_id is not <code>booking_id + 1</code>.</p>
<p><strong>Expected Output columns:</strong> <code>gap_start</code>, <code>gap_end</code></p>`,
    starter: "",
    solution: `SELECT booking_id + 1 AS gap_start,
       LEAD(booking_id) OVER (ORDER BY booking_id) - 1 AS gap_end
FROM Bookings
WHERE LEAD(booking_id) OVER (ORDER BY booking_id) - booking_id > 1
ORDER BY gap_start;`,
    hint: "Use LEAD to get the next booking_id. Where the difference is greater than 1, there's a gap from current+1 to next-1."
  },
  {
    id: 53,
    title: "Consecutive Login Streaks",
    difficulty: "Medium",
    category: "Gaps & Islands",
    companies: ["Meta", "Spotify", "Pinterest"],
    acceptance: 38,
    tags: ["Gaps & Islands", "ROW_NUMBER", "DATE"],
    description: `<h3>Table: <code>UserLogins</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>user_id</td><td>int</td></tr>
<tr><td>login_date</td><td>date</td></tr>
</table>
<p>The combination of <code>(user_id, login_date)</code> is unique.</p>
<p>Write a query to find the longest consecutive login streak for each user. A streak is a set of consecutive calendar days with logins.</p>
<p><strong>Expected Output columns:</strong> <code>user_id</code>, <code>longest_streak</code></p>`,
    starter: "",
    solution: `WITH numbered AS (
  SELECT user_id,
         login_date,
         login_date - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date))::int AS grp
  FROM UserLogins
),
streaks AS (
  SELECT user_id,
         grp,
         COUNT(*) AS streak_length
  FROM numbered
  GROUP BY user_id, grp
)
SELECT user_id,
       MAX(streak_length) AS longest_streak
FROM streaks
GROUP BY user_id
ORDER BY user_id;`,
    hint: "Subtract ROW_NUMBER from login_date — consecutive dates produce the same group value. Count per group to get streak lengths."
  },
  {
    id: 54,
    title: "Pivot Sales by Category",
    difficulty: "Medium",
    category: "CASE/Pivot",
    companies: ["Amazon", "Walmart", "Target"],
    acceptance: 50,
    tags: ["CASE", "Pivot", "Conditional Aggregation"],
    description: `<h3>Table: <code>Sales</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>sale_id</td><td>int</td></tr>
<tr><td>sale_month</td><td>date</td></tr>
<tr><td>category</td><td>varchar</td></tr>
<tr><td>amount</td><td>numeric</td></tr>
</table>
<p><code>sale_id</code> is the primary key. Categories are 'Electronics', 'Clothing', and 'Food'.</p>
<p>Write a query to pivot the data so that each row represents a month and columns show total sales per category.</p>
<p><strong>Expected Output columns:</strong> <code>sale_month</code>, <code>electronics</code>, <code>clothing</code>, <code>food</code></p>`,
    starter: "",
    solution: `SELECT sale_month,
       SUM(CASE WHEN category = 'Electronics' THEN amount ELSE 0 END) AS electronics,
       SUM(CASE WHEN category = 'Clothing' THEN amount ELSE 0 END) AS clothing,
       SUM(CASE WHEN category = 'Food' THEN amount ELSE 0 END) AS food
FROM Sales
GROUP BY sale_month
ORDER BY sale_month;`,
    hint: "Use SUM(CASE WHEN category = '...' THEN amount ELSE 0 END) for each category to create pivot columns."
  },
  {
    id: 55,
    title: "Conditional Status Aggregation",
    difficulty: "Medium",
    category: "CASE/Pivot",
    companies: ["Salesforce", "PayPal", "Stripe"],
    acceptance: 55,
    tags: ["CASE", "COUNT", "Conditional Aggregation"],
    description: `<h3>Table: <code>Tickets</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>ticket_id</td><td>int</td></tr>
<tr><td>agent_id</td><td>int</td></tr>
<tr><td>status</td><td>varchar</td></tr>
<tr><td>created_at</td><td>timestamp</td></tr>
</table>
<p><code>ticket_id</code> is the primary key. Status can be 'open', 'in_progress', 'resolved', or 'closed'.</p>
<p>Write a query to display each agent's ticket count broken down by status in columns.</p>
<p><strong>Expected Output columns:</strong> <code>agent_id</code>, <code>open_count</code>, <code>in_progress_count</code>, <code>resolved_count</code>, <code>closed_count</code></p>`,
    starter: "",
    solution: `SELECT agent_id,
       COUNT(CASE WHEN status = 'open' THEN 1 END) AS open_count,
       COUNT(CASE WHEN status = 'in_progress' THEN 1 END) AS in_progress_count,
       COUNT(CASE WHEN status = 'resolved' THEN 1 END) AS resolved_count,
       COUNT(CASE WHEN status = 'closed' THEN 1 END) AS closed_count
FROM Tickets
GROUP BY agent_id
ORDER BY agent_id;`,
    hint: "Use COUNT(CASE WHEN status = '...' THEN 1 END) for each status. COUNT ignores NULLs so unmatched rows are excluded."
  },
  {
    id: 56,
    title: "Monthly Active Users with DATE_TRUNC",
    difficulty: "Medium",
    category: "Date Functions",
    companies: ["Meta", "TikTok", "Snap"],
    acceptance: 51,
    tags: ["DATE_TRUNC", "COUNT DISTINCT", "Date Functions"],
    description: `<h3>Table: <code>UserActivity</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>activity_id</td><td>int</td></tr>
<tr><td>user_id</td><td>int</td></tr>
<tr><td>activity_date</td><td>date</td></tr>
<tr><td>activity_type</td><td>varchar</td></tr>
</table>
<p><code>activity_id</code> is the primary key.</p>
<p>Write a query to compute the number of Monthly Active Users (MAU) — the count of distinct users per calendar month.</p>
<p><strong>Expected Output columns:</strong> <code>month</code>, <code>mau</code></p>`,
    starter: "",
    solution: `SELECT DATE_TRUNC('month', activity_date) AS month,
       COUNT(DISTINCT user_id) AS mau
FROM UserActivity
GROUP BY DATE_TRUNC('month', activity_date)
ORDER BY month;`,
    hint: "Use DATE_TRUNC('month', activity_date) to group by month and COUNT(DISTINCT user_id) for unique users."
  },
  {
    id: 57,
    title: "Time Between Consecutive Events",
    difficulty: "Medium",
    category: "Date Functions",
    companies: ["Uber", "DoorDash", "Airbnb"],
    acceptance: 43,
    tags: ["LAG", "Date Functions", "EXTRACT"],
    description: `<h3>Table: <code>RideEvents</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>event_id</td><td>int</td></tr>
<tr><td>driver_id</td><td>int</td></tr>
<tr><td>event_time</td><td>timestamp</td></tr>
<tr><td>event_type</td><td>varchar</td></tr>
</table>
<p><code>event_id</code> is the primary key.</p>
<p>Write a query to calculate the time in minutes between each event and the previous event for the same driver. Order by driver and event time.</p>
<p><strong>Expected Output columns:</strong> <code>driver_id</code>, <code>event_time</code>, <code>event_type</code>, <code>minutes_since_last_event</code></p>`,
    starter: "",
    solution: `SELECT driver_id,
       event_time,
       event_type,
       EXTRACT(EPOCH FROM event_time - LAG(event_time) OVER (PARTITION BY driver_id ORDER BY event_time)) / 60.0 AS minutes_since_last_event
FROM RideEvents
ORDER BY driver_id, event_time;`,
    hint: "Use LAG to get the previous event_time partitioned by driver. Subtract timestamps and extract the epoch in minutes."
  },
  {
    id: 58,
    title: "Complex Multi-Table Join: Order Details",
    difficulty: "Medium",
    category: "Joins (complex)",
    companies: ["Amazon", "Expedia", "Zillow"],
    acceptance: 46,
    tags: ["JOIN", "Multi-table", "Aggregation"],
    description: `<h3>Table: <code>Customers</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>customer_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>city</td><td>varchar</td></tr>
</table>
<h3>Table: <code>Orders</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>order_id</td><td>int</td></tr>
<tr><td>customer_id</td><td>int</td></tr>
<tr><td>order_date</td><td>date</td></tr>
</table>
<h3>Table: <code>OrderItems</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>item_id</td><td>int</td></tr>
<tr><td>order_id</td><td>int</td></tr>
<tr><td>product_name</td><td>varchar</td></tr>
<tr><td>quantity</td><td>int</td></tr>
<tr><td>price</td><td>numeric</td></tr>
</table>
<p>Write a query to find each customer's total number of orders and total amount spent. Include customers with no orders (showing 0).</p>
<p><strong>Expected Output columns:</strong> <code>name</code>, <code>city</code>, <code>total_orders</code>, <code>total_spent</code></p>`,
    starter: "",
    solution: `SELECT c.name,
       c.city,
       COUNT(DISTINCT o.order_id) AS total_orders,
       COALESCE(SUM(oi.quantity * oi.price), 0) AS total_spent
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
LEFT JOIN OrderItems oi ON o.order_id = oi.order_id
GROUP BY c.customer_id, c.name, c.city
ORDER BY total_spent DESC;`,
    hint: "Use LEFT JOINs to keep all customers. JOIN Customers to Orders, then Orders to OrderItems. Use COUNT(DISTINCT order_id) for order count."
  },
  {
    id: 59,
    title: "Customers Who Bought All Products",
    difficulty: "Medium",
    category: "Joins (complex)",
    companies: ["Google", "Apple", "Nike"],
    acceptance: 41,
    tags: ["JOIN", "HAVING", "COUNT DISTINCT"],
    description: `<h3>Table: <code>Products</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>product_id</td><td>int</td></tr>
<tr><td>product_name</td><td>varchar</td></tr>
</table>
<p><code>product_id</code> is the primary key.</p>
<h3>Table: <code>Purchases</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>purchase_id</td><td>int</td></tr>
<tr><td>customer_id</td><td>int</td></tr>
<tr><td>product_id</td><td>int</td></tr>
</table>
<p><code>purchase_id</code> is the primary key.</p>
<p>Write a query to find customers who have purchased every product in the Products table.</p>
<p><strong>Expected Output columns:</strong> <code>customer_id</code></p>`,
    starter: "",
    solution: `SELECT customer_id
FROM Purchases
GROUP BY customer_id
HAVING COUNT(DISTINCT product_id) = (SELECT COUNT(*) FROM Products);`,
    hint: "Group by customer and use HAVING to check if their distinct product count equals the total number of products."
  },
  {
    id: 60,
    title: "HAVING with Complex Conditions",
    difficulty: "Medium",
    category: "Aggregation (advanced)",
    companies: ["Visa", "PayPal", "JPMorgan"],
    acceptance: 49,
    tags: ["HAVING", "AVG", "MIN", "MAX", "Aggregation"],
    description: `<h3>Table: <code>Transactions</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>txn_id</td><td>int</td></tr>
<tr><td>merchant_id</td><td>int</td></tr>
<tr><td>amount</td><td>numeric</td></tr>
<tr><td>txn_date</td><td>date</td></tr>
</table>
<p><code>txn_id</code> is the primary key.</p>
<p>Write a query to find merchants where the average transaction amount is above 500, the total number of transactions is at least 10, and the maximum single transaction does not exceed 5000.</p>
<p><strong>Expected Output columns:</strong> <code>merchant_id</code>, <code>avg_amount</code>, <code>txn_count</code>, <code>max_amount</code></p>`,
    starter: "",
    solution: `SELECT merchant_id,
       ROUND(AVG(amount), 2) AS avg_amount,
       COUNT(*) AS txn_count,
       MAX(amount) AS max_amount
FROM Transactions
GROUP BY merchant_id
HAVING AVG(amount) > 500
   AND COUNT(*) >= 10
   AND MAX(amount) <= 5000
ORDER BY avg_amount DESC;`,
    hint: "Use multiple conditions in the HAVING clause combining AVG, COUNT, and MAX to filter merchant groups."
  },
  {
    id: 61,
    title: "Cumulative Sum with Reset",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Stripe", "Robinhood", "Coinbase"],
    acceptance: 40,
    tags: ["SUM", "PARTITION BY", "Window Functions"],
    description: `<h3>Table: <code>Payments</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>payment_id</td><td>int</td></tr>
<tr><td>account_id</td><td>int</td></tr>
<tr><td>payment_date</td><td>date</td></tr>
<tr><td>amount</td><td>numeric</td></tr>
</table>
<p><code>payment_id</code> is the primary key.</p>
<p>Write a query to compute a running total of payment amounts per account, ordered by payment date.</p>
<p><strong>Expected Output columns:</strong> <code>account_id</code>, <code>payment_date</code>, <code>amount</code>, <code>cumulative_amount</code></p>`,
    starter: "",
    solution: `SELECT account_id,
       payment_date,
       amount,
       SUM(amount) OVER (PARTITION BY account_id ORDER BY payment_date) AS cumulative_amount
FROM Payments
ORDER BY account_id, payment_date;`,
    hint: "Use SUM() OVER with PARTITION BY account_id and ORDER BY payment_date to get a running total per account."
  },
  {
    id: 62,
    title: "NTILE Quartile Assignment",
    difficulty: "Medium",
    category: "Percentile",
    companies: ["Goldman Sachs", "Bloomberg", "JPMorgan"],
    acceptance: 47,
    tags: ["NTILE", "Window Functions", "Percentile"],
    description: `<h3>Table: <code>Employees</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>emp_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>department</td><td>varchar</td></tr>
<tr><td>salary</td><td>numeric</td></tr>
</table>
<p><code>emp_id</code> is the primary key.</p>
<p>Write a query to divide employees into 4 salary quartiles (using NTILE) within each department. Return each employee with their quartile.</p>
<p><strong>Expected Output columns:</strong> <code>department</code>, <code>name</code>, <code>salary</code>, <code>salary_quartile</code></p>`,
    starter: "",
    solution: `SELECT department,
       name,
       salary,
       NTILE(4) OVER (PARTITION BY department ORDER BY salary) AS salary_quartile
FROM Employees
ORDER BY department, salary_quartile, salary;`,
    hint: "NTILE(4) splits rows into 4 roughly equal groups. Partition by department and order by salary."
  },
  {
    id: 63,
    title: "Percent Rank of Test Scores",
    difficulty: "Medium",
    category: "Percentile",
    companies: ["Microsoft", "Databricks", "Snowflake"],
    acceptance: 44,
    tags: ["PERCENT_RANK", "Window Functions", "ROUND"],
    description: `<h3>Table: <code>TestScores</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>student_id</td><td>int</td></tr>
<tr><td>subject</td><td>varchar</td></tr>
<tr><td>score</td><td>numeric</td></tr>
</table>
<p>The combination of <code>(student_id, subject)</code> is unique.</p>
<p>Write a query to calculate the percentile rank of each student's score within each subject. Round to 4 decimal places.</p>
<p><strong>Expected Output columns:</strong> <code>subject</code>, <code>student_id</code>, <code>score</code>, <code>percentile</code></p>`,
    starter: "",
    solution: `SELECT subject,
       student_id,
       score,
       ROUND(PERCENT_RANK() OVER (PARTITION BY subject ORDER BY score)::numeric, 4) AS percentile
FROM TestScores
ORDER BY subject, percentile;`,
    hint: "PERCENT_RANK() returns (rank - 1) / (total_rows - 1). Partition by subject and order by score."
  },
  {
    id: 64,
    title: "FIRST_VALUE and LAST_VALUE per Group",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Netflix", "Spotify", "Apple"],
    acceptance: 42,
    tags: ["FIRST_VALUE", "LAST_VALUE", "Window Functions"],
    description: `<h3>Table: <code>Deliveries</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>delivery_id</td><td>int</td></tr>
<tr><td>driver_id</td><td>int</td></tr>
<tr><td>delivery_time</td><td>timestamp</td></tr>
<tr><td>distance_km</td><td>numeric</td></tr>
</table>
<p><code>delivery_id</code> is the primary key.</p>
<p>Write a query to show each delivery with the driver's first delivery distance and last delivery distance (by time) for comparison.</p>
<p><strong>Expected Output columns:</strong> <code>driver_id</code>, <code>delivery_time</code>, <code>distance_km</code>, <code>first_delivery_dist</code>, <code>last_delivery_dist</code></p>`,
    starter: "",
    solution: `SELECT driver_id,
       delivery_time,
       distance_km,
       FIRST_VALUE(distance_km) OVER (PARTITION BY driver_id ORDER BY delivery_time) AS first_delivery_dist,
       LAST_VALUE(distance_km) OVER (
         PARTITION BY driver_id ORDER BY delivery_time
         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
       ) AS last_delivery_dist
FROM Deliveries
ORDER BY driver_id, delivery_time;`,
    hint: "FIRST_VALUE works with default frame, but LAST_VALUE needs ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING to see all rows."
  },
  {
    id: 65,
    title: "Recursive CTE: Generate Date Series",
    difficulty: "Medium",
    category: "Recursive CTE",
    companies: ["Databricks", "Snowflake", "Google"],
    acceptance: 41,
    tags: ["Recursive CTE", "generate_series", "Date Functions"],
    description: `<h3>Table: <code>DailySales</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>sale_date</td><td>date</td></tr>
<tr><td>amount</td><td>numeric</td></tr>
</table>
<p><code>sale_date</code> is the primary key but not every day has a record.</p>
<p>Write a query using a recursive CTE to generate all dates between the earliest and latest sale_date, then LEFT JOIN with DailySales to fill gaps with 0. Show every date.</p>
<p><strong>Expected Output columns:</strong> <code>date</code>, <code>amount</code></p>`,
    starter: "",
    solution: `WITH RECURSIVE DateRange AS (
  SELECT MIN(sale_date) AS dt
  FROM DailySales
  UNION ALL
  SELECT dt + INTERVAL '1 day'
  FROM DateRange
  WHERE dt < (SELECT MAX(sale_date) FROM DailySales)
)
SELECT dr.dt::date AS date,
       COALESCE(ds.amount, 0) AS amount
FROM DateRange dr
LEFT JOIN DailySales ds ON dr.dt::date = ds.sale_date
ORDER BY dr.dt;`,
    hint: "Build a recursive CTE that starts at the min date and adds 1 day until the max date, then LEFT JOIN to the sales table."
  },
  {
    id: 66,
    title: "Recursive CTE: Org Chart Depth",
    difficulty: "Medium",
    category: "Recursive CTE",
    companies: ["Microsoft", "Google", "LinkedIn"],
    acceptance: 39,
    tags: ["Recursive CTE", "Hierarchy", "Self Join"],
    description: `<h3>Table: <code>Employees</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>emp_id</td><td>int</td></tr>
<tr><td>name</td><td>varchar</td></tr>
<tr><td>manager_id</td><td>int</td></tr>
</table>
<p><code>emp_id</code> is the primary key. <code>manager_id</code> is NULL for the CEO.</p>
<p>Write a recursive CTE to compute the org chart depth (level) for each employee. The CEO is level 1.</p>
<p><strong>Expected Output columns:</strong> <code>emp_id</code>, <code>name</code>, <code>manager_id</code>, <code>level</code></p>`,
    starter: "",
    solution: `WITH RECURSIVE OrgChart AS (
  SELECT emp_id, name, manager_id, 1 AS level
  FROM Employees
  WHERE manager_id IS NULL
  UNION ALL
  SELECT e.emp_id, e.name, e.manager_id, oc.level + 1
  FROM Employees e
  JOIN OrgChart oc ON e.manager_id = oc.emp_id
)
SELECT emp_id, name, manager_id, level
FROM OrgChart
ORDER BY level, emp_id;`,
    hint: "Start with the CEO (manager_id IS NULL) at level 1, then recursively join employees whose manager_id matches the current emp_id."
  },
  {
    id: 67,
    title: "String Aggregation with STRING_AGG",
    difficulty: "Medium",
    category: "String Functions (advanced)",
    companies: ["Airbnb", "Pinterest", "Zillow"],
    acceptance: 56,
    tags: ["STRING_AGG", "GROUP BY", "String Functions"],
    description: `<h3>Table: <code>StudentCourses</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>student_id</td><td>int</td></tr>
<tr><td>student_name</td><td>varchar</td></tr>
<tr><td>course</td><td>varchar</td></tr>
</table>
<p>The combination of <code>(student_id, course)</code> is unique.</p>
<p>Write a query to list each student with all their courses concatenated into a single comma-separated string, ordered alphabetically.</p>
<p><strong>Expected Output columns:</strong> <code>student_id</code>, <code>student_name</code>, <code>courses</code></p>`,
    starter: "",
    solution: `SELECT student_id,
       student_name,
       STRING_AGG(course, ', ' ORDER BY course) AS courses
FROM StudentCourses
GROUP BY student_id, student_name
ORDER BY student_id;`,
    hint: "STRING_AGG(column, delimiter ORDER BY column) concatenates values into one string with a custom separator."
  },
  {
    id: 68,
    title: "Parse and Aggregate URL Domains",
    difficulty: "Medium",
    category: "String Functions (advanced)",
    companies: ["Google", "Meta", "TikTok"],
    acceptance: 43,
    tags: ["SUBSTRING", "POSITION", "String Functions", "Aggregation"],
    description: `<h3>Table: <code>PageViews</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>view_id</td><td>int</td></tr>
<tr><td>user_id</td><td>int</td></tr>
<tr><td>url</td><td>varchar</td></tr>
<tr><td>view_time</td><td>timestamp</td></tr>
</table>
<p><code>view_id</code> is the primary key. URLs are in the format <code>https://domain.com/path</code>.</p>
<p>Write a query to extract the domain from each URL (between <code>//</code> and the next <code>/</code>) and count page views per domain. Return the top 10 domains by view count.</p>
<p><strong>Expected Output columns:</strong> <code>domain</code>, <code>view_count</code></p>`,
    starter: "",
    solution: `SELECT SUBSTRING(url FROM '://([^/]+)') AS domain,
       COUNT(*) AS view_count
FROM PageViews
GROUP BY SUBSTRING(url FROM '://([^/]+)')
ORDER BY view_count DESC
LIMIT 10;`,
    hint: "Use SUBSTRING with a regex pattern '://([^/]+)' to capture the domain between :// and the next slash."
  },
  {
    id: 69,
    title: "EXISTS with Aggregation: Active Departments",
    difficulty: "Medium",
    category: "Correlated Subquery",
    companies: ["Salesforce", "Microsoft", "Bloomberg"],
    acceptance: 48,
    tags: ["EXISTS", "Correlated Subquery", "HAVING"],
    description: `<h3>Table: <code>Departments</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>dept_id</td><td>int</td></tr>
<tr><td>dept_name</td><td>varchar</td></tr>
</table>
<p><code>dept_id</code> is the primary key.</p>
<h3>Table: <code>Employees</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>emp_id</td><td>int</td></tr>
<tr><td>dept_id</td><td>int</td></tr>
<tr><td>hire_date</td><td>date</td></tr>
<tr><td>salary</td><td>numeric</td></tr>
</table>
<p><code>emp_id</code> is the primary key.</p>
<p>Write a query to find departments that have at least 5 employees with a salary above 60000. Use EXISTS.</p>
<p><strong>Expected Output columns:</strong> <code>dept_id</code>, <code>dept_name</code></p>`,
    starter: "",
    solution: `SELECT d.dept_id, d.dept_name
FROM Departments d
WHERE EXISTS (
  SELECT 1
  FROM Employees e
  WHERE e.dept_id = d.dept_id
    AND e.salary > 60000
  GROUP BY e.dept_id
  HAVING COUNT(*) >= 5
)
ORDER BY d.dept_id;`,
    hint: "Use EXISTS with a correlated subquery that groups by dept_id, filters salary > 60000, and uses HAVING COUNT(*) >= 5."
  },
  {
    id: 70,
    title: "Median Salary per Department",
    difficulty: "Medium",
    category: "Percentile",
    companies: ["Meta", "Goldman Sachs", "Robinhood"],
    acceptance: 39,
    tags: ["PERCENTILE_CONT", "Window Functions", "Median"],
    description: `<h3>Table: <code>Employees</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>emp_id</td><td>int</td></tr>
<tr><td>department</td><td>varchar</td></tr>
<tr><td>salary</td><td>numeric</td></tr>
</table>
<p><code>emp_id</code> is the primary key.</p>
<p>Write a query to find the median salary for each department. Round to 2 decimal places.</p>
<p><strong>Expected Output columns:</strong> <code>department</code>, <code>median_salary</code></p>`,
    starter: "",
    solution: `SELECT department,
       ROUND(PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary)::numeric, 2) AS median_salary
FROM Employees
GROUP BY department
ORDER BY department;`,
    hint: "Use PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) as an aggregate function grouped by department."
  },
  {
    id: 71,
    title: "LEAD to Find Next Purchase Date",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Amazon", "Instacart", "DoorDash"],
    acceptance: 52,
    tags: ["LEAD", "Window Functions", "Date Functions"],
    description: `<h3>Table: <code>Purchases</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>purchase_id</td><td>int</td></tr>
<tr><td>customer_id</td><td>int</td></tr>
<tr><td>purchase_date</td><td>date</td></tr>
<tr><td>amount</td><td>numeric</td></tr>
</table>
<p><code>purchase_id</code> is the primary key.</p>
<p>Write a query to show each purchase alongside the next purchase date for the same customer and the number of days until the next purchase.</p>
<p><strong>Expected Output columns:</strong> <code>customer_id</code>, <code>purchase_date</code>, <code>amount</code>, <code>next_purchase_date</code>, <code>days_until_next</code></p>`,
    starter: "",
    solution: `SELECT customer_id,
       purchase_date,
       amount,
       LEAD(purchase_date) OVER (PARTITION BY customer_id ORDER BY purchase_date) AS next_purchase_date,
       LEAD(purchase_date) OVER (PARTITION BY customer_id ORDER BY purchase_date) - purchase_date AS days_until_next
FROM Purchases
ORDER BY customer_id, purchase_date;`,
    hint: "LEAD(purchase_date) OVER (PARTITION BY customer_id ORDER BY purchase_date) gives the next purchase date. Subtract to get days."
  },
  {
    id: 72,
    title: "Revenue Contribution per Category CTE",
    difficulty: "Medium",
    category: "CTE",
    companies: ["Walmart", "Target", "Nike"],
    acceptance: 50,
    tags: ["CTE", "Window Functions", "ROUND"],
    description: `<h3>Table: <code>Sales</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>sale_id</td><td>int</td></tr>
<tr><td>category</td><td>varchar</td></tr>
<tr><td>amount</td><td>numeric</td></tr>
<tr><td>sale_date</td><td>date</td></tr>
</table>
<p><code>sale_id</code> is the primary key.</p>
<p>Using a CTE, compute each category's total revenue and its percentage of overall revenue. Return categories sorted by contribution descending.</p>
<p><strong>Expected Output columns:</strong> <code>category</code>, <code>category_revenue</code>, <code>total_revenue</code>, <code>contribution_pct</code></p>`,
    starter: "",
    solution: `WITH CategoryRevenue AS (
  SELECT category,
         SUM(amount) AS category_revenue
  FROM Sales
  GROUP BY category
),
TotalRevenue AS (
  SELECT SUM(category_revenue) AS total_revenue
  FROM CategoryRevenue
)
SELECT cr.category,
       cr.category_revenue,
       tr.total_revenue,
       ROUND(cr.category_revenue * 100.0 / tr.total_revenue, 2) AS contribution_pct
FROM CategoryRevenue cr
CROSS JOIN TotalRevenue tr
ORDER BY contribution_pct DESC;`,
    hint: "Use one CTE for per-category revenue and another for the grand total. CROSS JOIN them to compute percentages."
  },
  {
    id: 73,
    title: "Self Join: Find Mutual Friends",
    difficulty: "Medium",
    category: "Self Join",
    companies: ["Meta", "LinkedIn", "Snap"],
    acceptance: 40,
    tags: ["Self Join", "INNER JOIN", "DISTINCT"],
    description: `<h3>Table: <code>Friendships</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>user_id</td><td>int</td></tr>
<tr><td>friend_id</td><td>int</td></tr>
</table>
<p>Each row represents a one-way friendship. If user 1 is friends with user 2, both <code>(1, 2)</code> and <code>(2, 1)</code> exist.</p>
<p>Write a query to find all mutual friends between user_id 1 and user_id 2. A mutual friend is someone who appears in both user 1's and user 2's friend lists.</p>
<p><strong>Expected Output columns:</strong> <code>mutual_friend_id</code></p>`,
    starter: "",
    solution: `SELECT f1.friend_id AS mutual_friend_id
FROM Friendships f1
JOIN Friendships f2
  ON f1.friend_id = f2.friend_id
WHERE f1.user_id = 1
  AND f2.user_id = 2
  AND f1.friend_id NOT IN (1, 2)
ORDER BY mutual_friend_id;`,
    hint: "Join Friendships to itself where both user 1 and user 2 share the same friend_id. Exclude users 1 and 2 themselves."
  },
  {
    id: 74,
    title: "Conditional Aggregation: Weekday vs Weekend",
    difficulty: "Medium",
    category: "CASE/Pivot",
    companies: ["Uber", "DoorDash", "Airbnb"],
    acceptance: 53,
    tags: ["CASE", "EXTRACT", "Conditional Aggregation"],
    description: `<h3>Table: <code>Rides</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>ride_id</td><td>int</td></tr>
<tr><td>ride_date</td><td>date</td></tr>
<tr><td>fare</td><td>numeric</td></tr>
<tr><td>city</td><td>varchar</td></tr>
</table>
<p><code>ride_id</code> is the primary key.</p>
<p>Write a query to show each city's average fare for weekdays vs. weekends. Use EXTRACT(dow ...) where 0=Sunday and 6=Saturday.</p>
<p><strong>Expected Output columns:</strong> <code>city</code>, <code>avg_weekday_fare</code>, <code>avg_weekend_fare</code></p>`,
    starter: "",
    solution: `SELECT city,
       ROUND(AVG(CASE WHEN EXTRACT(dow FROM ride_date) BETWEEN 1 AND 5 THEN fare END), 2) AS avg_weekday_fare,
       ROUND(AVG(CASE WHEN EXTRACT(dow FROM ride_date) IN (0, 6) THEN fare END), 2) AS avg_weekend_fare
FROM Rides
GROUP BY city
ORDER BY city;`,
    hint: "Use EXTRACT(dow FROM ride_date) to get the day of week. Use CASE inside AVG to split weekday (1-5) and weekend (0,6)."
  },
  {
    id: 75,
    title: "Islands: Consecutive Active Subscriptions",
    difficulty: "Medium",
    category: "Gaps & Islands",
    companies: ["Netflix", "Spotify", "Apple"],
    acceptance: 38,
    tags: ["Gaps & Islands", "ROW_NUMBER", "Window Functions"],
    description: `<h3>Table: <code>SubscriptionHistory</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>user_id</td><td>int</td></tr>
<tr><td>month</td><td>date</td></tr>
<tr><td>status</td><td>varchar</td></tr>
</table>
<p>The combination of <code>(user_id, month)</code> is unique. <code>month</code> is always the first of the month. Status is 'active' or 'inactive'.</p>
<p>Write a query to find the longest consecutive run of 'active' months for each user.</p>
<p><strong>Expected Output columns:</strong> <code>user_id</code>, <code>longest_active_streak</code></p>`,
    starter: "",
    solution: `WITH ActiveMonths AS (
  SELECT user_id,
         month,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY month) AS rn_all,
         ROW_NUMBER() OVER (PARTITION BY user_id, status ORDER BY month) AS rn_status
  FROM SubscriptionHistory
  WHERE status = 'active'
),
Grouped AS (
  SELECT user_id,
         COUNT(*) AS streak_length
  FROM ActiveMonths
  GROUP BY user_id, (month - (rn_status || ' months')::interval)
)
SELECT user_id,
       MAX(streak_length) AS longest_active_streak
FROM Grouped
GROUP BY user_id
ORDER BY user_id;`,
    hint: "Filter to 'active' rows, then use the ROW_NUMBER subtraction trick: month minus a row number interval gives the same value for consecutive months."
  },
  {
    id: 76,
    title: "Generate Series for Time Slots",
    difficulty: "Medium",
    category: "Recursive CTE",
    companies: ["Uber", "Airbnb", "Expedia"],
    acceptance: 45,
    tags: ["generate_series", "LEFT JOIN", "Date Functions"],
    description: `<h3>Table: <code>Appointments</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>appt_id</td><td>int</td></tr>
<tr><td>appt_hour</td><td>int</td></tr>
<tr><td>patient_name</td><td>varchar</td></tr>
</table>
<p><code>appt_id</code> is the primary key. <code>appt_hour</code> is an integer from 8 to 17 representing the hour of the appointment.</p>
<p>Write a query using <code>generate_series</code> to show all hours from 8 to 17, with the count of appointments per hour. Hours with no appointments should show 0.</p>
<p><strong>Expected Output columns:</strong> <code>hour</code>, <code>appointment_count</code></p>`,
    starter: "",
    solution: `SELECT gs.hour,
       COUNT(a.appt_id) AS appointment_count
FROM generate_series(8, 17) AS gs(hour)
LEFT JOIN Appointments a ON gs.hour = a.appt_hour
GROUP BY gs.hour
ORDER BY gs.hour;`,
    hint: "Use generate_series(8, 17) to create all hours, then LEFT JOIN to Appointments. COUNT of a nullable column ignores NULLs."
  },
  {
    id: 77,
    title: "Retention Rate: Month-over-Month",
    difficulty: "Medium",
    category: "CTE",
    companies: ["Meta", "TikTok", "Pinterest"],
    acceptance: 39,
    tags: ["CTE", "Self Join", "DATE_TRUNC", "Retention"],
    description: `<h3>Table: <code>UserActivity</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>activity_id</td><td>int</td></tr>
<tr><td>user_id</td><td>int</td></tr>
<tr><td>activity_date</td><td>date</td></tr>
</table>
<p><code>activity_id</code> is the primary key.</p>
<p>Write a query to calculate the month-over-month retention rate: the percentage of users active in month M who were also active in month M+1. Round to 2 decimal places.</p>
<p><strong>Expected Output columns:</strong> <code>month</code>, <code>active_users</code>, <code>retained_users</code>, <code>retention_rate</code></p>`,
    starter: "",
    solution: `WITH MonthlyUsers AS (
  SELECT DISTINCT user_id,
         DATE_TRUNC('month', activity_date) AS month
  FROM UserActivity
)
SELECT m1.month,
       COUNT(DISTINCT m1.user_id) AS active_users,
       COUNT(DISTINCT m2.user_id) AS retained_users,
       ROUND(COUNT(DISTINCT m2.user_id) * 100.0 / COUNT(DISTINCT m1.user_id), 2) AS retention_rate
FROM MonthlyUsers m1
LEFT JOIN MonthlyUsers m2
  ON m1.user_id = m2.user_id
  AND m2.month = m1.month + INTERVAL '1 month'
GROUP BY m1.month
ORDER BY m1.month;`,
    hint: "Create a CTE of distinct user-month pairs, then self-join where the second month equals the first month + 1 month interval."
  },
  {
    id: 78,
    title: "Top N per Group with Ties",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Google", "Amazon", "Databricks"],
    acceptance: 45,
    tags: ["DENSE_RANK", "Window Functions", "Top N"],
    description: `<h3>Table: <code>Products</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>product_id</td><td>int</td></tr>
<tr><td>category</td><td>varchar</td></tr>
<tr><td>product_name</td><td>varchar</td></tr>
<tr><td>revenue</td><td>numeric</td></tr>
</table>
<p><code>product_id</code> is the primary key.</p>
<p>Write a query to find the top 3 products by revenue within each category. If products are tied in revenue, include all tied products (so more than 3 may appear for a category).</p>
<p><strong>Expected Output columns:</strong> <code>category</code>, <code>product_name</code>, <code>revenue</code>, <code>revenue_rank</code></p>`,
    starter: "",
    solution: `SELECT category, product_name, revenue, revenue_rank
FROM (
  SELECT category,
         product_name,
         revenue,
         DENSE_RANK() OVER (PARTITION BY category ORDER BY revenue DESC) AS revenue_rank
  FROM Products
) ranked
WHERE revenue_rank <= 3
ORDER BY category, revenue_rank;`,
    hint: "Use DENSE_RANK instead of ROW_NUMBER so ties share the same rank. Filter where rank <= 3 to include all ties."
  },
  {
    id: 79,
    title: "Date Difference Bucketing",
    difficulty: "Medium",
    category: "Date Functions",
    companies: ["Stripe", "PayPal", "Visa"],
    acceptance: 51,
    tags: ["CASE", "Date Functions", "Aggregation", "Bucketing"],
    description: `<h3>Table: <code>Invoices</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>invoice_id</td><td>int</td></tr>
<tr><td>issued_date</td><td>date</td></tr>
<tr><td>paid_date</td><td>date</td></tr>
<tr><td>amount</td><td>numeric</td></tr>
</table>
<p><code>invoice_id</code> is the primary key. <code>paid_date</code> can be NULL if unpaid.</p>
<p>Write a query to categorize invoices into payment buckets based on how many days it took to pay: '0-7 days', '8-30 days', '31-60 days', '60+ days', and 'Unpaid'. Count and sum the amount per bucket.</p>
<p><strong>Expected Output columns:</strong> <code>payment_bucket</code>, <code>invoice_count</code>, <code>total_amount</code></p>`,
    starter: "",
    solution: `SELECT CASE
         WHEN paid_date IS NULL THEN 'Unpaid'
         WHEN paid_date - issued_date <= 7 THEN '0-7 days'
         WHEN paid_date - issued_date <= 30 THEN '8-30 days'
         WHEN paid_date - issued_date <= 60 THEN '31-60 days'
         ELSE '60+ days'
       END AS payment_bucket,
       COUNT(*) AS invoice_count,
       SUM(amount) AS total_amount
FROM Invoices
GROUP BY payment_bucket
ORDER BY CASE payment_bucket
  WHEN '0-7 days' THEN 1
  WHEN '8-30 days' THEN 2
  WHEN '31-60 days' THEN 3
  WHEN '60+ days' THEN 4
  WHEN 'Unpaid' THEN 5
END;`,
    hint: "Use CASE with paid_date - issued_date to assign buckets. Check for NULL first (unpaid). Group by the CASE expression."
  },
  {
    id: 80,
    title: "Cumulative Distinct Count Over Time",
    difficulty: "Medium",
    category: "Aggregation (advanced)",
    companies: ["Snowflake", "Databricks", "Meta"],
    acceptance: 38,
    tags: ["CTE", "Window Functions", "COUNT DISTINCT", "Cumulative"],
    description: `<h3>Table: <code>Signups</code></h3>
<table>
<tr><th>Column Name</th><th>Type</th></tr>
<tr><td>signup_id</td><td>int</td></tr>
<tr><td>user_id</td><td>int</td></tr>
<tr><td>signup_date</td><td>date</td></tr>
</table>
<p><code>signup_id</code> is the primary key. A user may appear multiple times if they re-signed up.</p>
<p>Write a query to compute the cumulative number of unique users over time (by signup_date). Each date should show the total number of distinct users who have signed up on or before that date.</p>
<p><strong>Expected Output columns:</strong> <code>signup_date</code>, <code>new_users_today</code>, <code>cumulative_unique_users</code></p>`,
    starter: "",
    solution: `WITH FirstSignup AS (
  SELECT user_id,
         MIN(signup_date) AS first_signup_date
  FROM Signups
  GROUP BY user_id
),
DailyNew AS (
  SELECT first_signup_date AS signup_date,
         COUNT(*) AS new_users_today
  FROM FirstSignup
  GROUP BY first_signup_date
)
SELECT signup_date,
       new_users_today,
       SUM(new_users_today) OVER (ORDER BY signup_date) AS cumulative_unique_users
FROM DailyNew
ORDER BY signup_date;`,
    hint: "First find each user's earliest signup date, count new users per day, then use a cumulative SUM window function."
  },
  {
    id: 81,
    title: "Employee Organizational Hierarchy",
    difficulty: "Hard",
    category: "Recursive CTE",
    companies: ["Google", "Amazon", "Stripe"],
    acceptance: 24,
    tags: ["recursive CTE", "hierarchy traversal", "self-join"],
    description: `<p>Table: <code>employees</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| employee_id    | int     |
| name           | varchar |
| manager_id     | int     |
| salary         | int     |
+----------------+---------+
employee_id is the primary key.
manager_id references employee_id (NULL for CEO).
</pre>
<p>Write a query to return each employee's name, their level in the hierarchy (CEO = 1), and the full management chain from the CEO down to them as a slash-separated path. Order by level, then name.</p>`,
    starter: "",
    solution: `WITH RECURSIVE hierarchy AS (
  SELECT employee_id, name, manager_id, salary, 1 AS level, name AS path
  FROM employees
  WHERE manager_id IS NULL
  UNION ALL
  SELECT e.employee_id, e.name, e.manager_id, e.salary, h.level + 1, h.path || '/' || e.name
  FROM employees e
  JOIN hierarchy h ON e.manager_id = h.employee_id
)
SELECT name, level, path
FROM hierarchy
ORDER BY level, name;`,
    hint: "Use a recursive CTE starting from rows where manager_id IS NULL, concatenating names to build the path at each level."
  },
  {
    id: 82,
    title: "Find Gaps in Sequential IDs",
    difficulty: "Hard",
    category: "Gaps & Islands",
    companies: ["Meta", "Bloomberg", "Robinhood"],
    acceptance: 27,
    tags: ["gaps and islands", "LEAD", "window functions"],
    description: `<p>Table: <code>orders</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| order_id       | int     |
| customer_id    | int     |
| order_date     | date    |
+----------------+---------+
order_id is the primary key.
</pre>
<p>Order IDs should be sequential with no gaps. Write a query to find every gap — return <code>gap_start</code> (the first missing ID) and <code>gap_end</code> (the last missing ID in that contiguous gap). Order by gap_start.</p>`,
    starter: "",
    solution: `WITH gaps AS (
  SELECT order_id, LEAD(order_id) OVER (ORDER BY order_id) AS next_id
  FROM orders
)
SELECT order_id + 1 AS gap_start, next_id - 1 AS gap_end
FROM gaps
WHERE next_id - order_id > 1
ORDER BY gap_start;`,
    hint: "Use LEAD to peek at the next order_id. Wherever the difference is greater than 1, you have a gap."
  },
  {
    id: 83,
    title: "User Session Identification",
    difficulty: "Hard",
    category: "Sessionization",
    companies: ["Netflix", "Spotify", "Datadog"],
    acceptance: 22,
    tags: ["sessionization", "window functions", "LAG"],
    description: `<p>Table: <code>page_views</code></p>
<pre>
+----------------+-----------+
| Column Name    | Type      |
+----------------+-----------+
| user_id        | int       |
| page           | varchar   |
| view_time      | timestamp |
+----------------+-----------+
(user_id, view_time) is the primary key.
</pre>
<p>A new session starts whenever the gap between consecutive page views for the same user exceeds 30 minutes. Assign a session_id (starting at 1 per user) to each page view. Return user_id, page, view_time, and session_id ordered by user_id, view_time.</p>`,
    starter: "",
    solution: `WITH flagged AS (
  SELECT user_id, page, view_time,
    CASE WHEN EXTRACT(EPOCH FROM view_time - LAG(view_time) OVER (PARTITION BY user_id ORDER BY view_time)) > 1800
         OR LAG(view_time) OVER (PARTITION BY user_id ORDER BY view_time) IS NULL
         THEN 1 ELSE 0 END AS new_session
  FROM page_views
)
SELECT user_id, page, view_time,
  SUM(new_session) OVER (PARTITION BY user_id ORDER BY view_time) AS session_id
FROM flagged
ORDER BY user_id, view_time;`,
    hint: "Use LAG to compare each view_time with the previous one per user. Flag a new session when the gap > 30 minutes, then use a running SUM of those flags."
  },
  {
    id: 84,
    title: "Funnel Conversion Rates",
    difficulty: "Hard",
    category: "Funnel Analysis",
    companies: ["Airbnb", "Uber", "Square"],
    acceptance: 25,
    tags: ["funnel analysis", "conditional aggregation", "CASE"],
    description: `<p>Table: <code>events</code></p>
<pre>
+----------------+-----------+
| Column Name    | Type      |
+----------------+-----------+
| user_id        | int       |
| event_name     | varchar   |
| event_time     | timestamp |
+----------------+-----------+
</pre>
<p>The purchase funnel has steps in order: 'page_view' → 'add_to_cart' → 'checkout' → 'purchase'. For each step, report the number of distinct users who reached it and the conversion rate from the previous step (NULL for the first step). Steps must occur in chronological order per user. Order by step number.</p>`,
    starter: "",
    solution: `WITH user_funnel AS (
  SELECT user_id,
    MIN(event_time) FILTER (WHERE event_name = 'page_view') AS t1,
    MIN(event_time) FILTER (WHERE event_name = 'add_to_cart') AS t2,
    MIN(event_time) FILTER (WHERE event_name = 'checkout') AS t3,
    MIN(event_time) FILTER (WHERE event_name = 'purchase') AS t4
  FROM events
  GROUP BY user_id
),
reached AS (
  SELECT
    COUNT(*) FILTER (WHERE t1 IS NOT NULL) AS step1,
    COUNT(*) FILTER (WHERE t2 IS NOT NULL AND t2 > t1) AS step2,
    COUNT(*) FILTER (WHERE t3 IS NOT NULL AND t3 > t2 AND t2 > t1) AS step3,
    COUNT(*) FILTER (WHERE t4 IS NOT NULL AND t4 > t3 AND t3 > t2 AND t2 > t1) AS step4
  FROM user_funnel
)
SELECT 1 AS step, 'page_view' AS event_name, step1 AS users, NULL::numeric AS conversion_rate FROM reached
UNION ALL
SELECT 2, 'add_to_cart', step2, ROUND(100.0 * step2 / NULLIF(step1, 0), 2) FROM reached
UNION ALL
SELECT 3, 'checkout', step3, ROUND(100.0 * step3 / NULLIF(step2, 0), 2) FROM reached
UNION ALL
SELECT 4, 'purchase', step4, ROUND(100.0 * step4 / NULLIF(step3, 0), 2) FROM reached
ORDER BY step;`,
    hint: "For each user, find the earliest timestamp for each funnel step. Only count a user at step N if step N happened after step N-1."
  },
  {
    id: 85,
    title: "Weekly Cohort Retention",
    difficulty: "Hard",
    category: "Retention Analysis",
    companies: ["Meta", "Pinterest", "Affirm"],
    acceptance: 21,
    tags: ["retention analysis", "cohort", "date arithmetic"],
    description: `<p>Table: <code>user_activity</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| user_id        | int     |
| activity_date  | date    |
+----------------+---------+
</pre>
<p>Each user's cohort week is the week (starting Monday) of their first activity. For each cohort week, calculate the percentage of users who were active in week 0, week 1, week 2, and week 3 after their cohort week. Return cohort_week, week_number (0-3), active_users, cohort_size, and retention_pct. Order by cohort_week, week_number.</p>`,
    starter: "",
    solution: `WITH cohorts AS (
  SELECT user_id,
    DATE_TRUNC('week', MIN(activity_date))::date AS cohort_week
  FROM user_activity
  GROUP BY user_id
),
activity_weeks AS (
  SELECT DISTINCT a.user_id, c.cohort_week,
    (DATE_TRUNC('week', a.activity_date)::date - c.cohort_week) / 7 AS week_number
  FROM user_activity a
  JOIN cohorts c ON a.user_id = c.user_id
),
cohort_sizes AS (
  SELECT cohort_week, COUNT(*) AS cohort_size
  FROM cohorts
  GROUP BY cohort_week
)
SELECT aw.cohort_week, aw.week_number,
  COUNT(DISTINCT aw.user_id) AS active_users,
  cs.cohort_size,
  ROUND(100.0 * COUNT(DISTINCT aw.user_id) / cs.cohort_size, 2) AS retention_pct
FROM activity_weeks aw
JOIN cohort_sizes cs ON aw.cohort_week = cs.cohort_week
WHERE aw.week_number BETWEEN 0 AND 3
GROUP BY aw.cohort_week, aw.week_number, cs.cohort_size
ORDER BY aw.cohort_week, aw.week_number;`,
    hint: "Assign each user a cohort week based on their first activity. Then compute the integer week offset for each activity and aggregate retention per cohort per offset."
  },
  {
    id: 86,
    title: "Median Salary Without Built-in",
    difficulty: "Hard",
    category: "Median/Percentile",
    companies: ["Goldman Sachs", "JPMorgan", "Citadel"],
    acceptance: 28,
    tags: ["median", "ROW_NUMBER", "COUNT"],
    description: `<p>Table: <code>salaries</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| department     | varchar |
| employee_id    | int     |
| salary         | int     |
+----------------+---------+
employee_id is the primary key.
</pre>
<p>Write a query to compute the <strong>median salary</strong> for each department without using PERCENTILE_CONT or similar built-in median functions. For an even count, return the average of the two middle values. Return department and median_salary (rounded to 2 decimals). Order by department.</p>`,
    starter: "",
    solution: `WITH ranked AS (
  SELECT department, salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary) AS rn,
    COUNT(*) OVER (PARTITION BY department) AS cnt
  FROM salaries
)
SELECT department,
  ROUND(AVG(salary), 2) AS median_salary
FROM ranked
WHERE rn IN (FLOOR((cnt + 1) / 2.0), CEIL((cnt + 1) / 2.0))
GROUP BY department
ORDER BY department;`,
    hint: "Use ROW_NUMBER and COUNT per department. The median rows are at positions FLOOR and CEIL of (count+1)/2. Average those rows."
  },
  {
    id: 87,
    title: "Running Total with Monthly Reset",
    difficulty: "Hard",
    category: "Complex Window Functions",
    companies: ["Apple", "Stripe", "Plaid"],
    acceptance: 26,
    tags: ["running total", "window functions", "PARTITION BY"],
    description: `<p>Table: <code>daily_sales</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| sale_date      | date    |
| store_id       | int     |
| amount         | numeric |
+----------------+---------+
(sale_date, store_id) is the primary key.
</pre>
<p>For each store and date, calculate a running total of amount that resets at the beginning of each month. Return store_id, sale_date, amount, and mtd_total. Order by store_id, sale_date.</p>`,
    starter: "",
    solution: `SELECT store_id, sale_date, amount,
  SUM(amount) OVER (
    PARTITION BY store_id, DATE_TRUNC('month', sale_date)
    ORDER BY sale_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS mtd_total
FROM daily_sales
ORDER BY store_id, sale_date;`,
    hint: "Partition by both store_id and the month (DATE_TRUNC), then use SUM with a window frame from UNBOUNDED PRECEDING to CURRENT ROW."
  },
  {
    id: 88,
    title: "Overlapping Meeting Intervals",
    difficulty: "Hard",
    category: "Advanced Joins",
    companies: ["Google", "Microsoft", "Zoom"],
    acceptance: 23,
    tags: ["overlapping intervals", "self-join", "timestamp"],
    description: `<p>Table: <code>meetings</code></p>
<pre>
+----------------+-----------+
| Column Name    | Type      |
+----------------+-----------+
| meeting_id     | int       |
| room_id        | int       |
| start_time     | timestamp |
| end_time       | timestamp |
+----------------+-----------+
meeting_id is the primary key.
</pre>
<p>Find all pairs of meetings that overlap in the same room. Two meetings overlap if one starts before the other ends and vice versa. Return room_id, meeting_id_1 (smaller id), meeting_id_2 (larger id), and the overlap duration in minutes. Order by room_id, meeting_id_1, meeting_id_2.</p>`,
    starter: "",
    solution: `SELECT a.room_id,
  a.meeting_id AS meeting_id_1,
  b.meeting_id AS meeting_id_2,
  EXTRACT(EPOCH FROM (LEAST(a.end_time, b.end_time) - GREATEST(a.start_time, b.start_time))) / 60 AS overlap_minutes
FROM meetings a
JOIN meetings b
  ON a.room_id = b.room_id
  AND a.meeting_id < b.meeting_id
  AND a.start_time < b.end_time
  AND b.start_time < a.end_time
ORDER BY a.room_id, a.meeting_id, b.meeting_id;`,
    hint: "Self-join meetings on the same room where IDs differ. Two intervals [s1,e1) and [s2,e2) overlap when s1 < e2 AND s2 < e1. The overlap length is LEAST(e1,e2) - GREATEST(s1,s2)."
  },
  {
    id: 89,
    title: "Pivot Monthly Revenue by Product",
    difficulty: "Medium",
    category: "Pivot/Unpivot",
    companies: ["Amazon", "Shopify", "Klarna"],
    acceptance: 42,
    tags: ["pivot", "conditional aggregation", "CASE"],
    description: `<p>Table: <code>revenue</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| product_name   | varchar |
| revenue_month  | date    |
| amount         | numeric |
+----------------+---------+
</pre>
<p>Pivot the table so that each row is a product and each column is a month. Output columns: product_name, jan, feb, mar, apr, may, jun. Show 0 for months with no revenue. Order by product_name.</p>`,
    starter: "",
    solution: `SELECT product_name,
  COALESCE(SUM(amount) FILTER (WHERE EXTRACT(MONTH FROM revenue_month) = 1), 0) AS jan,
  COALESCE(SUM(amount) FILTER (WHERE EXTRACT(MONTH FROM revenue_month) = 2), 0) AS feb,
  COALESCE(SUM(amount) FILTER (WHERE EXTRACT(MONTH FROM revenue_month) = 3), 0) AS mar,
  COALESCE(SUM(amount) FILTER (WHERE EXTRACT(MONTH FROM revenue_month) = 4), 0) AS apr,
  COALESCE(SUM(amount) FILTER (WHERE EXTRACT(MONTH FROM revenue_month) = 5), 0) AS may,
  COALESCE(SUM(amount) FILTER (WHERE EXTRACT(MONTH FROM revenue_month) = 6), 0) AS jun
FROM revenue
GROUP BY product_name
ORDER BY product_name;`,
    hint: "Use conditional aggregation with FILTER or CASE inside SUM for each target month."
  },
  {
    id: 90,
    title: "Graph Shortest Path Between Nodes",
    difficulty: "Hard",
    category: "Graph Traversal",
    companies: ["LinkedIn", "Twitter", "Palantir"],
    acceptance: 20,
    tags: ["graph traversal", "recursive CTE", "BFS"],
    description: `<p>Table: <code>edges</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| node_from      | int     |
| node_to        | int     |
| weight         | int     |
+----------------+---------+
Edges are bidirectional.
</pre>
<p>Find the shortest path (by total weight) from node 1 to every other reachable node. Return destination_node, total_weight, and the path as an array of node IDs. Order by destination_node.</p>`,
    starter: "",
    solution: `WITH RECURSIVE paths AS (
  SELECT 1 AS node, 0 AS total_weight, ARRAY[1] AS path
  UNION ALL
  SELECT
    CASE WHEN e.node_from = p.node THEN e.node_to ELSE e.node_from END,
    p.total_weight + e.weight,
    p.path || CASE WHEN e.node_from = p.node THEN e.node_to ELSE e.node_from END
  FROM paths p
  JOIN edges e ON (e.node_from = p.node OR e.node_to = p.node)
  WHERE NOT (CASE WHEN e.node_from = p.node THEN e.node_to ELSE e.node_from END) = ANY(p.path)
),
best AS (
  SELECT DISTINCT ON (node) node AS destination_node, total_weight, path
  FROM paths
  WHERE node != 1
  ORDER BY node, total_weight
)
SELECT destination_node, total_weight, path
FROM best
ORDER BY destination_node;`,
    hint: "Use a recursive CTE to explore all reachable paths from node 1. Track visited nodes in an array to avoid cycles. Then pick the minimum weight path per destination."
  },
  {
    id: 91,
    title: "Consecutive Login Streaks",
    difficulty: "Hard",
    category: "Gaps & Islands",
    companies: ["Snap", "TikTok", "Duolingo"],
    acceptance: 26,
    tags: ["gaps and islands", "consecutive sequences", "DATE arithmetic"],
    description: `<p>Table: <code>logins</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| user_id        | int     |
| login_date     | date    |
+----------------+---------+
(user_id, login_date) is the primary key.
</pre>
<p>Find the longest consecutive daily login streak for each user. Return user_id, streak_start, streak_end, and streak_length. If a user has multiple streaks of the same max length, return all of them. Order by user_id, streak_start.</p>`,
    starter: "",
    solution: `WITH grouped AS (
  SELECT user_id, login_date,
    login_date - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date))::int AS grp
  FROM logins
),
streaks AS (
  SELECT user_id, MIN(login_date) AS streak_start, MAX(login_date) AS streak_end,
    COUNT(*) AS streak_length
  FROM grouped
  GROUP BY user_id, grp
),
max_streaks AS (
  SELECT user_id, MAX(streak_length) AS max_length
  FROM streaks
  GROUP BY user_id
)
SELECT s.user_id, s.streak_start, s.streak_end, s.streak_length
FROM streaks s
JOIN max_streaks m ON s.user_id = m.user_id AND s.streak_length = m.max_length
ORDER BY s.user_id, s.streak_start;`,
    hint: "Subtract ROW_NUMBER from the date to create a group identifier for consecutive days. Group by that identifier to find streak boundaries and lengths."
  },
  {
    id: 92,
    title: "Correlated Subquery: Nth Highest Salary",
    difficulty: "Hard",
    category: "Correlated Subquery",
    companies: ["Amazon", "Goldman Sachs", "Two Sigma"],
    acceptance: 29,
    tags: ["correlated subquery", "DISTINCT", "ranking"],
    description: `<p>Table: <code>employees</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| employee_id    | int     |
| department_id  | int     |
| salary         | int     |
+----------------+---------+
employee_id is the primary key.
</pre>
<p>For each department, find the employee(s) earning the 3rd highest distinct salary. If a department has fewer than 3 distinct salaries, exclude it. Return department_id, employee_id, and salary. Order by department_id, employee_id.</p>`,
    starter: "",
    solution: `SELECT e.department_id, e.employee_id, e.salary
FROM employees e
WHERE e.salary = (
  SELECT DISTINCT salary
  FROM employees e2
  WHERE e2.department_id = e.department_id
  ORDER BY salary DESC
  OFFSET 2 LIMIT 1
)
ORDER BY e.department_id, e.employee_id;`,
    hint: "Use a correlated subquery that selects the 3rd highest DISTINCT salary in the same department using ORDER BY ... DESC OFFSET 2 LIMIT 1."
  },
  {
    id: 93,
    title: "Time Series Gap Filling",
    difficulty: "Hard",
    category: "Time Series",
    companies: ["Datadog", "Splunk", "Snowflake"],
    acceptance: 23,
    tags: ["time series", "generate_series", "LEFT JOIN"],
    description: `<p>Table: <code>sensor_readings</code></p>
<pre>
+----------------+-----------+
| Column Name    | Type      |
+----------------+-----------+
| sensor_id      | int       |
| reading_time   | timestamp |
| value          | numeric   |
+----------------+-----------+
</pre>
<p>Sensors should report every hour. For each sensor, generate a complete hourly timeline from its first to last reading and fill missing hours with the most recent known value (forward fill). Return sensor_id, reading_hour, and value. Order by sensor_id, reading_hour.</p>`,
    starter: "",
    solution: `WITH bounds AS (
  SELECT sensor_id,
    DATE_TRUNC('hour', MIN(reading_time)) AS min_hour,
    DATE_TRUNC('hour', MAX(reading_time)) AS max_hour
  FROM sensor_readings
  GROUP BY sensor_id
),
timeline AS (
  SELECT b.sensor_id, gs AS reading_hour
  FROM bounds b,
  LATERAL generate_series(b.min_hour, b.max_hour, INTERVAL '1 hour') gs
),
joined AS (
  SELECT t.sensor_id, t.reading_hour, s.value,
    COUNT(s.value) OVER (PARTITION BY t.sensor_id ORDER BY t.reading_hour) AS grp
  FROM timeline t
  LEFT JOIN sensor_readings s
    ON t.sensor_id = s.sensor_id
    AND DATE_TRUNC('hour', s.reading_time) = t.reading_hour
)
SELECT sensor_id, reading_hour,
  FIRST_VALUE(value) OVER (PARTITION BY sensor_id, grp ORDER BY reading_hour) AS value
FROM joined
ORDER BY sensor_id, reading_hour;`,
    hint: "Use generate_series to create a complete hourly timeline per sensor. LEFT JOIN actual readings. For forward fill, use COUNT of non-null values as a group ID and FIRST_VALUE within each group."
  },
  {
    id: 94,
    title: "LATERAL Join: Top N per Group",
    difficulty: "Hard",
    category: "Advanced Joins",
    companies: ["Uber", "DoorDash", "Instacart"],
    acceptance: 25,
    tags: ["LATERAL join", "top-N per group"],
    description: `<p>Table: <code>departments</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| dept_id        | int     |
| dept_name      | varchar |
+----------------+---------+
dept_id is the primary key.
</pre>
<p>Table: <code>employees</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| employee_id    | int     |
| dept_id        | int     |
| name           | varchar |
| salary         | int     |
+----------------+---------+
employee_id is the primary key.
</pre>
<p>Using a LATERAL join, return the top 3 highest-paid employees per department. Include dept_name, employee name, and salary. If fewer than 3 employees exist in a department, return all of them. Order by dept_name, salary DESC, name.</p>`,
    starter: "",
    solution: `SELECT d.dept_name, e.name, e.salary
FROM departments d,
LATERAL (
  SELECT name, salary
  FROM employees
  WHERE dept_id = d.dept_id
  ORDER BY salary DESC, name
  LIMIT 3
) e
ORDER BY d.dept_name, e.salary DESC, e.name;`,
    hint: "Use a LATERAL subquery that references the outer departments table. Inside the subquery, ORDER BY salary DESC and LIMIT 3."
  },
  {
    id: 95,
    title: "Detect Fraud: Rapid Successive Transactions",
    difficulty: "Hard",
    category: "Complex Window Functions",
    companies: ["PayPal", "Stripe", "Block"],
    acceptance: 27,
    tags: ["window functions", "LAG", "anti-pattern detection"],
    description: `<p>Table: <code>transactions</code></p>
<pre>
+------------------+-----------+
| Column Name      | Type      |
+------------------+-----------+
| transaction_id   | int       |
| card_number      | varchar   |
| amount           | numeric   |
| merchant_city    | varchar   |
| transaction_time | timestamp |
+------------------+-----------+
transaction_id is the primary key.
</pre>
<p>A transaction is suspicious if a card has two transactions in different cities within 10 minutes. Return the transaction_id, card_number, amount, merchant_city, and transaction_time of every suspicious transaction. Order by card_number, transaction_time.</p>`,
    starter: "",
    solution: `WITH with_prev AS (
  SELECT *,
    LAG(merchant_city) OVER (PARTITION BY card_number ORDER BY transaction_time) AS prev_city,
    LAG(transaction_time) OVER (PARTITION BY card_number ORDER BY transaction_time) AS prev_time,
    LEAD(merchant_city) OVER (PARTITION BY card_number ORDER BY transaction_time) AS next_city,
    LEAD(transaction_time) OVER (PARTITION BY card_number ORDER BY transaction_time) AS next_time
  FROM transactions
)
SELECT DISTINCT transaction_id, card_number, amount, merchant_city, transaction_time
FROM with_prev
WHERE (prev_city IS DISTINCT FROM merchant_city AND transaction_time - prev_time <= INTERVAL '10 minutes')
   OR (next_city IS DISTINCT FROM merchant_city AND next_time - transaction_time <= INTERVAL '10 minutes')
ORDER BY card_number, transaction_time;`,
    hint: "Use LAG and LEAD to check both the previous and next transaction. A row is suspicious if either neighbor is in a different city within 10 minutes."
  },
  {
    id: 96,
    title: "Cross Join Combinations for A/B Test",
    difficulty: "Medium",
    category: "Advanced Joins",
    companies: ["Netflix", "Airbnb", "Booking.com"],
    acceptance: 45,
    tags: ["cross join", "combinations", "self-join"],
    description: `<p>Table: <code>experiment_variants</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| experiment_id  | int     |
| variant_name   | varchar |
| conversion_rate| numeric |
| sample_size    | int     |
+----------------+---------+
(experiment_id, variant_name) is the primary key.
</pre>
<p>For each experiment, generate all unique variant pairs and compute the absolute difference in conversion rates. Return experiment_id, variant_a (alphabetically first), variant_b, rate_diff (absolute), and the total combined sample size. Order by experiment_id, variant_a, variant_b.</p>`,
    starter: "",
    solution: `SELECT a.experiment_id,
  a.variant_name AS variant_a,
  b.variant_name AS variant_b,
  ABS(a.conversion_rate - b.conversion_rate) AS rate_diff,
  a.sample_size + b.sample_size AS combined_sample_size
FROM experiment_variants a
JOIN experiment_variants b
  ON a.experiment_id = b.experiment_id
  AND a.variant_name < b.variant_name
ORDER BY a.experiment_id, a.variant_name, b.variant_name;`,
    hint: "Self-join the variants table on the same experiment_id with variant_name < variant_name to get unique pairs."
  },
  {
    id: 97,
    title: "Dense Ranking with Complex Ties",
    difficulty: "Medium",
    category: "Complex Window Functions",
    companies: ["Microsoft", "Oracle", "Databricks"],
    acceptance: 40,
    tags: ["DENSE_RANK", "ties", "window functions"],
    description: `<p>Table: <code>exam_results</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| student_id     | int     |
| subject        | varchar |
| score          | int     |
+----------------+---------+
</pre>
<p>Rank students by their total score across all subjects using DENSE_RANK. Then, for each student, also compute the percentage of students they scored higher than (percentile rank). Return student_id, total_score, dense_rank, and percentile_rank (rounded to 2 decimals). Order by dense_rank, student_id.</p>`,
    starter: "",
    solution: `WITH totals AS (
  SELECT student_id, SUM(score) AS total_score
  FROM exam_results
  GROUP BY student_id
),
ranked AS (
  SELECT student_id, total_score,
    DENSE_RANK() OVER (ORDER BY total_score DESC) AS dense_rank,
    COUNT(*) OVER () AS total_students
  FROM totals
)
SELECT student_id, total_score, dense_rank,
  ROUND(100.0 * (SELECT COUNT(*) FROM ranked r2 WHERE r2.total_score < ranked.total_score) / NULLIF(total_students - 1, 0), 2) AS percentile_rank
FROM ranked
ORDER BY dense_rank, student_id;`,
    hint: "First aggregate total scores per student. Use DENSE_RANK for the ranking. Percentile rank = count of students scoring lower / (total students - 1)."
  },
  {
    id: 98,
    title: "Recursive Bill of Materials Explosion",
    difficulty: "Hard",
    category: "Recursive CTE",
    companies: ["SAP", "Tesla", "Apple"],
    acceptance: 22,
    tags: ["recursive CTE", "hierarchy", "BOM"],
    description: `<p>Table: <code>bom</code> (Bill of Materials)</p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| parent_part    | varchar |
| child_part     | varchar |
| quantity       | int     |
+----------------+---------+
</pre>
<p>Given a top-level assembly 'BIKE', recursively explode the bill of materials to find all leaf-level (raw) parts and the total quantity needed. A leaf part is one that never appears as a parent_part. Return part_name and total_quantity, ordered by part_name.</p>`,
    starter: "",
    solution: `WITH RECURSIVE exploded AS (
  SELECT child_part AS part, quantity AS total_qty
  FROM bom
  WHERE parent_part = 'BIKE'
  UNION ALL
  SELECT b.child_part, e.total_qty * b.quantity
  FROM exploded e
  JOIN bom b ON b.parent_part = e.part
)
SELECT part AS part_name, SUM(total_qty) AS total_quantity
FROM exploded
WHERE part NOT IN (SELECT DISTINCT parent_part FROM bom)
GROUP BY part
ORDER BY part;`,
    hint: "Start from 'BIKE' and recursively join children, multiplying quantities. Filter for leaf parts — those that do not appear in the parent_part column."
  },
  {
    id: 99,
    title: "Unpivot Wide Table to Long Format",
    difficulty: "Medium",
    category: "Pivot/Unpivot",
    companies: ["Snowflake", "Databricks", "dbt Labs"],
    acceptance: 46,
    tags: ["unpivot", "UNION ALL", "VALUES"],
    description: `<p>Table: <code>quarterly_sales</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| product_id     | int     |
| q1_sales       | numeric |
| q2_sales       | numeric |
| q3_sales       | numeric |
| q4_sales       | numeric |
+----------------+---------+
product_id is the primary key.
</pre>
<p>Unpivot this table into long format with columns: product_id, quarter (values 'Q1','Q2','Q3','Q4'), and sales. Exclude rows where sales is 0 or NULL. Order by product_id, quarter.</p>`,
    starter: "",
    solution: `SELECT product_id, quarter, sales
FROM quarterly_sales
CROSS JOIN LATERAL (
  VALUES ('Q1', q1_sales), ('Q2', q2_sales), ('Q3', q3_sales), ('Q4', q4_sales)
) AS t(quarter, sales)
WHERE sales IS NOT NULL AND sales != 0
ORDER BY product_id, quarter;`,
    hint: "Use CROSS JOIN LATERAL with a VALUES clause to turn each column into a row. Filter out NULLs and zeros."
  },
  {
    id: 100,
    title: "Identify Longest Increasing Subsequence in Stock Prices",
    difficulty: "Hard",
    category: "Gaps & Islands",
    companies: ["Jane Street", "Citadel", "Two Sigma"],
    acceptance: 21,
    tags: ["gaps and islands", "LAG", "running count"],
    description: `<p>Table: <code>stock_prices</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| ticker         | varchar |
| trade_date     | date    |
| close_price    | numeric |
+----------------+---------+
(ticker, trade_date) is the primary key.
</pre>
<p>For each ticker, find the longest run of consecutive trading days where the closing price strictly increased. Return ticker, run_start, run_end, run_length, price_start, and price_end. If there are ties for longest, return all. Order by ticker, run_start.</p>`,
    starter: "",
    solution: `WITH flagged AS (
  SELECT ticker, trade_date, close_price,
    CASE WHEN close_price > LAG(close_price) OVER (PARTITION BY ticker ORDER BY trade_date)
         THEN 0 ELSE 1 END AS new_group
  FROM stock_prices
),
grouped AS (
  SELECT *, SUM(new_group) OVER (PARTITION BY ticker ORDER BY trade_date) AS grp
  FROM flagged
),
runs AS (
  SELECT ticker, grp,
    MIN(trade_date) AS run_start, MAX(trade_date) AS run_end,
    COUNT(*) AS run_length,
    MIN(close_price) AS price_start, MAX(close_price) AS price_end
  FROM grouped
  GROUP BY ticker, grp
  HAVING COUNT(*) > 1
),
max_runs AS (
  SELECT ticker, MAX(run_length) AS max_length
  FROM runs
  GROUP BY ticker
)
SELECT r.ticker, r.run_start, r.run_end, r.run_length, r.price_start, r.price_end
FROM runs r
JOIN max_runs m ON r.ticker = m.ticker AND r.run_length = m.max_length
ORDER BY r.ticker, r.run_start;`,
    hint: "Flag each day where price did NOT increase as a new group boundary. Use a running SUM of flags to assign group IDs. Then find the longest group per ticker."
  },
  {
    id: 101,
    title: "7-Day Moving Average Revenue",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Shopify", "Square", "Adyen"],
    acceptance: 48,
    tags: ["moving average", "window frames", "ROWS BETWEEN"],
    description: `<p>Table: <code>daily_revenue</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| revenue_date   | date    |
| revenue        | numeric |
+----------------+---------+
revenue_date is the primary key.
</pre>
<p>Compute a 7-day trailing moving average of revenue (current day plus the 6 preceding days). Only include rows that have a full 7-day window. Return revenue_date, revenue, and moving_avg_7d (rounded to 2 decimals). Order by revenue_date.</p>`,
    starter: "",
    solution: `WITH ma AS (
  SELECT revenue_date, revenue,
    AVG(revenue) OVER (ORDER BY revenue_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS moving_avg_7d,
    ROW_NUMBER() OVER (ORDER BY revenue_date) AS rn
  FROM daily_revenue
)
SELECT revenue_date, revenue, ROUND(moving_avg_7d, 2) AS moving_avg_7d
FROM ma
WHERE rn >= 7
ORDER BY revenue_date;`,
    hint: "Use AVG with ROWS BETWEEN 6 PRECEDING AND CURRENT ROW. Filter out the first 6 rows that don't have a full window using ROW_NUMBER."
  },
  {
    id: 102,
    title: "Year-over-Year Revenue Growth",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Amazon", "Walmart", "Target"],
    acceptance: 45,
    tags: ["YoY growth", "LAG", "date functions"],
    description: `<p>Table: <code>monthly_revenue</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| revenue_month  | date    |
| revenue        | numeric |
+----------------+---------+
revenue_month is the primary key (first day of each month).
</pre>
<p>For each month, compute the year-over-year revenue growth percentage compared to the same month in the previous year. Return revenue_month, revenue, prev_year_revenue, and yoy_growth_pct (rounded to 2 decimals). Exclude months without a prior year comparison. Order by revenue_month.</p>`,
    starter: "",
    solution: `WITH lagged AS (
  SELECT revenue_month, revenue,
    LAG(revenue, 12) OVER (ORDER BY revenue_month) AS prev_year_revenue
  FROM monthly_revenue
)
SELECT revenue_month, revenue, prev_year_revenue,
  ROUND(100.0 * (revenue - prev_year_revenue) / NULLIF(prev_year_revenue, 0), 2) AS yoy_growth_pct
FROM lagged
WHERE prev_year_revenue IS NOT NULL
ORDER BY revenue_month;`,
    hint: "Use LAG with an offset of 12 (months) to get the same month from the previous year."
  },
  {
    id: 103,
    title: "Multi-Table Join: Order Summary",
    difficulty: "Medium",
    category: "Multi-Join",
    companies: ["eBay", "Etsy", "Mercado Libre"],
    acceptance: 52,
    tags: ["multi-join", "aggregation", "LEFT JOIN"],
    description: `<p>Table: <code>customers</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| customer_id    | int     |
| name           | varchar |
| country        | varchar |
+----------------+---------+
</pre>
<p>Table: <code>orders</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| order_id       | int     |
| customer_id    | int     |
| order_date     | date    |
+----------------+---------+
</pre>
<p>Table: <code>order_items</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| order_id       | int     |
| product_id     | int     |
| quantity        | int     |
| unit_price     | numeric |
+----------------+---------+
</pre>
<p>Return each customer's name, country, total number of orders, total items purchased, and total spend. Include customers with no orders (show 0s). Order by total_spend DESC, name.</p>`,
    starter: "",
    solution: `SELECT c.name, c.country,
  COUNT(DISTINCT o.order_id) AS total_orders,
  COALESCE(SUM(oi.quantity), 0) AS total_items,
  COALESCE(SUM(oi.quantity * oi.unit_price), 0) AS total_spend
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY c.customer_id, c.name, c.country
ORDER BY total_spend DESC, c.name;`,
    hint: "Use LEFT JOINs from customers through orders to order_items. Use COUNT(DISTINCT order_id) for order count and COALESCE for customers with no orders."
  },
  {
    id: 104,
    title: "Complex CASE: Customer Segmentation",
    difficulty: "Medium",
    category: "CASE Expressions",
    companies: ["Salesforce", "HubSpot", "Braze"],
    acceptance: 50,
    tags: ["complex CASE", "segmentation", "aggregation"],
    description: `<p>Table: <code>purchases</code></p>
<pre>
+----------------+-----------+
| Column Name    | Type      |
+----------------+-----------+
| customer_id    | int       |
| purchase_date  | date      |
| amount         | numeric   |
+----------------+-----------+
</pre>
<p>Segment customers based on their behavior in the last 365 days: 'VIP' (>10 purchases AND >$5000 total), 'Regular' (>3 purchases OR >$1000 total), 'Occasional' (at least 1 purchase), 'Inactive' (no purchases in the period). Given a reference date of '2025-12-31', return customer_id, purchase_count, total_spend, and segment. Order by total_spend DESC, customer_id.</p>`,
    starter: "",
    solution: `WITH stats AS (
  SELECT customer_id,
    COUNT(*) FILTER (WHERE purchase_date > '2025-12-31'::date - 365) AS purchase_count,
    COALESCE(SUM(amount) FILTER (WHERE purchase_date > '2025-12-31'::date - 365), 0) AS total_spend
  FROM purchases
  GROUP BY customer_id
)
SELECT customer_id, purchase_count, total_spend,
  CASE
    WHEN purchase_count > 10 AND total_spend > 5000 THEN 'VIP'
    WHEN purchase_count > 3 OR total_spend > 1000 THEN 'Regular'
    WHEN purchase_count >= 1 THEN 'Occasional'
    ELSE 'Inactive'
  END AS segment
FROM stats
ORDER BY total_spend DESC, customer_id;`,
    hint: "First aggregate per customer with FILTER for the date range. Then use a CASE expression with the segment rules in priority order."
  },
  {
    id: 105,
    title: "Business Days Between Dates",
    difficulty: "Medium",
    category: "Date Arithmetic",
    companies: ["Bloomberg", "Workday", "ADP"],
    acceptance: 42,
    tags: ["date arithmetic", "generate_series", "EXTRACT"],
    description: `<p>Table: <code>tasks</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| task_id        | int     |
| start_date     | date    |
| end_date       | date    |
+----------------+---------+
task_id is the primary key.
</pre>
<p>Calculate the number of business days (Monday-Friday) between start_date and end_date (inclusive of both) for each task. Return task_id, start_date, end_date, and business_days. Order by task_id.</p>`,
    starter: "",
    solution: `SELECT t.task_id, t.start_date, t.end_date,
  (SELECT COUNT(*)
   FROM generate_series(t.start_date, t.end_date, INTERVAL '1 day') d
   WHERE EXTRACT(DOW FROM d) NOT IN (0, 6)
  ) AS business_days
FROM tasks t
ORDER BY t.task_id;`,
    hint: "Use generate_series to expand each date range into individual days. Filter out Saturday (6) and Sunday (0) using EXTRACT(DOW)."
  },
  {
    id: 106,
    title: "Aggregate Tags with STRING_AGG",
    difficulty: "Medium",
    category: "String Aggregation",
    companies: ["Stack Overflow", "Reddit", "Discord"],
    acceptance: 54,
    tags: ["string_agg", "GROUP BY", "ORDER BY within aggregate"],
    description: `<p>Table: <code>posts</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| post_id        | int     |
| title          | varchar |
+----------------+---------+
</pre>
<p>Table: <code>post_tags</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| post_id        | int     |
| tag            | varchar |
+----------------+---------+
</pre>
<p>For each post, return the title and all tags concatenated in alphabetical order, separated by ', '. Posts with no tags should show 'untagged'. Return post_id, title, and tags_list. Order by post_id.</p>`,
    starter: "",
    solution: `SELECT p.post_id, p.title,
  COALESCE(STRING_AGG(pt.tag, ', ' ORDER BY pt.tag), 'untagged') AS tags_list
FROM posts p
LEFT JOIN post_tags pt ON p.post_id = pt.post_id
GROUP BY p.post_id, p.title
ORDER BY p.post_id;`,
    hint: "Use STRING_AGG with ORDER BY inside the function. LEFT JOIN to include posts without tags and COALESCE for the default value."
  },
  {
    id: 107,
    title: "Collect Values into Arrays",
    difficulty: "Medium",
    category: "Array Aggregation",
    companies: ["Supabase", "Neon", "CockroachDB"],
    acceptance: 47,
    tags: ["array_agg", "arrays", "unnest"],
    description: `<p>Table: <code>student_courses</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| student_id     | int     |
| student_name   | varchar |
| course_name    | varchar |
| grade          | char(1) |
+----------------+---------+
</pre>
<p>For each student, return their name, an array of course names sorted alphabetically, and an array of the corresponding grades. Also include a count of courses where grade is 'A'. Return student_id, student_name, courses, grades, and a_count. Order by student_id.</p>`,
    starter: "",
    solution: `SELECT student_id, student_name,
  ARRAY_AGG(course_name ORDER BY course_name) AS courses,
  ARRAY_AGG(grade ORDER BY course_name) AS grades,
  COUNT(*) FILTER (WHERE grade = 'A') AS a_count
FROM student_courses
GROUP BY student_id, student_name
ORDER BY student_id;`,
    hint: "Use ARRAY_AGG with ORDER BY inside the aggregate. Use COUNT with FILTER (WHERE grade = 'A') for the A count."
  },
  {
    id: 108,
    title: "Conditional Aggregation with FILTER",
    difficulty: "Medium",
    category: "FILTER Clause",
    companies: ["Stripe", "Plaid", "Marqeta"],
    acceptance: 44,
    tags: ["FILTER clause", "conditional aggregation", "reporting"],
    description: `<p>Table: <code>support_tickets</code></p>
<pre>
+------------------+-----------+
| Column Name      | Type      |
+------------------+-----------+
| ticket_id        | int       |
| agent_id         | int       |
| created_at       | timestamp |
| resolved_at      | timestamp |
| priority         | varchar   |
| satisfaction     | int       |
+------------------+-----------+
ticket_id is the primary key. priority is 'low', 'medium', or 'high'. satisfaction is 1-5 or NULL.
</pre>
<p>For each agent, compute: total tickets, high-priority tickets, average resolution time in hours (for resolved tickets only), avg satisfaction for high-priority tickets, and pct of tickets resolved within 4 hours. Round all to 2 decimals. Order by total_tickets DESC, agent_id.</p>`,
    starter: "",
    solution: `SELECT agent_id,
  COUNT(*) AS total_tickets,
  COUNT(*) FILTER (WHERE priority = 'high') AS high_priority_tickets,
  ROUND(AVG(EXTRACT(EPOCH FROM (resolved_at - created_at)) / 3600) FILTER (WHERE resolved_at IS NOT NULL), 2) AS avg_resolution_hours,
  ROUND(AVG(satisfaction) FILTER (WHERE priority = 'high'), 2) AS avg_high_priority_satisfaction,
  ROUND(100.0 * COUNT(*) FILTER (WHERE resolved_at IS NOT NULL AND resolved_at - created_at <= INTERVAL '4 hours') / COUNT(*), 2) AS pct_resolved_4h
FROM support_tickets
GROUP BY agent_id
ORDER BY total_tickets DESC, agent_id;`,
    hint: "Use the FILTER clause with each aggregate to apply different conditions. Convert interval to hours using EXTRACT(EPOCH FROM ...) / 3600."
  },
  {
    id: 109,
    title: "Window Frame: Cumulative Distribution",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Netflix", "Spotify", "YouTube"],
    acceptance: 41,
    tags: ["window frames", "ROWS BETWEEN", "CUME_DIST"],
    description: `<p>Table: <code>video_views</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| video_id       | int     |
| category       | varchar |
| view_count     | int     |
+----------------+---------+
video_id is the primary key.
</pre>
<p>For each category, rank videos by view_count and compute the cumulative percentage of total views within that category (running from highest to lowest view count). Return category, video_id, view_count, rank, and cumulative_pct (rounded to 2 decimals). Order by category, rank.</p>`,
    starter: "",
    solution: `SELECT category, video_id, view_count,
  RANK() OVER (PARTITION BY category ORDER BY view_count DESC) AS rank,
  ROUND(100.0 * SUM(view_count) OVER (
    PARTITION BY category ORDER BY view_count DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) / SUM(view_count) OVER (PARTITION BY category), 2) AS cumulative_pct
FROM video_views
ORDER BY category, rank;`,
    hint: "Use SUM with a window frame ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW divided by the total SUM for the partition."
  },
  {
    id: 110,
    title: "EXCEPT and INTERSECT: Feature Comparison",
    difficulty: "Medium",
    category: "Set Operations",
    companies: ["Atlassian", "Notion", "Asana"],
    acceptance: 53,
    tags: ["EXCEPT", "INTERSECT", "set operations"],
    description: `<p>Table: <code>plan_features</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| plan_name      | varchar |
| feature_name   | varchar |
+----------------+---------+
(plan_name, feature_name) is the primary key. Plans are 'basic', 'pro', and 'enterprise'.
</pre>
<p>Write three queries combined with UNION ALL: (1) Features in 'enterprise' but NOT in 'pro', labeled as 'enterprise_only'. (2) Features in both 'pro' and 'enterprise' but NOT in 'basic', labeled as 'pro_and_above'. (3) Features in ALL three plans, labeled as 'all_plans'. Return feature_name and category. Order by category, feature_name.</p>`,
    starter: "",
    solution: `(
  SELECT feature_name, 'enterprise_only' AS category
  FROM plan_features WHERE plan_name = 'enterprise'
  EXCEPT
  SELECT feature_name, 'enterprise_only' FROM plan_features WHERE plan_name = 'pro'
)
UNION ALL
(
  SELECT feature_name, 'pro_and_above'
  FROM (
    SELECT feature_name FROM plan_features WHERE plan_name = 'pro'
    INTERSECT
    SELECT feature_name FROM plan_features WHERE plan_name = 'enterprise'
  ) pe
  WHERE feature_name NOT IN (SELECT feature_name FROM plan_features WHERE plan_name = 'basic')
)
UNION ALL
(
  SELECT feature_name, 'all_plans'
  FROM (
    SELECT feature_name FROM plan_features WHERE plan_name = 'basic'
    INTERSECT
    SELECT feature_name FROM plan_features WHERE plan_name = 'pro'
    INTERSECT
    SELECT feature_name FROM plan_features WHERE plan_name = 'enterprise'
  ) all_three
)
ORDER BY category, feature_name;`,
    hint: "Use EXCEPT to find features in one plan but not another, and INTERSECT to find features common to multiple plans."
  },
  {
    id: 111,
    title: "Sessionization with Duration Stats",
    difficulty: "Medium",
    category: "Sessionization",
    companies: ["Amplitude", "Mixpanel", "Heap"],
    acceptance: 39,
    tags: ["sessionization", "window functions", "aggregation"],
    description: `<p>Table: <code>app_events</code></p>
<pre>
+----------------+-----------+
| Column Name    | Type      |
+----------------+-----------+
| user_id        | int       |
| event_name     | varchar   |
| event_time     | timestamp |
+----------------+-----------+
</pre>
<p>Define sessions as groups of events with no more than 5 minutes between consecutive events per user. For each user, compute the number of sessions, average events per session, average session duration in seconds, and the longest session duration in seconds. Return user_id, num_sessions, avg_events_per_session (rounded to 1 decimal), avg_session_duration_sec (rounded), and max_session_duration_sec. Order by user_id.</p>`,
    starter: "",
    solution: `WITH flagged AS (
  SELECT user_id, event_name, event_time,
    CASE WHEN EXTRACT(EPOCH FROM event_time - LAG(event_time) OVER (PARTITION BY user_id ORDER BY event_time)) > 300
         OR LAG(event_time) OVER (PARTITION BY user_id ORDER BY event_time) IS NULL
         THEN 1 ELSE 0 END AS new_session
  FROM app_events
),
sessions AS (
  SELECT user_id, event_time,
    SUM(new_session) OVER (PARTITION BY user_id ORDER BY event_time) AS session_id
  FROM flagged
),
session_stats AS (
  SELECT user_id, session_id,
    COUNT(*) AS event_count,
    EXTRACT(EPOCH FROM MAX(event_time) - MIN(event_time)) AS duration_sec
  FROM sessions
  GROUP BY user_id, session_id
)
SELECT user_id,
  COUNT(*) AS num_sessions,
  ROUND(AVG(event_count), 1) AS avg_events_per_session,
  ROUND(AVG(duration_sec)) AS avg_session_duration_sec,
  MAX(duration_sec) AS max_session_duration_sec
FROM session_stats
GROUP BY user_id
ORDER BY user_id;`,
    hint: "Flag new sessions when the gap exceeds 5 minutes using LAG. Assign session IDs with a running SUM. Then aggregate per session, then per user."
  },
  {
    id: 112,
    title: "Funnel with Time-to-Convert",
    difficulty: "Hard",
    category: "Funnel Analysis",
    companies: ["Amplitude", "Segment", "Braze"],
    acceptance: 23,
    tags: ["funnel analysis", "time difference", "percentile"],
    description: `<p>Table: <code>user_events</code></p>
<pre>
+----------------+-----------+
| Column Name    | Type      |
+----------------+-----------+
| user_id        | int       |
| event_type     | varchar   |
| event_time     | timestamp |
+----------------+-----------+
</pre>
<p>Events are: 'signup' → 'activation' → 'first_purchase'. For users who completed all three steps in order, compute the median time (in hours) from signup to activation and from activation to first_purchase. Return step_pair ('signup_to_activation' or 'activation_to_purchase'), median_hours (rounded to 1 decimal), min_hours, and max_hours. Order by step_pair.</p>`,
    starter: "",
    solution: `WITH user_steps AS (
  SELECT user_id,
    MIN(event_time) FILTER (WHERE event_type = 'signup') AS signup_time,
    MIN(event_time) FILTER (WHERE event_type = 'activation') AS activation_time,
    MIN(event_time) FILTER (WHERE event_type = 'first_purchase') AS purchase_time
  FROM user_events
  GROUP BY user_id
),
completed AS (
  SELECT *,
    EXTRACT(EPOCH FROM activation_time - signup_time) / 3600.0 AS s_to_a_hours,
    EXTRACT(EPOCH FROM purchase_time - activation_time) / 3600.0 AS a_to_p_hours
  FROM user_steps
  WHERE signup_time IS NOT NULL
    AND activation_time IS NOT NULL AND activation_time > signup_time
    AND purchase_time IS NOT NULL AND purchase_time > activation_time
),
unpivoted AS (
  SELECT 'signup_to_activation' AS step_pair, s_to_a_hours AS hours FROM completed
  UNION ALL
  SELECT 'activation_to_purchase', a_to_p_hours FROM completed
)
SELECT step_pair,
  ROUND(PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY hours)::numeric, 1) AS median_hours,
  ROUND(MIN(hours)::numeric, 1) AS min_hours,
  ROUND(MAX(hours)::numeric, 1) AS max_hours
FROM unpivoted
GROUP BY step_pair
ORDER BY step_pair;`,
    hint: "First identify users who completed all 3 steps in order. Compute time differences. Unpivot the two step-pairs and use PERCENTILE_CONT(0.5) for the median."
  },
  {
    id: 113,
    title: "Retention Matrix by Monthly Cohort",
    difficulty: "Hard",
    category: "Retention Analysis",
    companies: ["Spotify", "Duolingo", "Calm"],
    acceptance: 22,
    tags: ["retention analysis", "cohort matrix", "pivot"],
    description: `<p>Table: <code>subscriptions</code></p>
<pre>
+------------------+---------+
| Column Name      | Type    |
+------------------+---------+
| user_id          | int     |
| subscription_start | date  |
| activity_month   | date   |
+------------------+---------+
activity_month is the first day of a month the user was active.
</pre>
<p>Build a retention matrix: for each cohort month (month of subscription_start), show the retention rate for months 0 through 5. Return cohort_month, cohort_size, m0_pct, m1_pct, m2_pct, m3_pct, m4_pct, m5_pct (all rounded to 1 decimal). Order by cohort_month.</p>`,
    starter: "",
    solution: `WITH cohorts AS (
  SELECT user_id, DATE_TRUNC('month', subscription_start)::date AS cohort_month
  FROM subscriptions
  GROUP BY user_id, DATE_TRUNC('month', subscription_start)::date
),
monthly_activity AS (
  SELECT DISTINCT s.user_id, c.cohort_month,
    (EXTRACT(YEAR FROM s.activity_month) - EXTRACT(YEAR FROM c.cohort_month)) * 12
    + EXTRACT(MONTH FROM s.activity_month) - EXTRACT(MONTH FROM c.cohort_month) AS month_offset
  FROM subscriptions s
  JOIN cohorts c ON s.user_id = c.user_id
),
cohort_sizes AS (
  SELECT cohort_month, COUNT(DISTINCT user_id) AS cohort_size
  FROM cohorts
  GROUP BY cohort_month
)
SELECT cs.cohort_month, cs.cohort_size,
  ROUND(100.0 * COUNT(DISTINCT ma.user_id) FILTER (WHERE month_offset = 0) / cs.cohort_size, 1) AS m0_pct,
  ROUND(100.0 * COUNT(DISTINCT ma.user_id) FILTER (WHERE month_offset = 1) / cs.cohort_size, 1) AS m1_pct,
  ROUND(100.0 * COUNT(DISTINCT ma.user_id) FILTER (WHERE month_offset = 2) / cs.cohort_size, 1) AS m2_pct,
  ROUND(100.0 * COUNT(DISTINCT ma.user_id) FILTER (WHERE month_offset = 3) / cs.cohort_size, 1) AS m3_pct,
  ROUND(100.0 * COUNT(DISTINCT ma.user_id) FILTER (WHERE month_offset = 4) / cs.cohort_size, 1) AS m4_pct,
  ROUND(100.0 * COUNT(DISTINCT ma.user_id) FILTER (WHERE month_offset = 5) / cs.cohort_size, 1) AS m5_pct
FROM cohort_sizes cs
LEFT JOIN monthly_activity ma ON cs.cohort_month = ma.cohort_month
GROUP BY cs.cohort_month, cs.cohort_size
ORDER BY cs.cohort_month;`,
    hint: "Assign each user a cohort month. Compute month offsets for each activity month. Use conditional COUNT(DISTINCT) with FILTER for each month column."
  },
  {
    id: 114,
    title: "Median Absolute Deviation",
    difficulty: "Hard",
    category: "Median/Percentile",
    companies: ["Two Sigma", "DE Shaw", "Point72"],
    acceptance: 20,
    tags: ["median", "absolute deviation", "subquery"],
    description: `<p>Table: <code>measurements</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| sensor_id      | int     |
| reading        | numeric |
+----------------+---------+
</pre>
<p>For each sensor, compute the Median Absolute Deviation (MAD): first find the median of readings, then compute the median of the absolute deviations from that median. Return sensor_id, median_value, and mad (both rounded to 2 decimals). Order by sensor_id.</p>`,
    starter: "",
    solution: `WITH medians AS (
  SELECT sensor_id,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY reading) AS median_value
  FROM measurements
  GROUP BY sensor_id
),
deviations AS (
  SELECT m.sensor_id, m.median_value, ABS(r.reading - m.median_value) AS abs_dev
  FROM measurements r
  JOIN medians m ON r.sensor_id = m.sensor_id
)
SELECT sensor_id,
  ROUND(median_value::numeric, 2) AS median_value,
  ROUND((PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY abs_dev))::numeric, 2) AS mad
FROM deviations
GROUP BY sensor_id, median_value
ORDER BY sensor_id;`,
    hint: "First compute the median per sensor. Then join back to compute absolute deviations. Finally compute the median of those deviations."
  },
  {
    id: 115,
    title: "Recursive Category Tree with Depth Limit",
    difficulty: "Hard",
    category: "Recursive CTE",
    companies: ["Amazon", "eBay", "Wayfair"],
    acceptance: 26,
    tags: ["recursive CTE", "tree traversal", "depth limit"],
    description: `<p>Table: <code>categories</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| category_id    | int     |
| category_name  | varchar |
| parent_id      | int     |
+----------------+---------+
category_id is the primary key. parent_id is NULL for root categories.
</pre>
<p>Recursively list all categories up to 4 levels deep. Return category_id, category_name, depth (root = 1), and full_path (slash-separated from root). Order by full_path.</p>`,
    starter: "",
    solution: `WITH RECURSIVE cat_tree AS (
  SELECT category_id, category_name, parent_id, 1 AS depth,
    category_name AS full_path
  FROM categories
  WHERE parent_id IS NULL
  UNION ALL
  SELECT c.category_id, c.category_name, c.parent_id, ct.depth + 1,
    ct.full_path || '/' || c.category_name
  FROM categories c
  JOIN cat_tree ct ON c.parent_id = ct.category_id
  WHERE ct.depth < 4
)
SELECT category_id, category_name, depth, full_path
FROM cat_tree
ORDER BY full_path;`,
    hint: "Anchor on root categories (parent_id IS NULL). Recurse with a depth counter and stop when depth reaches 4. Build the path by concatenating names."
  },
  {
    id: 116,
    title: "Detect Consecutive Value Sequences",
    difficulty: "Medium",
    category: "Gaps & Islands",
    companies: ["Bloomberg", "Citadel", "Jane Street"],
    acceptance: 41,
    tags: ["gaps and islands", "consecutive sequences", "ROW_NUMBER"],
    description: `<p>Table: <code>temperature_log</code></p>
<pre>
+------------------+-----------+
| Column Name      | Type      |
+------------------+-----------+
| station_id       | int       |
| log_date         | date      |
| temperature      | numeric   |
+------------------+-----------+
(station_id, log_date) is the primary key.
</pre>
<p>Find all periods where a station recorded temperatures above 100 for at least 3 consecutive days. Return station_id, period_start, period_end, duration_days, and max_temp during that period. Order by station_id, period_start.</p>`,
    starter: "",
    solution: `WITH above AS (
  SELECT station_id, log_date, temperature,
    log_date - (ROW_NUMBER() OVER (PARTITION BY station_id ORDER BY log_date))::int AS grp
  FROM temperature_log
  WHERE temperature > 100
),
periods AS (
  SELECT station_id,
    MIN(log_date) AS period_start,
    MAX(log_date) AS period_end,
    COUNT(*) AS duration_days,
    MAX(temperature) AS max_temp
  FROM above
  GROUP BY station_id, grp
  HAVING COUNT(*) >= 3
)
SELECT station_id, period_start, period_end, duration_days, max_temp
FROM periods
ORDER BY station_id, period_start;`,
    hint: "Filter to days above 100. Use the ROW_NUMBER minus date trick to group consecutive days. Keep only groups with 3+ days."
  },
  {
    id: 117,
    title: "Correlated Subquery: First Purchase per Category",
    difficulty: "Medium",
    category: "Correlated Subquery",
    companies: ["Instacart", "Gopuff", "DoorDash"],
    acceptance: 44,
    tags: ["correlated subquery", "first occurrence", "EXISTS"],
    description: `<p>Table: <code>purchases</code></p>
<pre>
+------------------+-----------+
| Column Name      | Type      |
+------------------+-----------+
| purchase_id      | int       |
| user_id          | int       |
| category         | varchar   |
| purchase_date    | date      |
| amount           | numeric   |
+------------------+-----------+
purchase_id is the primary key.
</pre>
<p>For each user and category, find the row corresponding to their first purchase (earliest date, and if tied, smallest purchase_id). Return user_id, category, purchase_date, and amount. Order by user_id, category.</p>`,
    starter: "",
    solution: `SELECT p.user_id, p.category, p.purchase_date, p.amount
FROM purchases p
WHERE NOT EXISTS (
  SELECT 1 FROM purchases p2
  WHERE p2.user_id = p.user_id
    AND p2.category = p.category
    AND (p2.purchase_date < p.purchase_date
         OR (p2.purchase_date = p.purchase_date AND p2.purchase_id < p.purchase_id))
)
ORDER BY p.user_id, p.category;`,
    hint: "Use NOT EXISTS with a correlated subquery that checks whether any earlier purchase exists for the same user and category."
  },
  {
    id: 118,
    title: "Time Series: Month-over-Month Change with Sparkline",
    difficulty: "Medium",
    category: "Time Series",
    companies: ["Datadog", "Grafana", "New Relic"],
    acceptance: 38,
    tags: ["time series", "LAG", "string_agg", "CASE"],
    description: `<p>Table: <code>monthly_metrics</code></p>
<pre>
+------------------+---------+
| Column Name      | Type    |
+------------------+---------+
| metric_name      | varchar |
| metric_month     | date    |
| value            | numeric |
+------------------+---------+
(metric_name, metric_month) is the primary key.
</pre>
<p>For each metric, compute the month-over-month percentage change. Also build a text-based trend indicator for the last 6 months: use '+' for months with positive change, '-' for negative, '=' for no change, and '?' for the first month. Return metric_name, metric_month, value, mom_change_pct (rounded to 2 decimals), and a trend column showing the 6-character pattern. Order by metric_name, metric_month.</p>`,
    starter: "",
    solution: `WITH with_change AS (
  SELECT metric_name, metric_month, value,
    ROUND(100.0 * (value - LAG(value) OVER w) / NULLIF(LAG(value) OVER w, 0), 2) AS mom_change_pct,
    CASE
      WHEN LAG(value) OVER w IS NULL THEN '?'
      WHEN value > LAG(value) OVER w THEN '+'
      WHEN value < LAG(value) OVER w THEN '-'
      ELSE '='
    END AS indicator
  FROM monthly_metrics
  WINDOW w AS (PARTITION BY metric_name ORDER BY metric_month)
)
SELECT metric_name, metric_month, value, mom_change_pct,
  STRING_AGG(indicator, '') OVER (
    PARTITION BY metric_name ORDER BY metric_month
    ROWS BETWEEN 5 PRECEDING AND CURRENT ROW
  ) AS trend
FROM with_change
ORDER BY metric_name, metric_month;`,
    hint: "Use LAG to compute MoM change. Map each change to a character with CASE. Use STRING_AGG as a window function with ROWS BETWEEN 5 PRECEDING AND CURRENT ROW."
  },
  {
    id: 119,
    title: "Moving Average with ROWS vs RANGE",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Robinhood", "Fidelity", "Charles Schwab"],
    acceptance: 43,
    tags: ["moving averages", "ROWS BETWEEN", "RANGE BETWEEN"],
    description: `<p>Table: <code>daily_trades</code></p>
<pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| trade_date     | date    |
| ticker         | varchar |
| volume         | int     |
| close_price    | numeric |
+----------------+---------+
(trade_date, ticker) is the primary key.
</pre>
<p>For each ticker and date, compute two moving averages of close_price: a 5-row moving average (last 5 rows regardless of date gaps) and a 5-day calendar moving average (using RANGE). Return ticker, trade_date, close_price, ma_5_row (rounded to 2 decimals), and ma_5_day (rounded to 2 decimals). Order by ticker, trade_date.</p>`,
    starter: "",
    solution: `SELECT ticker, trade_date, close_price,
  ROUND(AVG(close_price) OVER (
    PARTITION BY ticker ORDER BY trade_date
    ROWS BETWEEN 4 PRECEDING AND CURRENT ROW
  ), 2) AS ma_5_row,
  ROUND(AVG(close_price) OVER (
    PARTITION BY ticker ORDER BY trade_date
    RANGE BETWEEN INTERVAL '4 days' PRECEDING AND CURRENT ROW
  ), 2) AS ma_5_day
FROM daily_trades
ORDER BY ticker, trade_date;`,
    hint: "ROWS BETWEEN 4 PRECEDING AND CURRENT ROW gives you exactly 5 rows. RANGE BETWEEN INTERVAL '4 days' PRECEDING gives you all rows within a 5-day calendar window."
  },
  {
    id: 120,
    title: "Set Difference: Churned Customers",
    difficulty: "Medium",
    category: "Set Operations",
    companies: ["Salesforce", "Zendesk", "Intercom"],
    acceptance: 50,
    tags: ["EXCEPT", "INTERSECT", "date arithmetic", "churn"],
    description: `<p>Table: <code>monthly_active_users</code></p>
<pre>
+------------------+---------+
| Column Name      | Type    |
+------------------+---------+
| user_id          | int     |
| active_month     | date    |
+------------------+---------+
(user_id, active_month) is the primary key. active_month is the first day of the month.
</pre>
<p>Find users who churned in each month: they were active in the previous month but NOT active in the current month. Also classify as 'new_churn' (active only 1 month before churning) or 'returning_churn' (active 2+ months before churning). Return churn_month, user_id, and churn_type. Order by churn_month, user_id.</p>`,
    starter: "",
    solution: `WITH months AS (
  SELECT DISTINCT active_month FROM monthly_active_users
),
churned AS (
  SELECT (m.active_month + INTERVAL '1 month')::date AS churn_month, prev.user_id
  FROM months m
  JOIN monthly_active_users prev ON prev.active_month = m.active_month
  WHERE NOT EXISTS (
    SELECT 1 FROM monthly_active_users cur
    WHERE cur.user_id = prev.user_id
      AND cur.active_month = (m.active_month + INTERVAL '1 month')::date
  )
),
history AS (
  SELECT c.churn_month, c.user_id,
    (SELECT COUNT(*) FROM monthly_active_users mau
     WHERE mau.user_id = c.user_id AND mau.active_month < c.churn_month) AS months_active_before
  FROM churned c
)
SELECT churn_month, user_id,
  CASE WHEN months_active_before = 1 THEN 'new_churn' ELSE 'returning_churn' END AS churn_type
FROM history
ORDER BY churn_month, user_id;`,
    hint: "For each month, find users in the previous month who are NOT in the current month using NOT EXISTS or EXCEPT. Count their prior active months to classify churn type."
  }
];

const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
const DAILY_PROBLEM = PROBLEMS[dayOfYear % PROBLEMS.length];
