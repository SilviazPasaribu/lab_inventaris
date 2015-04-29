import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  inventaris: any[] = [];
  searchTerm: string = '';
  showModal: boolean = false;
  selectedImage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }
  ionViewWillEnter() {
  this.loadData(); // dipanggil setiap kali tab ini dikunjungi
}


  loadData() {
    this.http.get<any>('https://silvia.ti-zone.io/get_inventaris.php')
      .subscribe(res => {
        if (res.success) {
          this.inventaris = res.data.map((item: any) => ({
            ...item,
            gambar_url: `https://silvia.ti-zone.io/uploads/${item.foto}`
          }));
        }
      });
  }

  filteredInventaris() {
    return this.inventaris.filter(item =>
      item.nama_barang.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openImage(url: string) {
    this.selectedImage = url;
    this.showModal = true;
  }

  closeImage() {
    this.showModal = false;
  }

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.inventaris);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventaris');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, 'data-inventaris.xlsx');
  }

  exportToWord() {
    let content = '<h1>Data Inventaris</h1>';
    this.inventaris.forEach(item => {
      content += `
        <p><strong>Nama:</strong> ${item.nama_barang}<br>
        <strong>Kode:</strong> ${item.kode_barang}<br>
        <strong>Jumlah:</strong> ${item.jumlah}<br>
        <strong>Kondisi:</strong> ${item.kondisi}<br>
        <strong>Lokasi:</strong> ${item.lokasi}<br>
        <strong>Tanggal Masuk:</strong> ${item.tanggal_masuk}</p><hr/>
      `;
    });

    const blob = new Blob(['<html><body>' + content + '</body></html>'], {
      type: 'application/msword',
    });
    saveAs(blob, 'data-inventaris.doc');
  }
  logout() {
  // Hapus data login dari localStorage
  localStorage.removeItem('loggedIn');

  // Redirect ke halaman login
  window.location.href = '/login';
}
}
