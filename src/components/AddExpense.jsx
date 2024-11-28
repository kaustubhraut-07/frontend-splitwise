import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddExpense = ({ groupId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const currentUserId = JSON.parse(sessionStorage.getItem('user')).id;

  
  const getAllExpensesinGroup = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}get_all_expenses_in_group/${groupId}/`
      );
      console.log('Expenses:', data);
      setExpenses(data.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };


  const getAllSettlementsinGroup = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}get_all_settlement_in_group/${groupId}/`
      );
      console.log('Settlements:', data);
      const filteredSettlements = data.data
        .filter(
          (settlement) => settlement.paid_by === currentUserId 
        )
        .map((settlement) => ({
          ...settlement,
          paid_by: settlement.paid_to,
          paid_to: settlement.paid_by, 
        }));
      setSettlements(filteredSettlements);
    } catch (error) {
      console.error('Error fetching settlements:', error);
    }
  };

 
  const handleAddExpense = async () => {
    if (expenseName && expenseAmount) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}create_expense/`,
          {
            group_id: groupId,
            expense_name: expenseName,
            expense_amount: expenseAmount,
            expense_paid_by: currentUserId,
          }
        );
        console.log('Expense added:', data);
        getAllExpensesinGroup();
        getAllSettlementsinGroup();
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
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}settle_expense/`,
        {
          expense_id: expenseId,
          settled_by: currentUserId,
        }
      );
      console.log('Expense settled:', response);
      getAllExpensesinGroup();
      getAllSettlementsinGroup();
    } catch (error) {
      console.error('Error settling expense:', error);
    }
  };

  useEffect(() => {
    getAllExpensesinGroup();
    getAllSettlementsinGroup();
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
            {expenses.map((expense) => (
              <li key={expense.id} className="flex justify-between items-center p-2 border rounded bg-gray-50">
                <div>
                  <span>{expense.name}</span>
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

      <div className="mt-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-2">Settlements:</h3>
        {settlements.length > 0 ? (
          <ul className="space-y-2">
            {settlements.map((settlement) => (
              <li
                key={settlement.id}
                className="p-2 border rounded bg-gray-50 flex justify-between items-center"
              >
                <span>
                  {settlement.payer_name} owes {settlement.payee_name} ${settlement.amount}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No settlements available yet.</p>
        )}
      </div>
    </div>
  );
};

export default AddExpense;
