import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false,
})
export class Tab4Page implements OnInit {
  role = '';
  isAdmin = false;

  form: any = {
    kode_barang: '',
    nama_barang: '',
    aktivitas: '',
    jumlah: 0,
    kondisi_awal: '',
    kondisi_akhir: '',
    lokasi_awal: '',
    lokasi_akhir: '',
    keterangan: ''
  };

  daftarBarang: any[] = [];

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.role = localStorage.getItem('role') || '';
    this.isAdmin = this.role === 'admin';

    if (!this.isAdmin) {
      // Redirect jika perlu
      // this.router.navigate(['/tabs/tab1']);
      return;
    }

    this.loadBarang();
  }

  loadBarang() {
    this.http.get<any>('https://silvia.ti-zone.io/get_kode_barang.php').subscribe(res => {
      if (res.success) {
        this.daftarBarang = res.data;
      }
    });
  }

  onKodeBarangChange() {
    const selected = this.daftarBarang.find(item => item.kode_barang === this.form.kode_barang);
    if (selected) {
      this.form.nama_barang = selected.nama_barang;
      this.form.lokasi_awal = selected.lokasi;
      this.form.kondisi_awal = selected.kondisi;
      this.form.jumlah = selected.jumlah;
    }
  }

  submitForm() {
    this.http.post('https://silvia.ti-zone.io/add_riwayat.php', this.form)
      .subscribe(async res => {
        const toast = await this.toastCtrl.create({
          message: 'Riwayat berhasil ditambahkan.',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.form = {};
      });
  }
}
