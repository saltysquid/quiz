import axios from "axios";
import React, { useState, useContext } from "react";

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [numberCorrect, setNumberCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "General Knowledge",
    difficulty: "easy",
  });

  const fetchQuestions = async (url) => {
    setIsLoading(true);
    setWaiting(false);

    const response = await axios(url).catch((error) => console.log(error));

    if (response) {
      if (response.data.results.length === 0) {
        setWaiting(true);
        setError(true);
      } else {
        setQuestions(response.data.results);
        setError(false);
      }
    }

    setIsLoading(false);
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();

        return 0;
      }

      return index;
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setNumberCorrect((oldNumberCorrect) => oldNumberCorrect + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setWaiting(true);
    setNumberCorrect(0);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { amount, category, difficulty } = quiz;

    let catNum;
    if (category === "General Knowledge") {
      catNum = 9;
    } else if (category === "Entertainment: Video Games") {
      catNum = 15;
    } else if (category === "Mythology") {
      catNum = 20;
    }

    fetchQuestions(
      `${API_ENDPOINT}amount=${amount}&category=${catNum}&difficulty=${difficulty}&type=multiple`
    );
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        isLoading,
        questions,
        index,
        numberCorrect,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
