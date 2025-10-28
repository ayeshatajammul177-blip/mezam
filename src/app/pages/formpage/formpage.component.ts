import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';

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
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(private clientService: ClientService) {}

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

  if (!this.file) {
    alert('Please upload a file.');
    valid = false;
  }

  if (!valid) return;

  // ✅ Construct FormData properly
  const formDataToSend = new FormData();
  formDataToSend.append('Name', this.formData.name);
  formDataToSend.append('Email', this.formData.email);
  formDataToSend.append('Address', this.formData.address);
  formDataToSend.append('Category', this.formData.category);
  if (this.file) {
    formDataToSend.append('File', this.file, this.file.name);
  }
  console.log('📦 Sending FormData:');
  formDataToSend.forEach((val, key) => console.log(key, val));
  // ✅ Send to API
  this.clientService.submitClient(formDataToSend).subscribe({
    next: (response) => {
      console.log('✅ Success:', response);
      alert('Form submitted successfully!');
      this.formData = { name: '', email: '', phone: '', address: '', category: '' };
      this.file = null;
    },
    error: (error) => {
      console.error('❌ Error submitting form:', error);
      alert('Error submitting form. Please check input data.');
    }
  });
}
}
