-- Tabel untuk menyimpan hasil diagnosis UMKM
CREATE TABLE public.diagnoses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  
  -- Input Data UMKM
  nama_usaha text NOT NULL,
  jenis_usaha text NOT NULL,
  usia_usaha text,
  lokasi text,
  jumlah_karyawan text,
  omset numeric DEFAULT 0,
  biaya_operasional numeric DEFAULT 0,
  modal_awal numeric DEFAULT 0,
  sudah_profit boolean DEFAULT false,
  hutang_usaha numeric DEFAULT 0,
  channel_penjualan text[], -- array of text
  transaksi_per_hari integer DEFAULT 0,
  ada_pencatatan text,
  kendala_utama text[], -- array of text
  target text,
  skor_kepuasan numeric DEFAULT 5,
  ip_address text,

  -- Output Data AI
  skor_total numeric NOT NULL,
  skor_keuangan numeric,
  skor_pertumbuhan numeric,
  skor_operasional numeric,
  skor_penjualan numeric,
  status_kesehatan text,
  ringkasan text,
  diagnosis jsonb, -- Array of objects { judul, detail }
  rekomendasi jsonb, -- Array of objects { aksi, alasan }
  kalimat_motivasi text
);

-- Mengaktifkan Row Level Security (Keamanan Data)
ALTER TABLE public.diagnoses ENABLE ROW LEVEL SECURITY;

-- Policy 1: Pengguna bisa melihat datanya sendiri
CREATE POLICY "Users can view their own diagnoses" 
  ON public.diagnoses FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy 2: Siapa saja (termasuk anonim) bisa insert data
CREATE POLICY "Anyone can insert diagnoses" 
  ON public.diagnoses FOR INSERT 
  WITH CHECK (true);

-- Policy 3: Pengguna bisa melihat data anonim (tanpa user_id) berdasarkan id saja 
-- (berguna jika user baru daftar lalu melihat hasil yang dibuat sebelum daftar)
CREATE POLICY "Anyone can read anonymous diagnoses" 
  ON public.diagnoses FOR SELECT 
  USING (user_id IS NULL);
