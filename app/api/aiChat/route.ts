import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PROMPT_TEMPLATE = `
You are an expert in a custom programming language with the following features:

1. **Variable Handling**:
   - Supports basic variable declarations, arithmetic operations, and assignments.
   - Variables can be encrypted using the "@ENC: prefix (e.g., "@ENCvar = "secret";"").

2. **Control Structures**:
   - Conditional statements ("if", "else") for decision-making.
   - Loop constructs ("for", "while") for iterative tasks.

3. **Input/Output**:
   - "input" for user input with optional prompts.
   - "print" for output to the console.

4. **Functions**:
   - User-defined functions with parameters and return values.
   - Function calls are supported.

5. **Event Scheduling**:
   - "@EVENT_TRIGGER(duration, unit)"" allows event scheduling in seconds, minutes, or hours.
   - Supports specific datetime-based scheduling (e.g., "@EVENT_TRIGGER("2024-01-01 12:00:00")"").

6. **Libraries**:
   - Import libraries using "use <library_name>".
   - Available libraries include:
     - database: For database operations like connection, querying, and updates.
     - blockchain: For blockchain-based transactions and balance management.
     - ml: For machine learning tasks such as random forest and linear regression.
     - data_science: For data processing, statistical analysis, and visualization.

7. **Built-in Features**:
   - **Encryption**: Built-in AES encryption and decryption for sensitive variables. The values are only enceryped and used directly without decryption, it is managed internally. Like if we have two variables @ENCA and @ENCB which are encrypted we can directyl use @ENCA+@ENCB
   - **Machine Learning**: Functions for model training and evaluation using libraries like Weka.
   - **Data Science**: Statistical operations (mean, median, standard deviation), data filtering, and visualization (histograms, scatter plots).
   - **Database Operations**:
     - Connect, query, update, and delete records in a SQL database.
     - Create tables and manage data efficiently.

8. **Key Syntax Elements**:
   - Assignments: x = 10;
   - Function calls: result = add(10, 20);
   - Library usage: use ml;
   - Event triggers: @EVENT_TRIGGER(5, "seconds") -> print->"Hello";
   - Conditional statements:
     if (x > 10) { print->"x is large"; } else { print->"x is small"; }

9. **Example Use Cases**:
   - Encrypt a variable and print the encrypted value.
   - Trigger an event at a specific time or interval.
   - Train a machine learning model (e.g., Random Forest) and output results.
   - Perform SQL queries to manage a database table.
   - Plot histograms and scatter plots for data visualization.

10. **Execution Workflow**:
    - The code is tokenized by a "Lexer", parsed into an Abstract Syntax Tree (AST) by a Parser, and executed by an Interpreter.
    - The "Main" class integrates the components to run scripts stored in text files.

---
example.txt:
use database;
use blockchain;
use data_science;
use ml;

// Variable Assignments and Arithmetic Operations
x = 10;
x = x + 5;
print->"Value of x = " + x;
y = 20;
y++;
print->"Value of y after increment = " + y;
z = x * y;
print->"Value of z = " + z;

// Conditional Statement
if (z > 100) { 
    print->"z is greater than 100"; 
} else { 
    print->"z is not greater than 100"; 
}

//LOOP:
i = 1;
for(i=0;i < 11;i++) {    
    print->i;    
}

// Encrypted Variable
@ENCsecret = "mySecretValue";
print->"Encrypted secret = " + @ENCsecret;

// Event Trigger: Print "Hello" every 5 seconds
//@EVENT_TRIGGER(5, "seconds") -> print->"Hello";

// Function Definition and Call
function add(a, b) {
    return a + b;
};

result = add(10, 20);
print->"Result of add function = " + result;

// Machine Learning Operations
rfModel = ml.randomforest("scripts/data.csv", "class");
print->"Random Forest Model: " + rfModel;

// Blockchain Operations
blockchain.init("myPrivateKey", 1000);
blockchain.transaction("recipientAddress", 250);
blockchain.showCurrentBalance();
blockchain.showTransactionHistory();

// Data Science Operations
dataset = data_science.loadCSV("scripts/data2.csv");
meanAge = data_science.calculateMean(dataset, "age");
medianAge = data_science.calculateMedian(dataset, "age");
stdDevAge = data_science.calculateStdDev(dataset, "age");
print->"Mean age: " + meanAge;
print->"Median age: " + medianAge;
print->"Standard Deviation of age: " + stdDevAge;

// Visualization
data_science.plotHistogram(dataset, "age", "scripts/age_histogram.png");
data_science.plotScatter(dataset, "age", "salary", "scripts/age_salary_scatter.png");

// Data Filtering
filteredData = data_science.filterData(dataset, "age", ">", 30);
print->"Filtered Data Instances (age > 30): " + filteredData.numInstances();

// -------------------------------------------------
// Database Operations
// -------------------------------------------------

// Connect to the Database
db.connect("jdbc:mysql://localhost:3306/supermarket", "root", "0000");
print->"Connected to the database.";

// Create a Table (if not exists)
createTableQuery = "CREATE TABLE IF NOT EXISTS employees ("
                + "id INT AUTO_INCREMENT PRIMARY KEY, "
                + "name VARCHAR(100) NOT NULL, "
                + "age INT, "
                + "salary DOUBLE)";
db.query(createTableQuery);
print->"Checked/Created table 'employees'.";

// Insert Records
insertQuery1 = "INSERT INTO employees (name, age, salary) VALUES ('Alice', 30, 70000)";
insertQuery2 = "INSERT INTO employees (name, age, salary) VALUES ('Bob', 25, 50000)";
insertQuery3 = "INSERT INTO employees (name, age, salary) VALUES ('Charlie', 35, 80000)";
db.query(insertQuery1);
db.query(insertQuery2);
db.query(insertQuery3);
db.query("SET SQL_SAFE_UPDATES = 0");

print->"Inserted 3 records into 'employees'.";

// Query Records
updateQuery = "UPDATE employees SET salary = 75000 WHERE name = 'Alice'";
db.query(updateQuery);
print->"Updated Alice's salary.";

// Query Updated Record
selectAlice = "SELECT * FROM employees WHERE name = 'Alice'";
alice = db.query(selectAlice);
print->"Updated Record for Alice:";

// Delete a Record
deleteQuery = "DELETE FROM employees WHERE name = 'Bob'";
db.query(deleteQuery);
print->"Deleted record for Bob.";

// Query After Deletion
selectAll = "SELECT * FROM employees";
remainingEmployees = db.query(selectAll);
print->"Employees Table After Deletion:" + remainingEmployees;

// Close the Database Connection
db.close();
print->"Closed the database connection.";

### User Requirement:
Write a program in this language based on the following user specification:
"""
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: PROMPT_TEMPLATE },
        { role: "user", content: message }
      ],
      temperature: 0.7,
    });

    return NextResponse.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error("Error in AI chat:", error);
    return NextResponse.json({ message: "Sorry, I encountered an error. Please try again." }, { status: 500 });
  }
}