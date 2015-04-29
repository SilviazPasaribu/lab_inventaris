import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastController
  ) {}

  async login() {
    if (!this.email || !this.password) {
      const toast = await this.toast.create({
        message: 'Email dan password wajib diisi',
        duration: 2000,
        color: 'warning',
      });
      toast.present();
      return;
    }

    const data = { email: this.email, password: this.password };

    this.http.post<any>('https://silvia.ti-zone.io/login_user.php', data).subscribe(
      async res => {
        if (res.success) {
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('role', res.user.role); // simpan role
          localStorage.setItem('email', res.user.email); // optional

          // Arahkan ke tab1 setelah login
          this.router.navigate(['/tabs/tab1']);
        } else {
          const toast = await this.toast.create({
            message: res.message,
            duration: 2000,
            color: 'danger',
          });
          toast.present();
        }
      },
      async err => {
        const toast = await this.toast.create({
          message: 'Gagal terhubung ke server',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      }
    );
  }
}

