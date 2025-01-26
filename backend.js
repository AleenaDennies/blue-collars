const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let workers = [
    {
        id: 1,
        type:"worker",
        name: 'John Doe',
        age: 35,
        contact: '555-123-4567',
        trade: 'Carpenter',
        location: 'New York',
        rating: 4.5,
        portfolio: ['image1.jpg', 'image2.jpg'],
        bio: 'I am a carpenter in new york',
    },
    {
        id: 2,
        type: "worker",
        name: 'Jane Smith',
        age: 28,
        contact: '555-987-6543',
        trade: 'Electrician',
        location: 'Los Angeles',
        rating: 4.8,
        portfolio: ['image3.jpg', 'image4.jpg'],
        bio: 'I am an electrician in Los angeles',
    },
    {
        id: 3,
        type:"worker",
        name: 'Alice Brown',
        age: 40,
        contact: '555-333-4444',
        trade: 'Plumber',
        location: 'Chicago',
        rating: 4.2,
        portfolio: ['image5.jpg', 'image6.jpg'],
        bio: 'I am a plumber in Chicago',
    },
];

let clients = [
    {
       id: 1,
       type: "client",
       name:"Robert",
       location:"idukki",
       address:"123 Main St"

    },
    {
       id: 2,
       type: "client",
       name:"Sarah",
       location:"Los Angeles",
       address:"456 Elm St"

    },

];

let reviews = [
 {
   workerId: 1,
   clientId: 1,
   rating: 4,
   text: "Good service. Very reliable.",
 },
 {
    workerId: 2,
    clientId: 2,
    rating: 5,
    text: "Excellent electrician. Highly recommended",

 }
]

// API endpoint to get worker by id
app.get('/api/workers/:id', (req, res) => {
    const workerId = parseInt(req.params.id);
    const worker = workers.find((worker) => worker.id === workerId);

    if (worker) {
        res.json(worker);
    } else {
        res.status(404).json({ message: 'Worker not found' });
    }
});

// API endpoint to get workers based on filters
app.get('/api/workers', (req, res) => {
    const { location, trade, rating } = req.query;
    let filteredWorkers = [...workers]; // Create a copy to avoid modifying the original array

    if (location) {
        filteredWorkers = filteredWorkers.filter((worker) =>
            worker.location.toLowerCase().includes(location.toLowerCase())
        );
    }

    if (trade) {
        filteredWorkers = filteredWorkers.filter((worker) =>
            worker.trade.toLowerCase().includes(trade.toLowerCase())
        );
    }

    if (rating) {
     filteredWorkers = filteredWorkers.sort((a,b)=> b.rating- a.rating ) //sort based on highest rating.

    }

    res.json(filteredWorkers);
});

//API endpoint to register worker
app.post('/api/register/worker', (req,res)=>{
    const newWorker=req.body;
    newWorker.id=workers.length+1;
    newWorker.type="worker"
    workers.push(newWorker);
    res.status(201).json(newWorker)
})

//API endpoint to register client
app.post('/api/register/client', (req, res)=>{
   const newClient=req.body
   newClient.id = clients.length + 1;
    newClient.type = "client";
    clients.push(newClient);
    res.status(201).json(newClient);
})

//Endpoint to add new review
app.post('/api/reviews', (req,res)=>{
    const newReview = req.body
    reviews.push(newReview)
    res.status(201).json(newReview)
})

//Endpoint to get reviews of specific worker
app.get('/api/reviews/:workerId', (req,res)=>{
   const workerId=parseInt(req.params.workerId)
   const workerReviews = reviews.filter((review)=> review.workerId===workerId)
   res.json(workerReviews)
})

// Calculate average rating of the worker
app.get('/api/averageRating/:workerId',(req,res)=>{
   const workerId = parseInt(req.params.workerId)
   const workerReviews = reviews.filter((review)=> review.workerId===workerId)
   if (workerReviews.length === 0) {
        return res.json({ averageRating: 0 });
   }

   const totalRating = workerReviews.reduce((sum, review) => sum + review.rating, 0)
   const averageRating = totalRating/workerReviews.length
   res.json({ averageRating: averageRating })
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});