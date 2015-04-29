import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  role = '';
  isAdmin = false;

  formData = {
    nama_barang: '',
    kode_barang: '',
    jumlah: null,
    kondisi: '',
    lokasi: '',
    tanggal_masuk: ''
  };

  selectedFile: File | null = null;
  previewImage: string | null = null;

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.role = localStorage.getItem('role') || '';
    this.isAdmin = this.role === 'admin';

    // Jika bukan admin, redirect ke tab1
    if (!this.isAdmin) {
      this.router.navigate(['/tabs/tab1']);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = e => this.previewImage = reader.result as string;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async submitForm() {
    const url = 'https://silvia.ti-zone.io/add_inventaris.php';
    const form = new FormData();

    for (const key in this.formData) {
      form.append(key, (this.formData as any)[key]);
    }

    if (this.selectedFile) {
      form.append('foto', this.selectedFile, this.selectedFile.name);
    }

    this.http.post<any>(url, form).subscribe(
      async (res) => {
        if (res.success) {
          await this.presentToast('Data berhasil ditambahkan');
          this.resetForm();
        } else {
          await this.presentToast('Gagal menambahkan data');
        }
      },
      async () => {
        await this.presentToast('Terjadi kesalahan server');
      }
    );
  }

  resetForm() {
    this.formData = {
      nama_barang: '',
      kode_barang: '',
      jumlah: null,
      kondisi: '',
      lokasi: '',
      tanggal_masuk: ''
    };
    this.selectedFile = null;
    this.previewImage = null;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'dark',
      position: 'bottom',
    });
    toast.present();
  }
}
