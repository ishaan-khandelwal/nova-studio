export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function validateContactForm({ name, email, message }) {
  const errors = {};

  if (!name || name.trim() === '') {
    errors.name = 'Name is required';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (name.length > 50) {
    errors.name = 'Name must be at most 50 characters';
  }

  if (!email || email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Please provide a valid email address';
  }

  if (!message || message.trim() === '') {
    errors.message = 'Message is required';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (message.length > 1000) {
    errors.message = 'Message must be at most 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateProjectForm({ title, category, image, description }) {
  const errors = {};

  if (!title || title.trim() === '') {
    errors.title = 'Title is required';
  }

  if (!category || category.trim() === '') {
    errors.category = 'Category is required';
  }

  if (!image || image.trim() === '') {
    errors.image = 'Image URL is required';
  } else {
    try {
      new URL(image);
    } catch (_) {
      if (!image.startsWith('/') && !image.startsWith('http://') && !image.startsWith('https://')) {
        errors.image = 'Please provide a valid image URL or path';
      }
    }
  }

  if (!description || description.trim() === '') {
    errors.description = 'Description is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
