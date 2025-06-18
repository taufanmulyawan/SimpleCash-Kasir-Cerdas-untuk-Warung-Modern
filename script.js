const menuMakanan = [
  { nama: 'Nasi Goreng', harga: 15000 },
  { nama: 'Mie Ayam', harga: 12000 },
  { nama: 'Bakso', harga: 13000 }
];

const menuMinuman = [
  { nama: 'Es Teh', harga: 5000 },
  { nama: 'Es Jeruk', harga: 6000 },
  { nama: 'Kopi Hitam', harga: 7000 }
];

const pesanan = [];

function tampilkanMenu() {
  const makananDiv = document.getElementById('menu-makanan');
  const minumanDiv = document.getElementById('menu-minuman');

  menuMakanan.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <span>${item.nama} - Rp${item.harga}</span>
      <input type="number" min="0" value="0" id="makanan-${i}">
    `;
    makananDiv.appendChild(div);
  });

  menuMinuman.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <span>${item.nama} - Rp${item.harga}</span>
      <input type="number" min="0" value="0" id="minuman-${i}">
    `;
    minumanDiv.appendChild(div);
  });
}

function selesaiBelanja() {
  pesanan.length = 0; // reset
  let total = 0;

  // Ambil pesanan makanan
  menuMakanan.forEach((item, i) => {
    const jumlah = parseInt(document.getElementById(`makanan-${i}`).value);
    if (jumlah > 0) {
      pesanan.push({ nama: item.nama, jumlah, harga: item.harga });
    }
  });

  // Ambil pesanan minuman
  menuMinuman.forEach((item, i) => {
    const jumlah = parseInt(document.getElementById(`minuman-${i}`).value);
    if (jumlah > 0) {
      pesanan.push({ nama: item.nama, jumlah, harga: item.harga });
    }
  });

  // Ambil nominal bayar
  const bayar = parseInt(document.getElementById("bayar").value || 0);

  const strukDiv = document.getElementById('struk');
  const waktu = new Date().toLocaleString();
  let isiStruk = `==== STRUK PEMBELIAN ====\n${waktu}\n\n`;

  if (pesanan.length === 0) {
    strukDiv.innerText = "Belum ada item yang dipilih.";
    return;
  }

  pesanan.forEach(item => {
    const subtotal = item.harga * item.jumlah;
    total += subtotal;
    isiStruk += `${item.nama} x${item.jumlah} = Rp${subtotal}\n`;
  });

  isiStruk += `\nTOTAL BAYAR: Rp${total}`;

  if (bayar < total) {
    isiStruk += `\nUang Dibayar: Rp${bayar}\n❌ Uang tidak cukup!`;
  } else {
    const kembalian = bayar - total;
    isiStruk += `\nUang Dibayar: Rp${bayar}\nKembalian: Rp${kembalian}`;
  }

  isiStruk += `\n==========================`;

  strukDiv.innerText = isiStruk;
}

window.onload = tampilkanMenu;
