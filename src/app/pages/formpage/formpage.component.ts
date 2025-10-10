import { Component } from '@angular/core';

@Component({
  selector: 'app-formpage',
  standalone: false,
  templateUrl: './formpage.component.html',
  styleUrls: ['./formpage.component.css']
})
export class FormpageComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    category: ''
  };

  file: File | null = null;
  errors: any = {};

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    this.errors = {};
    let valid = true;

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const phonePattern = /^[0-9]{10,15}$/;

    if (!this.formData.name.trim()) {
      this.errors.name = true;
      valid = false;
    }

    if (!emailPattern.test(this.formData.email)) {
      this.errors.email = true;
      valid = false;
    }

    if (!phonePattern.test(this.formData.phone)) {
      this.errors.phone = true;
      valid = false;
    }

    if (!this.formData.address.trim()) {
      this.errors.address = true;
      valid = false;
    }

    if (!this.formData.category) {
      this.errors.category = true;
      valid = false;
    }

    if (this.file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(this.file.type)) {
        alert('Only PDF, JPG, or PNG files are allowed.');
        valid = false;
      }
    }

    if (valid) {
      alert('✅ Form submitted successfully!');
      this.formData = { name: '', email: '', phone: '', address: '', category: '' };
      this.file = null;
    }
  }
}