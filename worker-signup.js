document.getElementById('worker-signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload
     const formData = new FormData(event.target);
     const workerData = Object.fromEntries(formData.entries());
  
    fetch('/api/workers/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(workerData),
    })
     .then(response => {
        if(response.ok){
            return response.json();
        }
         throw new Error('Network response was not ok.');
    })
    .then(data => {
        alert('Registration Successful! Worker ID:' + data.workerId)
        // Redirect to portfolio page.
      
        window.location.href = '/'; // Redirect to homepage
    })
    .catch(error => {
          console.error('Error during registration:', error);
            alert('Error during registration!');
    });
});