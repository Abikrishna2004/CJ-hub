/* ==========================================================================
   SERVICES/LEARNING HUB INTERACTIVE CONTROLLER
   ========================================================================== */

const SYLLABUS_DATA = {
  python: {
    name: "Python",
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.85 14.5c-.27.8-1.04 1.5-2.22 1.5-1.5 0-2.45-.73-2.65-2.07h1.94c.15.54.49.85 1 .85.45 0 .74-.26.85-.56.12-.34-.1-.73-.77-1l-.64-.26c-1.3-.53-2.08-1.28-2.08-2.43 0-1.23 1-2.18 2.4-2.18 1.45 0 2.23.75 2.44 1.83h-1.92c-.1-.4-.36-.65-.77-.65-.41 0-.64.21-.73.47-.1.31.06.6.6.82l.62.25c1.4.56 2.24 1.25 2.24 2.47-.02.61-.17 1.1-.56 1.48z"/></svg>`,
    modules: [
      {
        id: "py-beg",
        title: "Beginner Fundamentals",
        desc: "Master variables, loops, conditionals, basic data types, and functions.",
        notes: `<h4>1. Variables & Data Types</h4>
<p>Python is dynamically typed. You don't need to declare types.</p>
<pre><code>name = "Alice"  # String
age = 22         # Integer
ratio = 3.14     # Float
is_active = True # Boolean</code></pre>
<h4>2. Control Flow</h4>
<p>Conditionals check states, loops repeat logic. Python uses strict indentation.</p>
<pre><code>if age >= 18:
    print("Eligible")
else:
    print("Underage")

# For Loop
for i in range(3):
    print(f"Iteration {i}")</code></pre>`,
        cheatSheet: `<h4>Quick Reference Syntax</h4>
<pre><code># Declaring Functions
def greet(name="User"):
    return f"Hello, {name}!"

# Conditional shorthand (Ternary)
status = "Adult" if age >= 18 else "Minor"

# List Basics
fruits = ["apple", "banana"]
fruits.append("cherry")
print(fruits[0]) # Output: apple</code></pre>`,
        practice: `<h4>Practice Challenges</h4>
<ol>
  <li><strong>Prime Checker</strong>: Write a function <code>is_prime(n)</code> that returns <code>True</code> if a number is prime, and <code>False</code> otherwise.</li>
  <li><strong>FizzBuzz</strong>: Print numbers from 1 to 50. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", and for both print "FizzBuzz".</li>
</ol>`,
        projects: `<h4>Mini Project: Guess the Number</h4>
<p>Build a game where the computer selects a random number between 1 and 100, and the user has to guess it with clues (too high, too low).</p>
<pre><code>import random
target = random.randint(1, 100)
# Add loop to gather user input using input()</code></pre>`
      },
      {
        id: "py-int",
        title: "Intermediate Modules",
        desc: "Deep dive into lists, dictionaries, error handling, and files I/O operations.",
        notes: `<h4>1. List Comprehensions</h4>
<p>Lists can be built dynamically in a single line.</p>
<pre><code>squares = [x**2 for x in range(10) if x % 2 == 0]</code></pre>
<h4>2. Dictionaries & File Handling</h4>
<pre><code>student = {"name": "Bob", "grade": "A"}
# File Operations (using context manager)
with open("test.txt", "w") as f:
    f.write("Hello World")</code></pre>`,
        cheatSheet: `<h4>File Operations Cheat Sheet</h4>
<pre><code># Reading file safely
try:
    with open("data.txt", "r") as f:
        content = f.read()
except FileNotFoundError:
    content = "File missing"</code></pre>`,
        practice: `<h4>Practice Challenges</h4>
<ol>
  <li><strong>Word Counter</strong>: Write a script that counts the occurrences of each word in a text paragraph.</li>
  <li><strong>Safe Divider</strong>: Write a function <code>divide(a, b)</code> that handles division by zero error safely.</li>
</ol>`,
        projects: `<h4>Mini Project: CSV Todo List Tracker</h4>
<p>Create a Python CLI script that reads a <code>tasks.csv</code> file, displays tasks, lets users append new ones, and saves updates back to CSV.</p>`
      },
      {
        id: "py-adv",
        title: "Advanced Concepts",
        desc: "Object-oriented programming, classes, decorators, and generators.",
        notes: `<h4>1. Classes & Inheritance</h4>
<pre><code>class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"</code></pre>
<h4>2. Decorators</h4>
<p>Decorators modify the behavior of functions dynamically.</p>`,
        cheatSheet: `<h4>Decorator Syntax</h4>
<pre><code>def my_decorator(func):
    def wrapper():
        print("Before call")
        func()
        print("After call")
    return wrapper</code></pre>`,
        practice: `<h4>Practice Challenges</h4>
<ol>
  <li><strong>Custom Generator</strong>: Create a generator that yields Fibonacci numbers up to a limit.</li>
  <li><strong>Logging Decorator</strong>: Write a decorator that logs the argument and name of any function called.</li>
</ol>`,
        projects: `<h4>Mini Project: OOP Bank System</h4>
<p>Build a bank transaction simulator using OOP. Classes should include BankAccount, CheckingAccount, and Customer.</p>`
      },
      {
        id: "py-practice",
        title: "Practice Problems",
        desc: "Strengthen logic with interview-ready algorithmic challenges.",
        notes: `<h4>Placement Readiness Challenges</h4>
<p>Practice these core programming challenges frequently during job preparation campaigns.</p>`,
        cheatSheet: `<h4>Common Python Snippets for Interviews</h4>
<pre><code># Reverse a string
rev = my_string[::-1]

# Sort a list of tuples by second element
sorted_tuples = sorted(my_list, key=lambda x: x[1])</code></pre>`,
        practice: `<h4>Practice Problems Suite</h4>
<ul>
  <li><strong>Anagram Checker</strong>: Verify if two strings are anagrams of each other.</li>
  <li><strong>Palindrome checker</strong>: Check if a given string reads the same forwards and backwards.</li>
  <li><strong>Array duplicate filter</strong>: Remove all duplicates from a list in O(n) runtime complexity.</li>
</ul>`,
        projects: `<h4>Project Challenge: Dynamic Calculator</h4>
<p>Write a command line calculator that parses formulas and calculates answers using operations logic.</p>`
      },
      {
        id: "py-cheat",
        title: "Cheat Sheet",
        desc: "Quick syntax lookup sheet for methods, types, and operations.",
        notes: `<h4>Python Essential Reference Guide</h4>
<p>This reference card covers basic data types, operations, slicing, and common built-in methods.</p>`,
        cheatSheet: `<h4>Method Cheat Sheet</h4>
<pre><code># Lists
len(list)      # Size
list.pop()     # Remove last
list.insert(i, x)

# Dictionary
dict.keys()    # Get keys
dict.get(k, d) # Safe access with default

# Slicing
a[start:stop:step]</code></pre>`,
        practice: `<h4>Interactive Lookup Tasks</h4>
<ul>
  <li>Practice slicing on string <code>"COMPILEJOURNEY"</code> to fetch odd indexes.</li>
  <li>Experiment with dictionary mergers using the <code>|</code> operator.</li>
</ul>`,
        projects: `<h4>Mini Project: Config File Builder</h4>
<p>Write a script that builds a key-value setup configuration card based on console prompts.</p>`
      }
    ]
  },
  javascript: {
    name: "JavaScript",
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.89h-2v-2h2v2zm0-3.11h-2V7.11h2v6.67z"/></svg>`,
    modules: [
      {
        id: "js-es6",
        title: "ES6+ Fundamentals",
        desc: "Learn const/let, arrow functions, destructuring, and template literals.",
        notes: `<h4>1. Scopes: Let & Const</h4>
<p><code>let</code> allows re-assignment and is block-scoped. <code>const</code> prevents re-assignment.</p>
<h4>2. Arrow Functions & Destructuring</h4>
<pre><code>const add = (a, b) => a + b;
const user = { name: "John", role: "Dev" };
const { name, role } = user;</code></pre>`,
        cheatSheet: `<h4>ES6 Syntax Reference</h4>
<pre><code>// Template Literals
console.log(\`User \${name} is a \${role}\`);

// Spread Operator
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];</code></pre>`,
        practice: `<h4>Practice Challenges</h4>
<ol>
  <li><strong>Array Mapper</strong>: Write an arrow function that returns doubles of any array numbers.</li>
  <li><strong>Object Destruct</strong>: Destructure a deep configuration object safely.</li>
</ol>`,
        projects: `<h4>Mini Project: Dynamic Quotes Generator</h4>
<p>Create a quotes widget that pulls from a static list of quotes and shows them with randomized animations.</p>`
      },
      {
        id: "js-dom",
        title: "DOM Manipulation",
        desc: "Interact with querySelector, Event Listeners, and class modifiers.",
        notes: `<h4>1. Selecting Elements</h4>
<pre><code>const el = document.querySelector("#my-id");
const items = document.querySelectorAll(".class");</code></pre>
<h4>2. Event Listeners</h4>
<pre><code>el.addEventListener("click", (e) => {
    el.classList.toggle("active");
});</code></pre>`,
        cheatSheet: `<h4>DOM Modification Reference</h4>
<pre><code>// Create & Append element
const newDiv = document.createElement("div");
newDiv.textContent = "New element";
document.body.appendChild(newDiv);

// Style manipulation
newDiv.style.backgroundColor = "cyan";</code></pre>`,
        practice: `<h4>Practice Challenges</h4>
<ol>
  <li><strong>Color Switcher</strong>: Build a button that toggles the body background color when clicked.</li>
  <li><strong>Input Echo</strong>: Render user keyboard entries live in a paragraph below the input box.</li>
</ol>`,
        projects: `<h4>Mini Project: Dynamic Todo Widget</h4>
<p>Build a basic Todo tracker that appends tasks dynamically using Javascript DOM append node actions.</p>`
      },
      {
        id: "js-async",
        title: "Async & Promises",
        desc: "Master asynchronous code execution, promises, and async/await wrappers.",
        notes: `<h4>1. Promises</h4>
<p>Promises represent values that will arrive eventually (success or failure).</p>
<pre><code>const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Success"), 1000);
    });
};</code></pre>
<h4>2. Async/Await</h4>
<p>Async/Await makes asynchronous code look synchronous.</p>`,
        cheatSheet: `<h4>Async / Await Cheat Sheet</h4>
<pre><code>async function init() {
    try {
        const result = await fetchData();
        console.log(result);
    } catch(err) {
        console.error(err);
    }
}</code></pre>`,
        practice: `<h4>Practice Challenges</h4>
<ol>
  <li><strong>Timer Delay</strong>: Create a promise-based delay helper <code>sleep(ms)</code>.</li>
  <li><strong>Chained Tasks</strong>: Chain three promises sequentially, transferring values down.</li>
</ol>`,
        projects: `<h4>Mini Project: Live Stopwatch</h4>
<p>Create a live stopwatch using <code>setInterval</code> loops, handling start, pause, and split timer records.</p>`
      }
    ]
  },
  c: {
    name: "C Programming",
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
    modules: [
      {
        id: "c-basics",
        title: "C Language Basics",
        desc: "Learn data types, conditional loops, arrays, and standard file operations.",
        notes: `<h4>1. Standard Syntax</h4>
<pre><code>#include &lt;stdio.h&gt;
int main() {
    int score = 100;
    printf("Score is %d\\n", score);
    return 0;
}</code></pre>
<h4>2. Control structures</h4>
<p>Uses standard for/while and if-else branches.</p>`,
        cheatSheet: `<h4>Format Specifier Guide</h4>
<pre><code>%d - Integer
%f - Float
%c - Character
%s - String (char array)
%p - Pointer Address</code></pre>`,
        practice: `<h4>Practice Challenges</h4>
<ol>
  <li><strong>Factorial Loop</strong>: Write a C program to calculate factorials of user inputs.</li>
  <li><strong>Array Min/Max</strong>: Find the smallest and largest values inside an integer array.</li>
</ol>`,
        projects: `<h4>Mini Project: Grade Card Calculator</h4>
<p>Write a command line menu system that reads student marks and prints their final aggregate grade card.</p>`
      },
      {
        id: "c-pointers",
        title: "Pointers & Addresses",
        desc: "Master pointer operators, dereferencing, and passing by reference.",
        notes: `<h4>1. Pointer Operators</h4>
<p><code>&amp;</code> returns the memory address of variables. <code>*</code> dereferences pointers.</p>
<pre><code>int x = 10;
int *p = &amp;x;
printf("Address: %p, Value: %d\\n", p, *p);</code></pre>
<h4>2. Pass by Reference</h4>
<pre><code>void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}</code></pre>`,
        cheatSheet: `<h4>Pointer Cheat Sheet</h4>
<pre><code>int x = 5;
int *p = &amp;x;  // Reference
*p = 20;     // Update target value (x is now 20)</code></pre>`,
        practice: `<h4>Practice Challenges</h4>
<ol>
  <li><strong>Value Swapper</strong>: Swap two values using pointer variables.</li>
  <li><strong>String Length Counter</strong>: Find the size of a string using pointer arithmetic (no loops).</li>
</ol>`,
        projects: `<h4>Mini Project: Matrix Manipulator</h4>
<p>Implement array additions and multiplications using dynamic coordinates tracking via pointers.</p>`
      },
      {
        id: "c-mem",
        title: "Memory Management",
        desc: "Learn dynamically allocated memories using malloc, calloc, realloc, and free.",
        notes: `<h4>1. Allocating Memory</h4>
<p>Dynamic allocations are stored on the Heap instead of the Stack.</p>
<pre><code>#include &lt;stdlib.h&gt;
int *arr = (int*) malloc(5 * sizeof(int));
if(arr == NULL) {
    // Allocation failed
}</code></pre>
<h4>2. Freeing Memory</h4>
<p>Always release allocated blocks to avoid memory leaks!</p>
<pre><code>free(arr);</code></pre>`,
        cheatSheet: `<h4>Allocation Operators</h4>
<pre><code>malloc(size)      - Allocate raw bytes
calloc(num, size) - Allocate and zero-initialize
realloc(ptr, size)- Resize memory block
free(ptr)         - Deallocate memory</code></pre>`,
        practice: `<h4>Practice Challenges</h4>
<ol>
  <li><strong>Heap Array Builder</strong>: Build an array dynamically on the Heap, populate, print, and free it.</li>
  <li><strong>Safe Resizer</strong>: Resize a heap array from size 3 to 6 using <code>realloc</code>.</li>
</ol>`,
        projects: `<h4>Mini Project: Dynamic Contact List</h4>
<p>Build a CLI database that stores contact info dynamically, expanding and shrinking memory based on additions and removals.</p>`
      }
    ]
  },
  java: {
    name: "Java",
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    modules: [
      {
        id: "java-oop",
        title: "OOP Pillars",
        desc: "Master Abstraction, Inheritance, Polymorphism, and Encapsulation.",
        notes: `<h4>1. Encapsulation</h4>
<p>Using private properties with getters/setters.</p>
<pre><code>public class Student {
    private String name;
    public String getName() { return name; }
    public void setName(String n) { this.name = n; }
}</code></pre>
<h4>2. Inheritance & Polymorphism</h4>
<p>Extending parent properties and overriding methods.</p>`,
        cheatSheet: `<h4>OOP Syntax Reference</h4>
<pre><code>// Abstract Classes
abstract class Shape {
    abstract void draw();
}

// Interface
interface Printable {
    void print();
}</code></pre>`,
        practice: `<h4>Practice Challenges</h4>
<ol>
  <li><strong>Employee Structure</strong>: Implement a hierarchy class for Managers inheriting from Parent Employees.</li>
  <li><strong>Calculator Polymorph</strong>: Build method overload patterns inside math processors.</li>
</ol>`,
        projects: `<h4>Mini Project: ATM Transaction Engine</h4>
<p>Develop an OOP simulation engine representing ATM functions, transaction tracking, and accounts classes.</p>`
      },
      {
        id: "java-col",
        title: "Java Collections Framework",
        desc: "Work with ArrayLists, HashMaps, HashSets, and Iterators.",
        notes: `<h4>1. Lists & Sets</h4>
<p><code>ArrayList</code> preserves order. <code>HashSet</code> stores unique values.</p>
<pre><code>List&lt;String&gt; list = new ArrayList&lt;&gt;();
Set&lt;Integer&gt; uniqueSet = new HashSet&lt;&gt;();</code></pre>
<h4>2. HashMaps</h4>
<p>Store key-value pairs.</p>
<pre><code>Map&lt;String, Integer&gt; map = new HashMap&lt;&gt;();
map.put("Alice", 90);</code></pre>`,
        cheatSheet: `<h4>Collections Cheat Sheet</h4>
<pre><code>// ArrayList
list.add(item);
list.remove(index);

// HashMap
map.put(key, val);
map.getOrDefault(key, defVal);</code></pre>`,
        practice: `<h4>Practice Challenges</h4>
<ol>
  <li><strong>Duplicate Filter</strong>: Filter duplicate items from a list using Sets.</li>
  <li><strong>Phonebook Builder</strong>: Match contact names to phone numbers using Maps.</li>
</ol>`,
        projects: `<h4>Mini Project: Inventory Catalog CLI</h4>
<p>Write an inventory management app that allows adding items, checking stock levels, and querying prices using Maps.</p>`
      }
    ]
  },
  htmlcss: {
    name: "HTML & CSS",
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    modules: [
      {
        id: "html-semantic",
        title: "Semantic HTML5",
        desc: "Learn structure landmarks, structural layouts, and form validations.",
        notes: `<h4>1. Landmark Tags</h4>
<p>Avoid <code>&lt;div&gt;</code> soup. Use semantic elements for accessibility.</p>
<pre><code>&lt;header&gt;
&lt;nav&gt;
&lt;main&gt;
&lt;section&gt;
&lt;footer&gt;</code></pre>`,
        cheatSheet: `<h4>Form Validations Reference</h4>
<pre><code>&lt;input type="email" required placeholder="Enter email"&gt;
&lt;input type="number" min="18" max="99"&gt;</code></pre>`,
        practice: `<h4>Practice Challenges</h4>
<ol>
  <li><strong>Profile Card markup</strong>: Build a profile card using only semantic layout tags.</li>
  <li><strong>Registration Form</strong>: Write a registration form with required constraints.</li>
</ol>`,
        projects: `<h4>Mini Project: Accessible Survey Page</h4>
<p>Design a survey form meeting all WCAG criteria, using proper labels and ARIA descriptors.</p>`
      },
      {
        id: "css-flexgrid",
        title: "Flexbox & Grid Layouts",
        desc: "Master modern layout designs, alignments, and alignment properties.",
        notes: `<h4>1. Flexbox Alignments</h4>
<pre><code>.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}</code></pre>
<h4>2. CSS Grids</h4>
<pre><code>.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
}</code></pre>`,
        cheatSheet: `<h4>Layout Shorthand Reference</h4>
<pre><code>/* Flex centering */
display: flex;
align-items: center;
justify-content: center;

/* Grid centering */
display: grid;
place-items: center;</code></pre>`,
        practice: `<h4>Practice Challenges</h4>
<ol>
  <li><strong>Centering Exercise</strong>: Center an absolute box inside a layout grid.</li>
  <li><strong>Sidebar layout</strong>: Build a responsive sidebar page template.</li>
</ol>`,
        projects: `<h4>Mini Project: Responsive Portfolio Page</h4>
<p>Build a responsive personal portfolio profile page with flex navbar and grid portfolio projects catalog.</p>`
      }
    ]
  },
  cpp: {
    name: "C++",
    icon: `<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
    modules: [
      {
        id: "cpp-oop",
        title: "Classes & Constructors",
        desc: "Master Constructor overloading, destructors, and access modifiers.",
        notes: `<h4>1. C++ Standard Class Structure</h4>
<pre><code>#include &lt;iostream&gt;
using namespace std;

class Car {
public:
    string brand;
    Car(string x) { brand = x; } // Constructor
};</code></pre>`,
        cheatSheet: `<h4>OOP Operators Reference</h4>
<pre><code>class Box {
private:
    double width;
public:
    void setWidth(double w);
    double getWidth();
};</code></pre>`,
        practice: `<h4>Practice Challenges</h4>
<ol>
  <li><strong>Car Details</strong>: Write a class tracking mileage and models, defining custom constructors.</li>
  <li><strong>Box Dimensions</strong>: Calculate volume coordinates using class setters.</li>
</ol>`,
        projects: `<h4>Mini Project: Inventory Catalog System</h4>
<p>Implement a stock records system that adds, updates, and removes logs via class methods.</p>`
      },
      {
        id: "cpp-stl",
        title: "Standard Template Library (STL)",
        desc: "Leverage vectors, map tables, lists, and common utility methods.",
        notes: `<h4>1. Vectors</h4>
<p>Dynamic arrays supporting fast insertions.</p>
<pre><code>#include &lt;vector&gt;
vector&lt;int&gt; v;
v.push_back(10);</code></pre>
<h4>2. Maps</h4>
<p>Lookup tables using key-value hashes.</p>`,
        cheatSheet: `<h4>STL Vector Cheat Sheet</h4>
<pre><code>vector&lt;int&gt; v;
v.push_back(5);
v.pop_back();
v.size();
// Iterator loop
for(auto it = v.begin(); it != v.end(); ++it) { ... }</code></pre>`,
        practice: `<h4>Practice Challenges</h4>
<ol>
  <li><strong>Unique Numbers Sorter</strong>: Sort integers using vectors and standard sort methods.</li>
  <li><strong>HashMap Registry</strong>: Create a database mapping roll numbers to student grade cards using Maps.</li>
</ol>`,
        projects: `<h4>Mini Project: Student Registration Console</h4>
<p>Develop a student registration portal using vector storage arrays and STL iterations controls.</p>`
      }
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initLearningHub();
});

function initLearningHub() {
  const tabSidebar = document.getElementById("lang-tabs");
  const moduleGrid = document.getElementById("modules-grid");
  
  if (!tabSidebar || !moduleGrid) return;

  // 1. Generate Language Selector Sidebar Tabs
  tabSidebar.innerHTML = "";
  Object.keys(SYLLABUS_DATA).forEach((key, idx) => {
    const lang = SYLLABUS_DATA[key];
    const button = document.createElement("button");
    button.className = `lang-tab-btn ${idx === 0 ? "active" : ""}`;
    button.setAttribute("data-lang", key);
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", idx === 0 ? "true" : "false");
    button.innerHTML = `${lang.icon} <span>${lang.name}</span>`;
    tabSidebar.appendChild(button);
  });

  // 2. Load Default Language Modules (First key, e.g. Python)
  const defaultLang = Object.keys(SYLLABUS_DATA)[0];
  renderModules(defaultLang);

  // 3. Tab click delegation
  tabSidebar.addEventListener("click", (e) => {
    const btn = e.target.closest(".lang-tab-btn");
    if (!btn) return;

    // Toggle active tab buttons state
    document.querySelectorAll(".lang-tab-btn").forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");

    // Load active language content
    const selectedLang = btn.getAttribute("data-lang");
    renderModules(selectedLang);
  });

  // 4. Modal Event Listeners
  initModalListeners();
}

function renderModules(langKey) {
  const moduleGrid = document.getElementById("modules-grid");
  if (!moduleGrid) return;

  const data = SYLLABUS_DATA[langKey];
  if (!data) return;

  // Render cards with dynamic fade in transition classes
  moduleGrid.style.opacity = 0;
  setTimeout(() => {
    moduleGrid.innerHTML = "";
    data.modules.forEach(mod => {
      const card = document.createElement("div");
      card.className = "glass-card module-card";
      card.setAttribute("data-module-id", mod.id);
      card.setAttribute("data-lang-key", langKey);
      card.innerHTML = `
        <h3 class="module-card-title">${mod.title}</h3>
        <p class="module-card-desc">${mod.desc}</p>
        <span class="module-card-action">
          Explore Syllabus
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </span>
      `;
      moduleGrid.appendChild(card);
    });
    moduleGrid.style.opacity = 1;
  }, 150);
}

function initModalListeners() {
  const modalOverlay = document.getElementById("learning-modal");
  const modalClose = document.getElementById("learning-modal-close");
  const moduleGrid = document.getElementById("modules-grid");

  if (!modalOverlay || !modalClose || !moduleGrid) return;

  // Open modal on card click
  moduleGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".module-card");
    if (!card) return;

    const modId = card.getAttribute("data-module-id");
    const langKey = card.getAttribute("data-lang-key");
    openSyllabusModal(langKey, modId);
  });

  // Close modal
  modalClose.addEventListener("click", () => {
    closeSyllabusModal();
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeSyllabusModal();
    }
  });

  // Handle Tab Switch within Modal (Notes / Cheat Sheet / Practice / Projects)
  const modalTabsContainer = document.querySelector(".modal-tab-headers");
  if (modalTabsContainer) {
    modalTabsContainer.addEventListener("click", (e) => {
      const tabBtn = e.target.closest(".modal-tab-btn");
      if (!tabBtn) return;

      document.querySelectorAll(".modal-tab-btn").forEach(btn => {
        btn.classList.remove("active");
      });
      tabBtn.classList.add("active");

      const targetPane = tabBtn.getAttribute("data-tab-target");
      document.querySelectorAll(".modal-tab-pane").forEach(pane => {
        pane.classList.remove("active");
      });
      const activePane = document.getElementById(targetPane);
      if (activePane) activePane.classList.add("active");
    });
  }
}

function openSyllabusModal(langKey, modId) {
  const modalOverlay = document.getElementById("learning-modal");
  const modalTitle = document.getElementById("modal-lang-title");
  const modalSub = document.getElementById("modal-module-title");

  const paneNotes = document.getElementById("pane-notes");
  const paneCheat = document.getElementById("pane-cheat");
  const panePractice = document.getElementById("pane-practice");
  const paneProjects = document.getElementById("pane-projects");

  if (!modalOverlay || !paneNotes || !paneCheat || !panePractice || !paneProjects) return;

  const lang = SYLLABUS_DATA[langKey];
  const mod = lang.modules.find(m => m.id === modId);
  if (!lang || !mod) return;

  // Set Titles
  modalTitle.textContent = lang.name;
  modalSub.textContent = mod.title;

  // Populate Tab Content Pane
  paneNotes.innerHTML = mod.notes || "<p>Notes under construction.</p>";
  paneCheat.innerHTML = mod.cheatSheet || "<p>No cheat sheet syntax available.</p>";
  panePractice.innerHTML = mod.practice || "<p>Practice problems coming soon.</p>";
  paneProjects.innerHTML = mod.projects || "<p>Project guidelines coming soon.</p>";

  // Reset Modal Tabs to default (Notes tab active)
  document.querySelectorAll(".modal-tab-btn").forEach((btn, idx) => {
    if (idx === 0) btn.classList.add("active");
    else btn.classList.remove("active");
  });
  document.querySelectorAll(".modal-tab-pane").forEach((pane, idx) => {
    if (idx === 0) pane.classList.add("active");
    else pane.classList.remove("active");
  });

  // Open overlay
  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden"; // Lock page body scroll
}

function closeSyllabusModal() {
  const modalOverlay = document.getElementById("learning-modal");
  if (!modalOverlay) return;

  modalOverlay.classList.remove("open");
  document.body.style.overflow = ""; // Restore scroll
}
