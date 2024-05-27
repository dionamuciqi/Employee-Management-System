import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, TextField, Button, List, ListItem, ListItemText, Typography, Box, Divider, Grid } from '@mui/material';
import { styled } from '@mui/system';

const RedButton = styled(Button)({
  backgroundColor: 'red',
  '&:hover': {
    backgroundColor: 'darkred',
  },
});

const AnnualPlans = () => {
    const [plan, setPlan] = useState('');
    const [endDate, setEndDate] = useState('');
    const [plans, setPlans] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:3000/auth/annualplans')
        .then(response => {
          if (response.data.success) {
            setPlans(response.data.plans);
          } else {
            console.error('Error fetching plans:', response.data.error);
          }
        })
        .catch(error => {
          console.error('There was an error fetching plans!', error);
        });
    }, []);
  
    const handlePlanChange = (e) => {
      setPlan(e.target.value);
    };
  
    const handleEndDateChange = (e) => {
      setEndDate(e.target.value);
    };
  
    const handlePlanSubmit = (e) => {
      e.preventDefault();
      if (!plan.trim() || !endDate.trim()) {
        console.error('Plan and end date cannot be empty');
        return;
      }
      const requestData = {
        plan,
        end_date: endDate,
      };
      axios.post('http://localhost:3000/auth/annualplans', requestData)
        .then(response => {
          if (response.data.success) {
            setPlan('');
            setEndDate('');
            setPlans(prevPlans => [...prevPlans, response.data.plan]);
          } else {
            console.error('Error submitting plan:', response.data.error);
          }
        })
        .catch(error => {
          console.error('There was an error submitting plan!', error);
        });
    };
  
    const handleClearAll = () => {
      axios.delete('http://localhost:3000/auth/clearplans')
        .then(response => {
          if (response.data.success) {
            setPlans([]);
          } else {
            console.error('Error clearing plans:', response.data.error);
          }
        })
        .catch(error => {
          console.error('There was an error clearing plans!', error);
        });
    };
  
    return (
      <Container maxWidth="lg" sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4} sx={{ mt: 14 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>New Annual Plan</Typography>
              <form onSubmit={handlePlanSubmit}>
                <TextField
                  label="Enter your annual plan"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={plan}
                  onChange={handlePlanChange}
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="End Date"
                  variant="outlined"
                  fullWidth
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  sx={{ mb: 3 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">Annual Plans</Typography>
                <RedButton variant="contained" onClick={handleClearAll}>Clear All</RedButton>
              </Box>
              <List>
                {plans.map((plan, index) => (
                  <Box key={plan.id}>
                    <ListItem>
                      <ListItemText 
                        primary={`${index + 1}. ${plan.plan}`} 
                        secondary={`End Date: ${new Date(plan.end_date).toLocaleDateString()}`} 
                      />
                    </ListItem>
                    {index < plans.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  };
  
  export default AnnualPlans;