fetch('/api/clients/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(clientData),
})
.then(response => {
     if(response.ok){
        return response.json();
    }
     throw new Error('Network response was not ok.');
})
.then(data => {
     alert('Registration Successful! Client ID:' + data.clientId)
   
    window.location.href = '/';  // Redirect to homepage
})
.catch(error => {
      console.error('Error during registration:', error);
      alert('Error during registration!');
});
});