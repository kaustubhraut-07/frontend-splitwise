import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddExpense = ({ groupId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const currentUserId = JSON.parse(sessionStorage.getItem('user')).id;

  const getAllExpensesinGroup = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}get_all_expenses_in_group/${groupId}/`);
      console.log(data);
      setExpenses(data.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleAddExpense = async () => {
    if (expenseName && expenseAmount) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}create_expense/`, {
          group_id: groupId,
          expense_name: expenseName,
          expense_amount: expenseAmount,
          expense_paid_by: currentUserId,
        });
        console.log(response);
        setExpenses([...expenses, { ...response.data, expense_paid_by: currentUserId }]);
        setExpenseName('');
        setExpenseAmount('');
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleSettleExpense = async (expenseId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}settle_expense/`, {
        expense_id: expenseId,
        settled_by: currentUserId,
      });
      console.log('Expense settled:', response);
      getAllExpensesinGroup(); // Refresh expenses after settlement
    } catch (error) {
      console.error('Error settling expense:', error);
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
        { console.log('Expenses:', expenses)}
        {expenses.length > 0 ? (
          <ul className="space-y-2">
            {expenses.map((expense) => (
              <li key={expense.id} className="flex justify-between items-center p-2 border rounded bg-gray-50">
                <div>
                  <span>{expense.name
                  }</span>
                  <span className="ml-2">${expense.amount}</span>
                </div>
                {expense.paid_by !== currentUserId && (
                  <button
                    onClick={() => handleSettleExpense(expense.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Settle Expense
                  </button>
                )}
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
