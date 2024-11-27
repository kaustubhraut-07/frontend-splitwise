import React, { useEffect, useState } from 'react';
import axios from 'axios';
const AddExpense = ({ groupId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenses, setExpenses] = useState([]);

const getAllExpensesinGroup = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}get_all_expenses_in_group/${groupId}/`);
    console.log(data);
    setExpenses(data.data);
  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
};



  const handleAddExpense = async() => {
    if (expenseName && expenseAmount) {
      const data = await axios.post(import.meta.env.VITE_BACKEND_URL + 'create_expense/', {group_id : groupId , expense_name: expenseName, expense_amount: expenseAmount , expense_paid_by : JSON.parse(sessionStorage.getItem('user')).id });
      console.log(data);
      setExpenses([...expenses, { name: expenseName, amount: expenseAmount }]);
      setExpenseName('');
      setExpenseAmount('');
      setIsModalOpen(false);
    } else {
      alert('Please fill in all fields');
    }
  };
useEffect(() => {
  getAllExpensesinGroup();
}, []);
  return (
    <div className="flex flex-col items-center">
      
      <div className="p-4 bg-blue-500 text-white rounded shadow-md">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Add Expense
        </button>
      </div>

      
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add Expense</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Expense Name:</label>
              <input
                type="text"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Expense Amount:</label>
              <input
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExpense}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

     
      <div className="mt-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-2">Added Expenses:</h3>
        {expenses.length > 0 ? (
          <ul className="space-y-2">
            {expenses.map((expense, index) => (
              <li
                key={index}
                className="flex justify-between p-2 border rounded bg-gray-50"
              >
                <span>{expense.name}</span>
                <span>${expense.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AddExpense;
