 const form = document.getElementById('bookingForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const problemInput = document.getElementById('problem');
    const successMessage = document.getElementById('successMessage');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    const fields = {
      name: {
        input: nameInput,
        error: document.getElementById('nameError'),
        validate: (value) => value.trim().length >= 2,
        message: 'Please enter your full name.'
      },
      phone: {
        input: phoneInput,
        error: document.getElementById('phoneError'),
        validate: (value) => /^[+()\-\s\d]{10,}$/.test(value.trim()),
        message: 'Please enter a valid phone number.'
      },
      problem: {
        input: problemInput,
        error: document.getElementById('problemError'),
        validate: (value) => value.trim().length >= 10,
        message: 'Please describe the problem in at least 10 characters.'
      }
    };

    function setError(fieldKey, isValid) {
      const field = fields[fieldKey];
      if (isValid) {
        field.input.classList.remove('invalid');
        field.error.textContent = '';
      } else {
        field.input.classList.add('invalid');
        field.error.textContent = field.message;
      }
    }

    function validateForm() {
      let isFormValid = true;

      Object.keys(fields).forEach((key) => {
        const currentValue = fields[key].input.value;
        const isFieldValid = fields[key].validate(currentValue);
        setError(key, isFieldValid);
        if (!isFieldValid) {
          isFormValid = false;
        }
      });

      return isFormValid;
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      successMessage.style.display = 'none';

      const isValid = validateForm();
      if (!isValid) return;

      form.reset();
      successMessage.style.display = 'block';
    });

    Object.keys(fields).forEach((key) => {
      fields[key].input.addEventListener('input', () => {
        const isValid = fields[key].validate(fields[key].input.value);
        setError(key, isValid);
      });
    });

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });