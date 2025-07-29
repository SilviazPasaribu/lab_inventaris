-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2025 at 05:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `unika`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventaris`
--

CREATE TABLE `inventaris` (
  `id` int(11) NOT NULL,
  `nama_barang` varchar(255) DEFAULT NULL,
  `kode_barang` varchar(100) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `kondisi` varchar(100) DEFAULT NULL,
  `lokasi` varchar(255) DEFAULT NULL,
  `tanggal_masuk` date DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventaris`
--

INSERT INTO `inventaris` (`id`, `nama_barang`, `kode_barang`, `jumlah`, `kondisi`, `lokasi`, `tanggal_masuk`, `foto`) VALUES
(2, 'laptop', '1121', 1, 'Baik', 'lab 3', '2025-07-02', '68694003c4286_laptop.webp'),
(3, 'laptop 2', '2232', 2, 'Rusak Ringan', 'lab 2', '2025-07-05', '6869425d47af3_laptop.webp');

-- --------------------------------------------------------

--
-- Table structure for table `riwayat_barang`
--

CREATE TABLE `riwayat_barang` (
  `id` int(11) NOT NULL,
  `kode_barang` varchar(100) DEFAULT NULL,
  `nama_barang` varchar(255) DEFAULT NULL,
  `aktivitas` enum('Tambah','Hapus','Pindah Lokasi','Perubahan Kondisi') NOT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `kondisi_awal` varchar(100) DEFAULT NULL,
  `kondisi_akhir` varchar(100) DEFAULT NULL,
  `lokasi_awal` varchar(100) DEFAULT NULL,
  `lokasi_akhir` varchar(100) DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `tanggal` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `riwayat_barang`
--

INSERT INTO `riwayat_barang` (`id`, `kode_barang`, `nama_barang`, `aktivitas`, `jumlah`, `kondisi_awal`, `kondisi_akhir`, `lokasi_awal`, `lokasi_akhir`, `keterangan`, `tanggal`) VALUES
(1, '2232', 'laptop 2', 'Perubahan Kondisi', 2, 'Rusak Ringan', 'baik', 'lab 2', 'lab 2', 'memperbaiki laptop', '2025-07-05 22:34:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `inventaris`
--
ALTER TABLE `inventaris`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_barang` (`kode_barang`);

--
-- Indexes for table `riwayat_barang`
--
ALTER TABLE `riwayat_barang`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventaris`
--
ALTER TABLE `inventaris`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `riwayat_barang`
--
ALTER TABLE `riwayat_barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
