import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  riwayat: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadRiwayat();
  }

  loadRiwayat() {
    this.http.get<any>('https://silvia.ti-zone.io/get_riwayat.php').subscribe(res => {
      if (res.success && Array.isArray(res.data)) {
        this.riwayat = res.data;
      }
    });
  }
}
