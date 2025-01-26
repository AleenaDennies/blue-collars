document.addEventListener('DOMContentLoaded', function () {
    const workersSection = document.getElementById('workersSection');
    const workerDetailSection = document.getElementById('workerDetailSection');
    const workersList = document.getElementById('workersList');
    const backToWorkersBtn = document.getElementById('backToWorkersBtn');
    const contactWorkerBtn = document.getElementById('contactWorkerBtn');
    const contactInfo = document.getElementById('contactInfo');
    const profileName = document.getElementById('profileName');
    const profileData = document.getElementById('profileData');

    let currentWorkerId = null;

    function hideAllSections() {
        workerDetailSection.classList.add('hidden');
    }


    async function fetchAndDisplayWorkers() {
        try {
            const response = await fetch('http://localhost:3000/workers');
            const workers = await response.json();
            if (response.ok) {
                workersList.innerHTML = '';
                workers.forEach((worker) => {
                    const workerCard = document.createElement('div');
                    workerCard.classList.add('worker-card');
                    workerCard.innerHTML = `
                       <h3>${worker.name}</h3>
                       <p><strong>Experience:</strong> ${worker.experience}</p>
                        <p><strong>Location:</strong> ${worker.location}</p>
                      `;
                    workerCard.addEventListener('click', () =>
                        displayWorkerDetails(worker.id)
                    );
                    workersList.appendChild(workerCard);
                });
            } else {
                alert('Failed to fetch workers list.');
            }
        } catch (error) {
            console.error('Error fetching data', error);
            alert('Error fetching workers.');
        }
    }

    async function displayWorkerDetails(workerId) {
        currentWorkerId = workerId;
        try {
            const response = await fetch(`http://localhost:3000/workers/${workerId}`);
            const worker = await response.json();
            if (response.ok) {
                profileName.textContent = worker.name;
                profileData.innerHTML = `
                     <p><strong>Age:</strong> ${worker.age}</p>
                      <p><strong>Experience:</strong> ${worker.experience}</p>
                       <p><strong>Location:</strong> ${worker.location}</p>
                        `;
                hideAllSections();
                workerDetailSection.classList.remove('hidden');
                contactInfo.classList.add('hidden');
            } else {
                alert('Failed to fetch worker details.');
            }
        } catch (error) {
            console.error('error fetching data', error);
            alert('Error fetching worker.');
        }
    }

    contactWorkerBtn.addEventListener('click', async function(){
        try {
            const response = await fetch(`http://localhost:3000/workers/${currentWorkerId}`);
            const worker = await response.json();
            if (response.ok) {
                contactInfo.innerHTML = `
                     <p><strong>Contact :</strong> ${worker.contact}</p>
                      `;
                contactInfo.classList.remove('hidden');
            } else {
                alert('Failed to fetch worker contact.');
            }
        } catch (error) {
            console.error('error fetching data', error);
            alert('Error fetching contact.');
        }
    });

    backToWorkersBtn.addEventListener('click', function () {
        hideAllSections();
        workersSection.classList.remove('hidden');
    });

   fetchAndDisplayWorkers();
    hideAllSections();
});