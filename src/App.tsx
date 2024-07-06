import { Box, Button, Container, Input } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formStyles, containerStyles } from './muiStyles';

interface FormDetails {
  name: string;
  email: string;
  phoneno: number;
}

const App = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = React.useState<FormDetails>({
    name: '',
    email: '',
    phoneno: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]:value,
    }));
  };

  const handleSubmit = () => {
    try {
      if (formDetails.name === '' || formDetails.email === '' || formDetails.phoneno === 0) {
        alert('Please fill all the fields')
        return
      }
      window.localStorage.setItem('formDetails', JSON.stringify(formDetails));
      alert('Form submitted successfully');
     navigate('/page2')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container sx={containerStyles}>
      <Box sx={formStyles}>
        <Input
          name="name"
          placeholder="Name"
          value={formDetails.name}
          onChange={handleChange}
        />
        <Input
          name="email"
          placeholder="Email"
          type="email"
          value={formDetails.email}
          onChange={handleChange}
        />
        <Input
          name="phoneno"
          placeholder="Phone no"
          type="number"
          value={formDetails.phoneno}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default App;
