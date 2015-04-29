import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  standalone: false,
})
export class RegisterPage {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private toast: ToastController,
    private http: HttpClient
  ) {}

  async register() {
    if (!this.email || !this.password) {
      const toast = await this.toast.create({
        message: 'Email dan password harus diisi.',
        duration: 2000,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    this.http.post('https://silvia.ti-zone.io/register_user.php', {
      email: this.email,
      password: this.password
    }).subscribe(async (res: any) => {
      const toast = await this.toast.create({
        message: res.message,
        duration: 2000,
        color: res.success ? 'success' : 'danger'
      });
      await toast.present();

      if (res.success) {
        this.router.navigate(['/login']);
      }
    }, async (error) => {
      const toast = await this.toast.create({
        message: 'Terjadi kesalahan koneksi.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    });
  }
}
