import { expenseActions } from "./expense-slice";
import axios from "axios";

export const getAllExpenses = () => {
  return async (dispatch) => {
    return await axios
      .get("http://localhost:4000/expense/getExpenses")
      .then((res) => {
        console.log("inside map", res.data);
        res.data.map((exp) =>
          dispatch(
            expenseActions.addExpense({
              id: exp.id,
              name: exp.name,
              amount: exp.amount,
              category: exp.category,
              createdAt: exp.createdAt,
              updatedAt: exp.updatedAt,
            })
          )
        );
      });
  };
};
