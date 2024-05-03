const form = document.getElementById('form');
      const result = document.getElementById('result');
      
      form.addEventListener('submit', function(e) {
          const formData = new FormData(form);
          e.preventDefault();
      
          const object = Object.fromEntries(formData);
          const json = JSON.stringify(object);
      
          result.innerHTML = "Please wait..."
          result.classList.add('text-warning');
          result.classList.remove('text-success');
          result.classList.remove('text-danger');

          fetch('https://api.web3forms.com/submit', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                  },
                  body: json
              })
              .then(async (response) => {
                  let json = await response.json();
                  if (response.status === 200) {
                      result.innerHTML = json.message;
                      result.classList.add('text-success');
                      result.classList.remove('text-danger');
                      result.classList.remove('text-warning');
                  } else {
                      
                      result.innerHTML = json.message;
                      
                  }
              })
              .catch(error => {
                  result.innerHTML = "Something went wrong!";
                  result.classList.add('text-danger');
                  result.classList.remove('text-success');
                  result.classList.remove('text-warning');
              })
              .then(function() {
                  form.reset();
                  setTimeout(() => {
                      result.style.display = "none";
                  }, 3000);
              });
      });