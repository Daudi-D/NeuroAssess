import React, { useState } from 'react';
import { TextField, Button, IconButton, Typography, Grid } from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';

const TestForm = ({ test, onSave }) => {
  const [title, setTitle] = useState(test ? test.title : '');
  const [description, setDescription] = useState(test ? test.description : '');
  const [category, setCategory] = useState(test ? test.category : '');
  const [timeLimit, setTimeLimit] = useState(test ? test.timeLimit : 0);
  const [questions, setQuestions] = useState(test ? test.questions : []);

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, category, timeLimit, questions });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={3}
      />
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Time Limit (minutes)"
        type="number"
        value={timeLimit}
        onChange={(e) => setTimeLimit(parseInt(e.target.value))}
        fullWidth
        margin="normal"
      />
      <Typography variant="h6" style={{ marginTop: '1rem' }}>Questions</Typography>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} style={{ marginBottom: '1rem' }}>
          <TextField
            label={`Question ${questionIndex + 1}`}
            value={question.text}
            onChange={(e) => handleQuestionChange(questionIndex, 'text', e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Grid container spacing={2}>
            {question.options.map((option, optionIndex) => (
              <Grid item xs={6} key={optionIndex}>
                <TextField
                  label={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
            ))}
          </Grid>
          <TextField
            label="Correct Answer (0-3)"
            type="number"
            value={question.correctAnswer}
            onChange={(e) => handleQuestionChange(questionIndex, 'correctAnswer', parseInt(e.target.value))}
            fullWidth
            margin="normal"
            required
          />
          <IconButton color="secondary" onClick={() => handleRemoveQuestion(questionIndex)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <Button
        type="button"
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddQuestion}
        style={{ marginTop: '1rem' }}
      >
        Add Question
      </Button>
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem', marginLeft: '1rem' }}>
        Save Test
      </Button>
    </form>
  );
};

export default TestForm;