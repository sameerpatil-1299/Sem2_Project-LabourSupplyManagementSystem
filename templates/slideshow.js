let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 5 seconds
}

function handleSubmit(event) {
  event.preventDefault();
  alert("Registration Successful!");
  document.getElementById("RegistrationForm").reset();
  return false;
}

// Haversine formula to calculate distance between two points on Earth
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function toRad(degrees) {
  return degrees * Math.PI / 180;
}

// Job Locations (in Latitude, Longitude)
const jobs = [
  { id: 1, title: 'Harvesting', lat: 52.5200, lon: 13.4050 },
  { id: 2, title: 'Ploughing', lat: 52.5205, lon: 13.4055 }
];

// Worker Locations (in Latitude, Longitude)
const workers = [
  { id: 1, name: 'John', lat: 52.5210, lon: 13.4058 },
  { id: 2, name: 'Jane', lat: 52.5200, lon: 13.4060 },
  { id: 3, name: 'Sam', lat: 52.5190, lon: 13.4045 }
];

// Function to assign the nearest worker to a job
function assignJobToNearestWorker(jobId) {
  // Find the job by its ID
  const job = jobs.find(job => job.id === jobId);
  
  if (!job) {
      console.log("Job not found");
      return;
  }

  // Calculate the distance from the job to each worker
  let closestWorker = null;
  let shortestDistance = Infinity;

  workers.forEach(worker => {
      const distance = haversine(job.lat, job.lon, worker.lat, worker.lon);
      console.log(`Distance from ${worker.name} to ${job.title}: ${distance} km`);

      // Find the closest worker
      if (distance < shortestDistance) {
          closestWorker = worker;
          shortestDistance = distance;
      }
  });

  if (closestWorker) {
      console.log(`The closest worker to the job "${job.title}" is ${closestWorker.name}`);
      alert(`The job "${job.title}" has been assigned to ${closestWorker.name}.`);
  } else {
      console.log('No workers available');
  }
}

// Function to get the current geographical location (Latitude and Longitude)
function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          // Get the latitude and longitude from the position object
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          // Display the latitude and longitude in the form fields
          document.getElementById("latitude").value = latitude;
          document.getElementById("longitude").value = longitude;
      }, function(error) {
          // Handle errors if the user denies or there's an issue with geolocation
          alert("Geolocation is not supported by this browser or the user denied the request.");
      });
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}
